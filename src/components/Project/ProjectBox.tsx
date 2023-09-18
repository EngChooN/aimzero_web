import styled from "@emotion/styled";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";

export default function ProjectBox(props: { boardData: DocumentData }) {
    const { boardData } = props;
    const router = useRouter();
    return (
        <StyledProjectBox
            onClick={() => {
                router.push(`/project/${boardData?.id}`);
            }}
        >
            <ImgWrapper>
                <Image
                    src={boardData.thumb}
                    fill
                    alt="thumbnail"
                    loading="lazy"
                    quality={30}
                />
            </ImgWrapper>
            <InfoWrapper>
                <h1>{boardData.title}</h1>
                <p>{boardData.desc}</p>
                <span>
                    {boardData.timestamp.toDate().toISOString().split("T")[0]}
                </span>
            </InfoWrapper>
        </StyledProjectBox>
    );
}

const StyledProjectBox = styled.article`
    max-width: 400px;
    width: 100%;
    min-height: 480px;
    height: fit-content;
    border: 1px solid lightgrey;
    border-radius: 15px;
    cursor: pointer;
`;

const ImgWrapper = styled.div`
    position: relative;
    height: 250px;
    object-fit: cover;

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
    }

    > p {
        font-size: 14px;
        margin: 10px 0px 10px 0px;
    }

    > span {
        font-size: 12px;
        color: darkgrey;
    }
`;
