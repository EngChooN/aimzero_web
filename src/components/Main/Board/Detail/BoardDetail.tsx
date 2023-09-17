import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { DocumentData, deleteDoc, doc } from "firebase/firestore";
import { firebaseDb } from "../../../../../firebase.config";
import { useEffect } from "react";
import Reply from "../../../Reply/Reply";
import TagView from "@/components/commons/Tag/TagView";
import BoardTitle from "@/components/commons/Board/BoardTitle";
import TopBoardInfo from "@/components/commons/Board/TopBoardInfo";
import EditorRead from "@/components/commons/Editor/EditorRead";

export default function BoardDetail(props: { boardData: DocumentData }) {
    const { boardData } = props;
    const router = useRouter();
    // url hash
    // get url parameter
    const urlParams = router.query.boardID;
    // blog, qna, news
    let boardType: string;

    useEffect(() => {
        if (urlParams === undefined) return;
        // parameter => clicked board type ...ex) blog, qna, news
        boardType = (urlParams as string).split("=")[0];
    });

    const deleteBoard = (id: string) => {
        deleteDoc(doc(firebaseDb, boardType, id));
        router.push("/board");
    };
    return (
        <StyledBoardDetail>
            <BoardTitle title={boardData.title} />
            <TopBoardInfo
                writer={boardData.name}
                timestamp={boardData.timestamp}
                updateFunc={() => {
                    router.push(`/board/${boardData.id}/edit#${boardType}`);
                }}
                deleteFunc={() => {
                    deleteBoard(boardData.id);
                }}
            />
            <EditorRead initialValue={boardData.content} />
            <Reply boardData={boardData} />
        </StyledBoardDetail>
    );
}

// styles
const StyledBoardDetail = styled.article`
    display: flex;
    flex-direction: column;

    padding-bottom: 70px;
    margin-bottom: 30px;
    height: 100%;

    > h1 {
        margin-top: 0px;
    }

    @media (max-width: 1100px) {
        min-height: calc(100vh - 64.5px - 170px);
        padding-top: 15px;
    }

    @media (min-width: 1100px) {
        padding-top: 30px;
    }

    @media (max-width: 400px) {
        padding: 10px;
        padding-top: 15px;
    }
`;
