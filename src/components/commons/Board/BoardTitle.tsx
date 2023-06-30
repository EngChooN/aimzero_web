import { darkModeState } from "@/common/Recoil/darkModeState";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";

export default function BoardTitle(props: { title: string }) {
    const { title } = props;
    const [darkMode] = useRecoilState(darkModeState);

    return <StyledBoardTitle isDark={darkMode}>{title}</StyledBoardTitle>;
}

const StyledBoardTitle = styled.h1<{ isDark: boolean }>`
    font-family: AbrilFatface;
    font-size: 35px;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: ${(props) =>
        !props.isDark ? "1px solid lightgray" : "1px solid grey"};
    /* border-bottom: 1px solid lightgray; */
`;
