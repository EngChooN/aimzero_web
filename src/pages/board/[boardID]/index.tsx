import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
// firebase
import { collection, getDocs, where } from "firebase/firestore";
import { doc, getDoc, query as fireQuery } from "@firebase/firestore";
import { firebaseDb } from "../../../../firebase.config";
import Main from "../../../components/Main/Main";

const BoardViewer = dynamic(
  () => import("../../../components/Main/Board/BoardViewer/BoardViewer"),
  { ssr: false }
);

// styles
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 1200px;
  width: 100%;
  min-height: calc(100vh - 300px);
  height: 100%;
  @media (max-width: 1100px) {
    min-height: calc(100vh - 64.5px - 170px);
  }
  padding-bottom: 30px;
  padding-top: 30px;

  @media (max-width: 400px) {
    padding: 0px;
  }
`;

const ContentBox = styled.article`
  max-width: 800px;
  width: 100%;
`;

export default function BoardDetailPage({ boardData }) {
  console.log("get server side props data: ", boardData);
  const router = useRouter();

  return (
    <Wrapper>
      {/* board detail component */}
      <ContentBox>
        <BoardViewer boardData={boardData} />
      </ContentBox>
      {/* boards list component */}
      <Main />
    </Wrapper>
  );
}

export async function getServerSideProps({ query }) {
  let data = {};

  const urlParams = query.boardID;
  const boardType = urlParams.split("=")[0];
  const boardId = urlParams.split("=")[1];

  const docRef = doc(firebaseDb, boardType, boardId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    data = docSnap.data();
  } else {
    console.log("No such document!");
  }

  let boardData = {
    // @ts-ignore
    title: data.title,
    // @ts-ignore
    content: data.content,
    // @ts-ignore
    tag: data.tag,
    // @ts-ignore
    name: data.name,
    // @ts-ignore
    id: data.id,
    // @ts-ignore
    email: data.email,
    // @ts-ignore
    timestamp: data.timestamp.toDate().toISOString().split("T")[0],
  };

  return {
    props: { boardData },
  };
}
