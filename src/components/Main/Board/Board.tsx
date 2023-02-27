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
// uuidv4
import { v4 as uuidv4 } from "uuid";

export default function Board(props: any) {
  // 1, 2, 3으로 불러오는 글이 다르게 보임 (각 게시판 db 컬렉션 명을 1, 2, 3으로 한다던지...)
  // fetch comments func
  const router = useRouter();
  const [board1Data, setBoard1Data] = useState([]);

  async function fetchComments() {
    const board1 = collection(getFirestore(firebaseApp), props.menu);
    const result = await getDocs(query(board1, orderBy("timestamp", "desc")));
    const fetchData = result.docs.map((el) => el.data());
    setBoard1Data(fetchData);
  }
  // first time fetch
  useEffect(() => {
    fetchComments();
  }, []);

  const moveToDetail = (e) => {
    router.push(`/${e.currentTarget.id}`);
    console.log(e.currentTarget.id);
  };

  // console.log(uuidv4());

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
        {board1Data.reverse().map((el, index) => (
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
        <Boards.BoardWriteBtn
          onClick={() => {
            router.push("/write");
          }}
        >
          write
        </Boards.BoardWriteBtn>
      </Boards.BoardBottomBox>
    </Boards.Wrapper>
  );
}
