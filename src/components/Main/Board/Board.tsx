import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as Boards from "./Board.styles";
import PaginationBtn from "../../Pagination/Pagination";
// firebase
import { firebaseApp } from "../../../../firebase.config";
import {
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

export default function Board(props: any) {
  const [loginStatus, setLoginStatus] = useRecoilState(loginState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [isLoading, setIsLoading] = useState(true);

  // fetch comments func
  const router = useRouter();
  const [boardListData, setBoardListData] = useState([]); // list data (board)
  const [boardData, setBoardData] = useState([]); // list data per page (board)
  const [limit, setLimit] = useState(5); // list data length per page
  const [page, setPage] = useState(1); // page value (default = 1)

  async function fetchBoards() {
    const board = collection(getFirestore(firebaseApp), props.menu);
    const result = await getDocs(query(board, orderBy("timestamp", "desc")));
    const fetchData = result.docs.map((el) => el.data());
    setBoardListData(fetchData);
    setBoardData(fetchData.slice((page - 1) * limit, page * limit));
    setIsLoading(false);
  }
  // first time fetch
  useEffect(() => {
    fetchBoards();
  }, [page]);

  const moveToDetail = (e) => {
    router.push(`/board/${props.menu}=${e.currentTarget.id}`);
    // location.href = `/board/${props.menu}=${e.currentTarget.id}`;
    console.log(e.currentTarget.id);
  };

  return (
    <Boards.Wrapper>
      <div style={{ minHeight: "360px" }}>
        <Boards.BoardListBox>
          <Boards.BoardInfo>
            <Boards.BoardNumberInfo>No</Boards.BoardNumberInfo>
            <Boards.BoardTitleInfo>title</Boards.BoardTitleInfo>
            <Boards.NameInfo>name</Boards.NameInfo>
            <Boards.BoardDateInfo>date</Boards.BoardDateInfo>
          </Boards.BoardInfo>
        </Boards.BoardListBox>
        <Boards.BoardListBox>
          {isLoading && (
            <>
              <Skeleton.Button
                active={true}
                size={"large"}
                shape={"square"}
                block={true}
                style={{ marginTop: "20px" }}
              />
              <Skeleton.Button
                active={true}
                size={"large"}
                shape={"square"}
                block={true}
                style={{ marginTop: "20px" }}
              />
              <Skeleton.Button
                active={true}
                size={"large"}
                shape={"square"}
                block={true}
                style={{ marginTop: "20px" }}
              />
              <Skeleton.Button
                active={true}
                size={"large"}
                shape={"square"}
                block={true}
                style={{ marginTop: "20px" }}
              />
            </>
          )}
          {boardData.map((el, index) => (
            <Boards.Board key={index} id={el.id} onClick={moveToDetail}>
              <Boards.BoardNumber>
                {boardListData.length - (page - 1) * limit - index}
              </Boards.BoardNumber>
              <Boards.BoardTitle>{el.title}</Boards.BoardTitle>
              <Boards.Name>{el.name}</Boards.Name>
              <Boards.BoardDate>
                {el.timestamp.toDate().toISOString().split("T")[0]}
              </Boards.BoardDate>
            </Boards.Board>
          ))}
        </Boards.BoardListBox>
      </div>
      {/* pagenation */}
      <PaginationBtn
        listLength={boardListData.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
      <Boards.BoardBottomBox>
        {/* write button blog */}
        {props.menu == "blog" &&
        userInfo?.email == "aimzero9303@gmail.com" &&
        loginStatus == true ? (
          <Boards.BoardWriteBtn
            onClick={() => {
              router.push(`/board/write#${props.menu}`);
            }}
          >
            write
          </Boards.BoardWriteBtn>
        ) : null}
        {/* write button qna */}
        {props.menu == "qna" && userInfo?.email != "" && loginStatus == true ? (
          <Boards.BoardWriteBtn
            onClick={() => {
              router.push(`/board/write#${props.menu}`);
            }}
          >
            write
          </Boards.BoardWriteBtn>
        ) : null}
        {/* write button news */}
        {props.menu == "news" &&
        userInfo?.email == "aimzero9303@gmail.com" &&
        loginStatus == true ? (
          <Boards.BoardWriteBtn
            onClick={() => {
              router.push(`/board/write#${props.menu}`);
            }}
          >
            write
          </Boards.BoardWriteBtn>
        ) : null}
      </Boards.BoardBottomBox>
    </Boards.Wrapper>
  );
}
