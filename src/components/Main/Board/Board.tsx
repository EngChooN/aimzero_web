import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as Boards from "./Board.styles";
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

export default function Board(props: any) {
  const [loginStatus, setLoginStatus] = useRecoilState(loginState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  // 1, 2, 3으로 불러오는 글이 다르게 보임 (각 게시판 db 컬렉션 명을 1, 2, 3으로 한다던지...)
  // fetch comments func
  const router = useRouter();
  const [boardData, setBoardData] = useState([]);

  async function fetchComments() {
    const board = collection(getFirestore(firebaseApp), props.menu);
    const result = await getDocs(query(board, orderBy("timestamp", "desc")));
    const fetchData = result.docs.map((el) => el.data());
    setBoardData(fetchData);
  }
  // first time fetch
  useEffect(() => {
    fetchComments();
  }, []);

  const moveToDetail = (e) => {
    // router.push(`/board/${props.menu}=${e.currentTarget.id}`);
    location.href = `/board/${props.menu}=${e.currentTarget.id}`;
    console.log(e.currentTarget.id);
  };

  return (
    <Boards.Wrapper>
      <Boards.BoardListBox>
        <Boards.BoardInfo>
          <Boards.BoardNumberInfo>No</Boards.BoardNumberInfo>
          <Boards.BoardTitleInfo>title</Boards.BoardTitleInfo>
          <Boards.NameInfo>name</Boards.NameInfo>
          <Boards.BoardDateInfo>date</Boards.BoardDateInfo>
        </Boards.BoardInfo>
      </Boards.BoardListBox>
      <Boards.BoardListBox>
        {boardData.reverse().map((el, index) => (
          <Boards.Board key={index} id={el.id} onClick={moveToDetail}>
            <Boards.BoardNumber>{index + 1}</Boards.BoardNumber>
            <Boards.BoardTitle>{el.title}</Boards.BoardTitle>
            <Boards.Name>{el.name}</Boards.Name>
            <Boards.BoardDate>
              {el.timestamp.toDate().toISOString()}
            </Boards.BoardDate>
          </Boards.Board>
        ))}
      </Boards.BoardListBox>
      <Boards.BoardBottomBox>
        {/* pagenation */}
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
