import { darkModeState } from "@/common/Recoil/darkModeState";
import { useRecoilState } from "recoil";
import { MdLightMode, MdDarkMode } from "react-icons/md";

export default function DarkModeSwitch() {
    const [darkMode, setDarkMode] = useRecoilState(darkModeState);

    const onClickTheme = () => {
        console.log(darkMode);
        setDarkMode(!darkMode);
    };

    return (
        <>
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
        </>
    );
}
