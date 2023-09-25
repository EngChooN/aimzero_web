import styled from "@emotion/styled";

import Image from "next/image";
import Button from "../../commons/Button/Button";
import { useRouter } from "next/router";
import { ExperimentDataType } from "@/pages/experiment";

export default function CarouselBox(props: {
    experimentData: ExperimentDataType;
}) {
    const { experimentData } = props;
    const router = useRouter();
    return (
        <StyledCarouselBox>
            <div>
                <h1>{experimentData.name}</h1>
                <p>{experimentData.desc}</p>
                <Button
                    label="Go to click"
                    backgroundColor="black"
                    primary={false}
                    onClick={() => {
                        router.push(experimentData.link);
                    }}
                />
            </div>
            <Image src={experimentData.thumb} alt="experiment thumbnail" fill />
        </StyledCarouselBox>
    );
}

const StyledCarouselBox = styled.article`
    position: relative;

    > img {
        position: static !important;
        height: 300px !important;
        object-fit: cover;
        border-radius: 10px;
    }

    > div {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 300px;
        height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 15px;
        background-color: rgba(255, 255, 255, 0.8);
        backdrop-filter: saturate(180%) blur(20px);
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;

        > h1 {
            margin: 0px;
            font-size: 23px;
        }

        > p {
            font-size: 14px;
        }

        > button {
            max-width: fit-content;
            width: 100%;
            margin: 0px;
        }
    }
`;
