import { splashScreenState } from "@/common/Recoil/splashScreenState";
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function Splash() {
    const [splashFlag, setSplashFlag] = useRecoilState(splashScreenState);
    const [animationFlag, setAnimationFlag] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            console.log("애니메이션페이드");
            setAnimationFlag(true);
            setTimeout(() => {
                setSplashFlag(false);
                console.log("스플래시 스크린 꺼짐");
            }, 1000);
        }, 2000);
    }, []);
    return (
        <>
            {splashFlag ? (
                <StyledSplash
                    style={{ backgroundColor: "white" }}
                    isFadeOut={animationFlag === true}
                >
                    <Image
                        src={"/images/landing/animation_hi.gif"}
                        alt="splash"
                        width={200}
                        height={200}
                    />
                </StyledSplash>
            ) : null}
        </>
    );
}

const fadeOut = keyframes`
    0% {
        opacity: 1;
    }  
    100% {
        opacity: 0;
    }
`;

const StyledSplash = styled.section<{ isFadeOut: boolean }>`
    position: absolute;
    top: 0px;
    left: 0px;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100vw;
    height: 100vh;

    ${(props) =>
        props.isFadeOut
            ? css`
                  animation: ${fadeOut} 1s ease-in-out;
              `
            : null};
    z-index: 999999;
`;
