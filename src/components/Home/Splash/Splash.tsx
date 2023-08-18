import { splashScreenState } from "@/common/Recoil/splashScreenState";
import styled from "@emotion/styled";
import Image from "next/image";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function Splash() {
    const [splashFlag, setSplashFlag] = useRecoilState(splashScreenState);

    useEffect(() => {
        setTimeout(() => {
            setSplashFlag(false);
        }, 3000);
    }, []);
    return (
        <>
            {splashFlag ? (
                <StyledSplash style={{ backgroundColor: "white" }}>
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

const StyledSplash = styled.section`
    position: absolute;
    top: 0px;
    left: 0px;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100vw;
    height: 100vh;

    z-index: 999999;
`;
