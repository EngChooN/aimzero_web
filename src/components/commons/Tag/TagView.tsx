import { darkModeState } from "@/common/Recoil/darkModeState";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";

export default function TagView(props: { tags: string[] }) {
    const [darkMode] = useRecoilState(darkModeState);
    const { tags } = props;
    return (
        <StyledTagView isDark={darkMode}>
            {tags?.map((el, index) => (
                <Tag key={index} isDark={darkMode}>
                    #{el}
                </Tag>
            ))}
        </StyledTagView>
    );
}

const StyledTagView = styled.div<{ isDark: boolean }>`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 20px;
    border-bottom: ${(props) =>
        !props.isDark ? "1px solid lightgray" : "1px solid grey"};
`;

const Tag = styled.div<{ isDark: boolean }>`
    display: flex;
    align-items: center;

    height: 30px;
    background-color: #f3f3f3;
    border: ${(props) => (!props.isDark ? "" : "1px solid grey")};
    border-radius: 15px;

    padding-right: 10px;
    padding-left: 10px;
    margin-right: 10px;
    margin-bottom: 20px;

    font-family: serif;
    font-size: 12px;
`;
