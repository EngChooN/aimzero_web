import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Image from "next/image";
import { ExperimentDataType } from "@/pages/experiment";

export default function ExperimentBox(props: {
    experimentData: ExperimentDataType;
}) {
    const { experimentData } = props;
    const router = useRouter();
    return (
        <StyledExperimentBox>
            <ImgWrapper
                onClick={() => {
                    router.push(experimentData.link);
                }}
            >
                <Image
                    src={experimentData.thumb}
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
                        router.push(experimentData.link);
                    }}
                >
                    {experimentData.name}
                </h1>
                <p>{experimentData.desc}</p>
            </InfoWrapper>
        </StyledExperimentBox>
    );
}

const StyledExperimentBox = styled.article`
    max-width: 400px;
    min-width: 260px;
    width: 100%;
    min-height: 400px;
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
`;
