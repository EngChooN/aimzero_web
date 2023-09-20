import styled from "@emotion/styled";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import TagView from "../commons/Tag/TagView";

export default function ProjectBox(props: { boardData?: DocumentData }) {
    const { boardData } = props;
    const router = useRouter();

    return (
        <StyledProjectBox>
            <ImgWrapper
                onClick={() => {
                    router.push(`/project/${boardData?.id}`);
                }}
            >
                <Image
                    src={boardData?.thumb}
                    fill
                    alt="thumbnail"
                    loading="lazy"
                    sizes="100%, 250px"
                    placeholder="empty"
                />
            </ImgWrapper>
            <InfoWrapper>
                <h1
                    onClick={() => {
                        router.push(`/project/${boardData?.id}`);
                    }}
                >
                    {boardData?.title}
                </h1>
                <p>{boardData?.desc}</p>
                <TagView tags={boardData?.tag} path="project" />
                <span>
                    {boardData?.timestamp.toDate().toISOString().split("T")[0]}
                </span>
            </InfoWrapper>
        </StyledProjectBox>
    );
}

export const StyledProjectBox = styled.article`
    max-width: 400px;
    min-width: 260px;
    width: 100%;
    min-height: 515px;
    height: fit-content;
    border: 1px solid lightgrey;
    border-radius: 15px;

    @media (max-width: 840px) {
        min-height: unset;
    }
`;

const ImgWrapper = styled.div`
    position: relative;
    height: 250px;
    object-fit: cover;
    border-bottom: 1px solid lightgrey;
    cursor: pointer;

    > img {
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        object-fit: cover;
    }
`;

const InfoWrapper = styled.div`
    padding: 10px;
    height: fit-content;

    > h1 {
        font-size: 22px;
        margin: 10px 0px 10px 0px;
        transition: all 0.3s ease;
        cursor: pointer;

        :hover {
            color: #787878;
        }
    }

    > p {
        font-size: 14px;
        margin: 10px 0px 10px 0px;
    }

    > span {
        font-size: 12px;
        color: darkgrey;
    }

    > div {
        overflow-x: scroll;
        flex-wrap: nowrap;
        border-bottom: unset;
        margin-top: 20px;
        margin-bottom: 0px;

        @media (max-width: 450px) {
            overflow-x: unset;
            flex-wrap: wrap;
        }

        > div {
            margin: 0px 10px 10px 0px;
            min-width: fit-content;
        }
    }
`;
