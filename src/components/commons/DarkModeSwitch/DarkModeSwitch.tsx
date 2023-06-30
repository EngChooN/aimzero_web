import { darkModeState } from "@/common/Recoil/darkModeState";
import { useRecoilState } from "recoil";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import styled from "@emotion/styled";

export default function DarkModeSwitch() {
    const [darkMode, setDarkMode] = useRecoilState(darkModeState);

    const onClickTheme = () => {
        console.log(darkMode);
        setDarkMode(!darkMode);
    };

    return (
        <StyledDarkModeSwitch>
            {darkMode === false ? (
                <MdLightMode
                    size={30}
                    style={{ cursor: "pointer" }}
                    onClick={onClickTheme}
                />
            ) : (
                <MdDarkMode
                    size={30}
                    style={{ cursor: "pointer" }}
                    onClick={onClickTheme}
                />
            )}
        </StyledDarkModeSwitch>
    );
}

const StyledDarkModeSwitch = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
`;
