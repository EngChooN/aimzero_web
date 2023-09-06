import { darkModeState } from "@/common/Recoil/darkModeState";
import { useRecoilState } from "recoil";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import styled from "@emotion/styled";
import { ButtonWrapper } from "@/components/Layout/FloatingButton/FloatingButton";
import { useEffect } from "react";

export default function DarkModeSwitch() {
    const [darkMode, setDarkMode] = useRecoilState(darkModeState);

    const onClickTheme = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem("dark", JSON.stringify(newDarkMode));
    };

    useEffect(() => {
        const buttonWrapper = document.querySelector(
            ".darkMode"
        ) as HTMLElement;
        if (buttonWrapper) {
            buttonWrapper.style.bottom = "100px";
        }
    }, []);

    return (
        <StyledDarkModeSwitch>
            <ButtonWrapper
                className="darkMode"
                onClick={onClickTheme}
                style={{ right: "15px" }}
            >
                {darkMode === false ? (
                    <MdDarkMode size={30} style={{ cursor: "pointer" }} />
                ) : (
                    <MdLightMode size={30} style={{ cursor: "pointer" }} />
                )}
            </ButtonWrapper>
        </StyledDarkModeSwitch>
    );
}

const StyledDarkModeSwitch = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;
