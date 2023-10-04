import { useEffect, useState } from "react";
import * as BlogStyle from "./Blog.styles";
// firebase
import { DocumentData } from "firebase/firestore";
// recoil
import { useRecoilState } from "recoil";
// antd
import { Skeleton } from "antd";
import { useBoardSearch, useFirebaseBottomScroll } from "@/hooks/commons";
import BoardBox from "@/components/Main/Board/BoardBox";
import { loginState } from "@/common/Recoil/loginState";
import { userInfoState } from "@/common/Recoil/userInfoState";
import { useRouter } from "next/router";
import SearchBoardInput from "../Main/SearchBoardInput";

export default function Blog(props: { menu: string }) {
    const { menu } = props;

    const [loginStatus] = useRecoilState(loginState);
    const [userInfo] = useRecoilState(userInfoState);

    // fetch comments func
    const router = useRouter();
    const { tag } = router.query;
    const { dataList, loading } = useFirebaseBottomScroll("blog", 5);
    const [filteredData, setFilteredData] = useState<DocumentData[]>([]);
    // search board
    const [searchKeyword, setSearchKeyword, searchResult] =
        useBoardSearch(menu);

    const moveToDetail = (id: string) => {
        location.href = `/blog/${id}`;
    };

    useEffect(() => {
        const filteredBoardByTag = () => {
            if (tag == "all") {
                return;
            } else {
                setFilteredData((prev) =>
                    prev.filter((prev) => prev.tag.includes(tag))
                );
            }
        };

        if (router.isReady) {
            setFilteredData(dataList);
            filteredBoardByTag();
        }
    }, [router, dataList]);

    const skeleton = () => {
        const skeletonUi = [];
        for (let i = 1; i < 6; i++) {
            skeletonUi.push(
                <Skeleton.Button
                    active={true}
                    size={"large"}
                    shape={"square"}
                    block={true}
                    style={{
                        marginTop: "20px",
                    }}
                />
            );
        }
        return skeletonUi;
    };

    return (
        <BlogStyle.Wrapper>
            <div
                style={{
                    background: "white",
                    borderBottom: "1px solid #ececec",
                    paddingTop: "15px",
                    paddingBottom: "15px",
                }}
            >
                <SearchBoardInput setSearchKeyword={setSearchKeyword} />
                {/* write button */}
                {userInfo?.email !== null && loginStatus == true ? (
                    <BlogStyle.BoardWriteBtn
                        onClick={() => {
                            router.push(`/blog/create`);
                        }}
                        style={{ marginTop: "15px" }}
                    >
                        write
                    </BlogStyle.BoardWriteBtn>
                ) : null}
            </div>
            <div style={{ minHeight: "360px" }}>
                <BlogStyle.BoardListBox>
                    {!searchKeyword &&
                        filteredData.map((el, index) => (
                            <BoardBox
                                key={index}
                                boardData={el}
                                onClick={() => {
                                    moveToDetail(el.id);
                                }}
                            />
                        ))}

                    {/* 검색 결과 */}
                    {searchKeyword &&
                        searchResult.map((el, index) => (
                            <BoardBox
                                key={index}
                                boardData={el}
                                onClick={() => {
                                    moveToDetail(el.id);
                                }}
                            />
                        ))}
                    {/* 스켈레톤 */}
                    {loading && (
                        <div
                            style={{
                                paddingLeft: "10px",
                                paddingRight: "10px",
                            }}
                        >
                            {skeleton()}
                        </div>
                    )}
                </BlogStyle.BoardListBox>
            </div>
        </BlogStyle.Wrapper>
    );
}
