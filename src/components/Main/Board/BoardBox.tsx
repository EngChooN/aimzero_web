import TagView from "@/components/commons/Tag/TagView";
import styled from "@emotion/styled";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";

export default function BoardBox(props: {
    boardData: DocumentData;
    onClick: () => void;
    path?: string;
}) {
    const { boardData, onClick, path } = props;

    return (
        <>
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
            <StyledBoardBox>
                <h1 onClick={onClick}>{boardData.title}</h1>
                <p>{boardData.desc || " "}</p>
                {boardData.tag && boardData.tag.length > 0 && (
                    <TagView tags={boardData.tag} path={"blog"} />
                )}
            </StyledBoardBox>
        </>
    );
}

const StyledBoardBox = styled.article`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;
    padding: 20px 10px 20px 10px;
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
        margin-top: 20px;
        margin-bottom: 0px;

        > div {
            margin: 0px 10px 10px 0px;
        }
    }
`;

const ImgWrapper = styled.article`
    position: relative;
    width: 100%;
    height: 400px;

    > img {
        cursor: pointer;
        object-fit: cover;
    }

    @media (max-width: 1100px) {
        height: 300px;
    }
`;
