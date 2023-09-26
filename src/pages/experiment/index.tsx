import Carousel from "@/components/Experiment/Carousel/Carousel";
import ExperimentBox from "@/components/Experiment/ExperimentBox/ExperimentBox";
import BoardTitle from "@/components/commons/Board/BoardTitle";
import styled from "@emotion/styled";

export interface ExperimentDataType {
    name: string;
    desc: string;
    link: string;
    thumb: string;
}

export default function ExperimentPage() {
    const experimentData = [
        {
            name: "커밋 메세지 만들기",
            desc: "좋은 커밋 메세지를 작성하는 규칙에 기반하여, 쉽게 커밋 메세지를 작성하게 도와주는 페이지 입니다.",
            link: "/experiment/make+commit",
            thumb: "/images/experiment/experiment01.gif",
        },
        {
            name: "원 페이지 스크롤 라이브러리",
            desc: "하나로 보이는 페이지에 여러개의 섹션을 보여, 스크롤 하면 섹션의 단위로 스크롤이 되는 라이브러리 입니다. (pc에서만 동작합니다!!)",
            link: "/experiment/one+page+library",
            thumb: "/images/experiment/experiment02.gif",
        },
    ];
    return (
        <StyledExperimentPage>
            <Carousel experimentData={experimentData} />
            <BoardTitle title="more features.." />
            <section>
                {experimentData.map((el, index) => (
                    <ExperimentBox key={index} experimentData={el} />
                ))}
            </section>
        </StyledExperimentPage>
    );
}

const StyledExperimentPage = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1200px;
    width: 100%;
    min-height: calc(100vh - 250px);
    height: fit-content;
    padding-top: 20px;
    padding-bottom: 50px;
    overflow-x: hidden;

    @media (max-width: 1100px) {
        min-height: calc(100vh - 235px);
    }

    > h1 {
        margin-top: 100px;
        margin-bottom: 0px;
        padding-bottom: 0px;
        border: unset;
    }

    > section {
        width: 100%;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 30px;

        display: grid;
        grid-template-columns: repeat(3, 400px);
        gap: 30px;
        justify-items: center;

        @media (max-width: 1260px) {
            grid-template-columns: repeat(2, 400px);
        }

        @media (max-width: 840px) {
            grid-template-columns: repeat(1, 400px);
        }

        @media (max-width: 450px) {
            grid-template-columns: repeat(1, 100%);
            margin-left: 10px;
            margin-right: 10px;
        }
    }
`;
