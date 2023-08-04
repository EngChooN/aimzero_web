import { darkModeState } from "@/common/Recoil/darkModeState";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function HomeSec01() {
    const [darkMode] = useRecoilState(darkModeState);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        // 이벤트 등록
        window.addEventListener("scroll", handleScroll);

        // 메모리 최적화를 위해 이벤트 삭제 (선택사항)
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <Section>
            <BgWrapper scrollY={scrollY}>
                <img className="moon" src={"images/landing/bg3.png"} />
                <h1>안녕하세요</h1>
                <img className="bg2" src={"images/landing/bg2.png"} />
                <img className="bg1" src={"images/landing/bg1.png"} />
                <img className="star" src={"images/landing/bg4.png"} />
                {!darkMode ? (
                    <DivideBox
                        style={{
                            background:
                                "linear-gradient(to top, rgb(28, 5, 34), transparent)",
                        }}
                    ></DivideBox>
                ) : (
                    <DivideBox
                        style={{
                            background:
                                "linear-gradient(to top, #18181b, transparent)",
                        }}
                    ></DivideBox>
                )}
            </BgWrapper>
        </Section>
    );
}

const extend = keyframes`
    0% {
        transform: scale(0.7);    
    }
    50% {
        transform: scale(0.73);
    }
    100% {
        transform: scale(0.7);
    }
`;

const twinkle = keyframes`
    0% {
        opacity: 0;    
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`;

const Section = styled.section`
    width: 100%;
    height: fit-content;
`;

const BgWrapper = styled.div<{ scrollY: number }>`
    width: 100%;
    height: 100vh;
    overflow: hidden;

    display: flex;
    justify-content: center;
    position: relative;
    background: linear-gradient(to top, rgb(117, 151, 222), transparent);

    > h1 {
        font-size: 5rem;
        color: white;
        position: absolute;
        top: ${(props) => props.scrollY * 1 + "px"};
        left: 1;
        margin-right: ${(props) => props.scrollY * 1.5 + "px"};
        margin-top: ${(props) => 300 + props.scrollY * 0.3 + "px"};
        z-index: 3;

        @media (max-width: 735px) {
            font-size: 3rem;
        }
    }

    // 가운데 작은 산 배경
    .bg2 {
        position: absolute;
        width: 100%;
        height: 100%;
        top: ${(props) => props.scrollY * 0.5 + "px"};
        object-fit: cover;
        z-index: 2;
    }

    // 큰 산 배경
    .bg1 {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: ${(props) => props.scrollY * 1 + "px"};
        z-index: 4;
        object-fit: cover;
    }

    // 별
    .star {
        position: absolute;
        width: 100%;
        height: 100%;
        left: ${(props) => props.scrollY * 0.5 + "px"};
        bottom: ${(props) => props.scrollY * 0.5 + "px"};
        animation: ${twinkle} 2s ease-in-out infinite;
        z-index: 0;
    }

    // 달
    .moon {
        position: absolute;
        mix-blend-mode: screen;
        animation: ${extend} 3s ease-in-out infinite;
        top: ${(props) => -200 + props.scrollY * 2 + "px"};
        z-index: 1;
    }
`;

const DivideBox = styled.div`
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 80px;
    z-index: 999;

    @media (max-width: 1100px) {
        bottom: -55px;
    }
`;
