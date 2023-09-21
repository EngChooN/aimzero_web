import { useEffect, useState } from "react";
import * as BlogStyle from "./Blog.styles";
// firebase
import {
    DocumentData,
    collection,
    getDocs,
    getFirestore,
    orderBy,
    query,
} from "firebase/firestore";
// recoil
import { useRecoilState } from "recoil";
// antd
import { Skeleton } from "antd";
import { useBoardSearch } from "@/hooks/commons";
import BoardBox from "@/components/Main/Board/BoardBox";
import { loginState } from "@/common/Recoil/loginState";
import { userInfoState } from "@/common/Recoil/userInfoState";
import { useRouter } from "next/router";
import SearchBoardInput from "../Main/SearchBoardInput";
import { firebaseApp } from "firebase.config";

export default function Blog(props: { menu: string }) {
    const { menu } = props;

    const [loginStatus] = useRecoilState(loginState);
    const [userInfo] = useRecoilState(userInfoState);
    const [isLoading, setIsLoading] = useState(true);

    // fetch comments func
    const router = useRouter();
    const { tag } = router.query;
    const [boardData, setBoardData] = useState<DocumentData[]>([]); // list data (board)
    const [filteredData, setFilteredData] = useState<DocumentData[]>([]);
    // search board
    const [searchKeyword, setSearchKeyword, searchResult] =
        useBoardSearch(menu);

    async function fetchBoards() {
        const board = collection(getFirestore(firebaseApp), menu);
        const result = await getDocs(
            query(board, orderBy("timestamp", "desc"))
        );
        const fetchData = result.docs.map((el) => el.data());
        setBoardData(fetchData);
        setIsLoading(false);
    }

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
            setFilteredData(boardData);
            filteredBoardByTag();
        }
    }, [router, boardData]);

    useEffect(() => {
        fetchBoards();
    }, []);

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
                    {isLoading && (
                        <div
                            style={{
                                paddingLeft: "10px",
                                paddingRight: "10px",
                            }}
                        >
                            {skeleton()}
                        </div>
                    )}
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
                </BlogStyle.BoardListBox>
            </div>
        </BlogStyle.Wrapper>
    );
}
