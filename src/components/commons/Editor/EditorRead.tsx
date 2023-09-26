import styled from "@emotion/styled";
// toast ui
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
// toast plugin (code highlight)
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";

export default function EditorRead(props: { initialValue: string }) {
    const { initialValue } = props;

    return (
        <StyledViewer>
            {initialValue && (
                <Viewer
                    initialValue={initialValue}
                    // plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
                />
            )}
        </StyledViewer>
    );
}

const StyledViewer = styled.section`
    width: 100%;
`;
