import styled from "@emotion/styled";
import dynamic from "next/dynamic";
// firebase
import {
    DocumentData,
    doc,
    getDoc,
    query as fireQuery,
} from "@firebase/firestore";
import { firebaseDb } from "firebase.config";

const BoardViewer = dynamic(
    () => import("../../../components/Main/Board/Detail/BoardDetail"),
    { ssr: false }
);

export default function BoardDetailPage({ boardData }: DocumentData) {
    return (
        <Wrapper>
            <ContentBox>
                <BoardViewer boardData={boardData} />
            </ContentBox>
        </Wrapper>
    );
}

export async function getServerSideProps({ query }: DocumentData) {
    let data = {};

    const urlParams = query.boardID;
    const boardType = urlParams.split("=")[0];
    const boardId = urlParams.split("=")[1];

    const docRef = doc(firebaseDb, boardType, boardId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        data = docSnap.data();
    }

    let boardData = {
        // @ts-ignore
        title: data.title,
        // @ts-ignore
        content: data.content,
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

// styles
const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;

    max-width: 1200px;
    width: 100%;
    height: fit-content;
    min-height: calc(100vh - 250px);

    padding-bottom: 30px;
    padding-left: 10px;
    padding-right: 10px;

    @media (max-width: 1100px) {
        min-height: calc(100vh - 235px);
    }

    @media (max-width: 400px) {
        padding: 0px;
    }
`;

const ContentBox = styled.article`
    max-width: 800px;
    width: 100%;
`;
