import TagView from "@/components/commons/Tag/TagView";
import styled from "@emotion/styled";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";

export default function BoardBox(props: {
    boardData: DocumentData;
    onClick: () => void;
}) {
    const { boardData, onClick } = props;

    return (
        <>
            <StyledBoardBox>
                {boardData.thumb && boardData.thumb.length > 0 && (
                    <ImgWrapper>
                        <Image
                            src={boardData.thumb}
                            alt="blog thumbnail"
                            fill
                            quality={50}
                            loading="lazy"
                            onClick={onClick}
                        />
                    </ImgWrapper>
                )}

                <h1 onClick={onClick}>{boardData.title}</h1>
                <p>{boardData.desc || " "}</p>
                {boardData.tag && boardData.tag.length > 0 && (
                    <TagView tags={boardData.tag} path={"blog"} />
                )}
                <div style={{ marginTop: "0px", marginBottom: "15px" }}>
                    <span className="name">{boardData.name}</span>
                    <span className="timestamp">
                        {
                            boardData.timestamp
                                .toDate()
                                .toISOString()
                                .split("T")[0]
                        }
                    </span>
                </div>
            </StyledBoardBox>
        </>
    );
}

const StyledBoardBox = styled.article`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;
    padding: 10px;
    margin-right: 10px;
    border-bottom: 1px solid lightgrey;

    transition: all 0.3s ease;

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
        cursor: pointer;
        transition: all 0.3s ease;

        :hover {
            color: grey;
        }
    }

    > p {
        min-height: 22px;
        margin-bottom: 10px;
        margin-top: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    > div {
        border-bottom: unset;
        margin-top: 10px;
        margin-bottom: 0px;

        .name {
            font-size: 13px;
            margin-right: 10px;
        }

        .timestamp {
            font-size: 11px;
            color: darkgrey;
        }

        > div {
            margin: 0px 10px 10px 0px;
        }
    }
`;

const ImgWrapper = styled.article`
    position: relative;
    width: 100%;
    height: fit-content;

    > img {
        position: static !important;
        cursor: pointer;
        object-fit: cover;
        width: 100% !important;
        height: auto !important;
    }
`;
