import { SkillsData } from "@/common/data/skillsData";
import styled from "@emotion/styled";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function HomeSec02() {
    const proficiency3 = SkillsData.filter((el) => {
        return el.proficiency === 3;
    });

    const proficiency2 = SkillsData.filter((el) => {
        return el.proficiency === 2;
    });

    const proficiency1 = SkillsData.filter((el) => {
        return el.proficiency === 1;
    });

    useEffect(() => {
        // AOS 라이브러리 init
        AOS.init();
    }, []);

    return (
        <Section>
            <h1 data-aos="zoom-in">🛠️ Skills</h1>
            <SkillsWrapper>
                <h2 data-aos="fade-right">🥇 Proficient</h2>
                <h3 data-aos="fade-right">
                    특별한 도움 없이, 업무 수행이 가능한 기술
                </h3>
                <SkillsGrid>
                    {proficiency3.map((el, index) => (
                        <SkillBox key={index} data-aos="fade-up">
                            <ImgWrapper>
                                <img src={el.img} style={el.imgStyle} />
                            </ImgWrapper>
                            <DescWrapper>
                                <h1>{el.name}</h1>
                                <span>{el.desc}</span>
                            </DescWrapper>
                        </SkillBox>
                    ))}
                </SkillsGrid>
                <h2 data-aos="fade-right">🥈 Demonstrating</h2>
                <h3 data-aos="fade-right">
                    능숙하진 않으나, 기본적인 업무 수행이 가능한 기술
                </h3>
                <SkillsGrid>
                    {proficiency2.map((el, index) => (
                        <SkillBox key={index} data-aos="fade-up">
                            <ImgWrapper>
                                <img src={el.img} style={el.imgStyle} />
                            </ImgWrapper>
                            <DescWrapper>
                                <h1>{el.name}</h1>
                                <span>{el.desc}</span>
                            </DescWrapper>
                        </SkillBox>
                    ))}
                </SkillsGrid>
                <h2 data-aos="fade-right">🥉 ETC</h2>
                <h3 data-aos="fade-right">
                    개발 관련 프로그램이나, 사용 경험이 있는 기술 및 서비스
                </h3>
                <SkillsGrid>
                    {proficiency1.map((el, index) => (
                        <SkillBox key={index} data-aos="fade-up">
                            <ImgWrapper>
                                <img src={el.img} style={el.imgStyle} />
                            </ImgWrapper>
                            <DescWrapper>
                                <h1>{el.name}</h1>
                                <span>{el.desc}</span>
                            </DescWrapper>
                        </SkillBox>
                    ))}
                </SkillsGrid>
            </SkillsWrapper>
        </Section>
    );
}

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    max-width: 1200px;
    width: 100%;
    height: fit-content;
    color: white;

    > h1 {
        font-size: 40px;
        margin-bottom: 20px;

        @media (max-width: 600px) {
            font-size: 30px;
        }
    }
`;

const SkillsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    > h2 {
        max-width: 970px;
        width: 100%;
        margin-bottom: 10px;
        font-size: 30px;
    }

    > h3 {
        max-width: 970px;
        width: 100%;
        margin-top: 0px;
    }

    @media (max-width: 600px) {
        > h2 {
            font-size: 25px;
        }

        > h3 {
            font-size: 17px;
        }
    }
`;

const SkillsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin-bottom: 80px;

    @media (max-width: 910px) {
        display: flex;
        flex-direction: column;
    }
`;

const SkillBox = styled.div`
    padding: 10px;
    display: flex;
    max-width: 500px;
    width: 100%;
    min-height: 210px;
    height: fit-content;
    box-shadow: 0px 0px 10px white;
    border-radius: 15px;
    transition: 0.3s all ease;

    @media (max-width: 910px) {
        max-width: 100%;
    }

    @media (max-width: 600px) {
        min-height: fit-content;
    }
`;

const ImgWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100px;
    height: 100%;
    padding: 5px;

    > img {
        height: 100%;
    }
`;

const DescWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 350px;
    width: 100%;

    > h1 {
        font-size: 20px;
        margin-top: 5px;
        margin-bottom: 10px;
    }

    @media (max-width: 910px) {
        max-width: 100%;
    }

    @media (max-width: 600px) {
        > span {
            font-size: 15px;
        }
    }
`;
