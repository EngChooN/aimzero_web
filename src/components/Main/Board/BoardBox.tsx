import styled from "@emotion/styled";
import { DocumentData } from "firebase/firestore";

export default function BoardBox(props: {
    boardData: DocumentData;
    onClick: () => void;
}) {
    const { boardData, onClick } = props;

    return (
        <StyledBoardBox onClick={onClick}>
            <TopInfoWrapper>
                <span className="name">{boardData.name}</span>
                <span className="timestamp">
                    {boardData.timestamp.toDate().toISOString().split("T")[0]}
                </span>
            </TopInfoWrapper>
            <h1>{boardData.title}</h1>
            <p>{boardData.desc || " "}</p>
        </StyledBoardBox>
    );
}

const StyledBoardBox = styled.article`
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    height: fit-content;
    padding: 20px 10px 20px 10px;
    border-bottom: 1px solid lightgrey;

    transition: all 0.3s ease;
    cursor: pointer;

    :hover {
        background-color: #ececec;
    }

    > h1 {
        margin: 0px;
        margin-top: 15px;
        font-size: 20px;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    > p {
        min-height: 22px;
        margin-bottom: 10px;
        margin-top: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

const TopInfoWrapper = styled.div`
    display: flex;
    align-items: flex-end;

    .name {
        font-size: 14px;
        margin-right: 10px;
    }

    .timestamp {
        color: darkgrey;
        font-size: 12px;
    }
`;
