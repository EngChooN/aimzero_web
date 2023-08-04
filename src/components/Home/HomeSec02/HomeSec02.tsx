import styled from "@emotion/styled";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function HomeSec02() {
    const SkillsData = [
        {
            name: "HTML",
            desc: "마크업을 통하여 웹페이지를 만들고 구조를 짤 수 있습니다.",
            img: "/images/landing/skills/html.png",
            imgStyle: { width: "80px" },
            proficiency: 3, // 1: 하, 2:중, 3:상
        },
        {
            name: "CSS",
            desc: "요청에 맞게 페이지 구조를 잡을 수 있고, 꾸미거나 애니메이션을 적용해 인터렉티브 한 페이지를 만들 수 있습니다.",
            img: "/images/landing/skills/css.png",
            imgStyle: { width: "80px" },
            proficiency: 3, // 1: 하, 2:중, 3:상
        },
        {
            name: "JavaScript",
            desc: "데이터의 가공과 DOM을 제어할 수 있으며, 이벤트또는 동적인 처리를 할 수 있습니다.",
            img: "/images/landing/skills/js.png",
            imgStyle: { width: "65px" },
            proficiency: 3, // 1: 하, 2:중, 3:상
        },
        {
            name: "NextJS",
            desc: "React 프레임워크인 Next.JS를 사용하여, SSR을 이용한 웹페이지 개발을 할 수 있습니다. 그 외 페이지 기반 라우팅 등등 저에게 가장 익숙한 방식입니다.",
            img: "/images/landing/skills/next.png",
            imgStyle: { width: "70px" },
            proficiency: 3, // 1: 하, 2:중, 3:상
        },
        {
            name: "React/React-Hooks",
            desc: "React 16 때 나온 Hooks를 사용하여 개발 할 수 있습니다. 또한 Custom-Hook를 만들어서 복잡하고 반복되는 로직을 재사용이 가능하게 개발하는것을 지향합니다. 함수형 프로그래밍은 개발은 저에게 가장 익숙한 방법입니다.",
            img: "/images/landing/skills/react.png",
            imgStyle: { width: "70px" },
            proficiency: 2, // 1: 하, 2:중, 3:상
        },
        {
            name: "Recoil",
            desc: "Recoil을 이용하여, 전역 State를 관리 할 수 있습니다. 따라서 Props drilling 없이, State를 불러오거나 수정 할 수 있습니다.",
            img: "/images/landing/skills/recoil.svg",
            imgStyle: { width: "60px" },
            proficiency: 3, // 1: 하, 2:중, 3:상
        },
        {
            name: "Emotion",
            desc: "CSS-in-JS를 사용하여 JavaScript 코드 내에서 CSS를 다룰 수 있고, 컴포넌트에 Props Data를 전달하여 스타일을 동적으로 변경 할 수 있습니다.",
            img: "/images/landing/skills/emotion.png",
            imgStyle: { width: "65px" },
            proficiency: 3, // 1: 하, 2:중, 3:상
        },
    ];

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
            <h1>🛠️ Skills</h1>
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
    width: 100%;
    height: fit-content;
    color: white;
`;

const SkillsWrapper = styled.div`
    width: 100%;
`;

const SkillsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    /* grid-template-columns: 1fr 1fr 1fr; */
`;

const SkillBox = styled.div`
    padding: 10px;
    display: flex;
    max-width: 500px;
    width: 100%;
    min-height: 200px;
    height: fit-content;
    box-shadow: 0px 0px 10px white;
    border-radius: 15px;
    transition: 0.3s all ease;
`;

const ImgWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100px;
    height: 100%;
    padding: 5px;

    > img {
        border-radius: 10px;
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
        margin-top: 15px;
        margin-bottom: 15px;
    }
`;
