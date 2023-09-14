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
        router.push("/blog");
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
            <TagView tags={boardData.tag} />
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
    @media (max-width: 1100px) {
        min-height: calc(100vh - 64.5px - 170px);
        padding-top: 15px;
    }

    @media (max-width: 400px) {
        padding: 10px;
        padding-top: 15px;
    }
`;

const Title = styled.div`
    font-family: AbrilFatface;
    font-size: 35px;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid lightgray;
`;

const InfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    @media (max-width: 400px) {
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 90px;
    }
`;

const Name = styled.div`
    font-size: 18px;
    font-family: serif;
    margin-right: 15px;
`;

const Date = styled.div`
    font-family: serif;
    font-size: 13px;
    color: gray;
    text-align: center;
`;

const Btns = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const Tags = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 20px;
    border-bottom: 1px solid lightgray;
`;

const Tag = styled.div`
    display: flex;
    align-items: center;

    height: 30px;
    background-color: #f3f3f3;
    border-radius: 15px;

    padding-right: 10px;
    padding-left: 10px;
    margin-right: 10px;
    margin-bottom: 20px;

    font-family: serif;
    font-size: 12px;
`;
