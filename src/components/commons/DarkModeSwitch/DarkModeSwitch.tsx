import { darkModeState } from "@/common/Recoil/darkModeState";
import { Switch } from "antd";
import { useRecoilState } from "recoil";

export default function DarkModeSwitch() {
    const [darkMode, setDarkMode] = useRecoilState(darkModeState);

    const onChange = () => {
        setDarkMode(!darkMode);
    };

    return <Switch onChange={onChange} />;
}
