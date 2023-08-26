import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as Boards from "./Board.styles";
import PaginationBtn from "../../Pagination/Pagination";
// firebase
import { firebaseApp } from "../../../../firebase.config";
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
import { userInfoState } from "../../../common/Recoil/userInfoState";
import { loginState } from "../../../common/Recoil/loginState";
// antd
import { Skeleton } from "antd";
import { darkModeState } from "@/common/Recoil/darkModeState";
import SearchBoardInput from "../SearchBoardInput";
import { useBoardSearch } from "@/hooks/commons";

export default function Board(props: { menu: string }) {
    const { menu } = props;
    const [darkMode] = useRecoilState(darkModeState);

    const [loginStatus] = useRecoilState(loginState);
    const [userInfo] = useRecoilState(userInfoState);
    const [isLoading, setIsLoading] = useState(true);

    // fetch comments func
    const router = useRouter();
    const [boardListData, setBoardListData] = useState<DocumentData[]>([]); // list data (board)
    const [boardData, setBoardData] = useState<DocumentData[]>([]); // list data per page (board)
    const [limit] = useState(5); // list data length per page
    const [page, setPage] = useState(1); // page value (default = 1)
    // search board
    const [searchKeyword, setSearchKeyword, searchResult] =
        useBoardSearch(menu);

    console.log("searchResult", searchResult);

    async function fetchBoards() {
        const board = collection(getFirestore(firebaseApp), menu);
        const result = await getDocs(
            query(board, orderBy("timestamp", "desc"))
        );
        const fetchData = result.docs.map((el) => el.data());
        console.log("listData", boardListData);
        console.log("boardData", boardData);
        setBoardListData(fetchData);
        setBoardData(fetchData.slice((page - 1) * limit, page * limit));
        setIsLoading(false);
    }

    // first time fetch
    useEffect(() => {
        fetchBoards();
    }, [page]);

    const moveToDetail = (e: React.MouseEvent<HTMLDivElement>) => {
        // router.push(`/board/${menu}=${e.currentTarget.id}`);
        location.href = `/board/${menu}=${e.currentTarget.id}`;
        console.log(e.currentTarget.id);
    };

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
        <Boards.Wrapper>
            <div style={{ position: "relative" }}>
                <SearchBoardInput setSearchKeyword={setSearchKeyword} />
                {/* write button blog */}
                {menu == "blog" &&
                userInfo?.email == "aimzero9303@gmail.com" &&
                loginStatus == true ? (
                    <Boards.BoardWriteBtn
                        onClick={() => {
                            router.push(`/board/write#${menu}`);
                        }}
                        isDark={darkMode}
                    >
                        write
                    </Boards.BoardWriteBtn>
                ) : null}
                {/* write button qna */}
                {menu == "qna" &&
                userInfo?.email !== null &&
                loginStatus == true ? (
                    <Boards.BoardWriteBtn
                        onClick={() => {
                            router.push(`/board/write#${menu}`);
                        }}
                        isDark={darkMode}
                    >
                        write
                    </Boards.BoardWriteBtn>
                ) : null}
                {/* write button news */}
                {menu === "news" &&
                userInfo?.email === "aimzero9303@gmail.com" &&
                loginStatus == true ? (
                    <Boards.BoardWriteBtn
                        onClick={() => {
                            router.push(`/board/write#${menu}`);
                        }}
                        isDark={darkMode}
                    >
                        write
                    </Boards.BoardWriteBtn>
                ) : null}
            </div>
            <div style={{ minHeight: "360px" }}>
                <Boards.BoardListBox>
                    <Boards.BoardInfo isDark={darkMode}>
                        <Boards.BoardNumberInfo>No</Boards.BoardNumberInfo>
                        <Boards.BoardTitleInfo>title</Boards.BoardTitleInfo>
                        <Boards.NameInfo>name</Boards.NameInfo>
                        <Boards.BoardDateInfo>date</Boards.BoardDateInfo>
                    </Boards.BoardInfo>
                </Boards.BoardListBox>
                <Boards.BoardListBox>
                    {isLoading && <>{skeleton()}</>}
                    {!searchKeyword &&
                        boardData.map((el, index) => (
                            <Boards.Board
                                key={index}
                                id={el.id}
                                onClick={moveToDetail}
                                isDark={darkMode}
                            >
                                <Boards.BoardNumber>
                                    {boardListData.length -
                                        (page - 1) * limit -
                                        index}
                                </Boards.BoardNumber>
                                <Boards.BoardTitle>
                                    {el.title}
                                </Boards.BoardTitle>
                                <Boards.Name>{el.name}</Boards.Name>
                                <Boards.BoardDate>
                                    {
                                        el.timestamp
                                            .toDate()
                                            .toISOString()
                                            .split("T")[0]
                                    }
                                </Boards.BoardDate>
                            </Boards.Board>
                        ))}

                    {searchKeyword &&
                        searchResult.map((el, index) => (
                            <Boards.Board
                                key={index}
                                id={el.id}
                                onClick={moveToDetail}
                                isDark={darkMode}
                            >
                                <Boards.BoardNumber>
                                    {searchResult.length - index}
                                </Boards.BoardNumber>
                                <Boards.BoardTitle>
                                    {el.title}
                                </Boards.BoardTitle>
                                <Boards.Name>{el.name}</Boards.Name>
                                <Boards.BoardDate>
                                    {
                                        el.timestamp
                                            .toDate()
                                            .toISOString()
                                            .split("T")[0]
                                    }
                                </Boards.BoardDate>
                            </Boards.Board>
                        ))}
                </Boards.BoardListBox>
            </div>
            {/* pagenation */}
            <Boards.BoardBottomBox>
                {!searchKeyword && (
                    <PaginationBtn
                        listLength={boardListData.length}
                        limit={limit}
                        page={page}
                        setPage={setPage}
                    />
                )}
            </Boards.BoardBottomBox>
        </Boards.Wrapper>
    );
}
