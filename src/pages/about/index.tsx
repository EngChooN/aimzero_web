import styled from "@emotion/styled";
import dynamic from "next/dynamic";

const EditorRead = dynamic(
    async () => await import("@/components/commons/Editor/EditorRead"),
    { ssr: false }
);

export default function AboutPage() {
    const markDownText = ``;
    return (
        <StyledAboutPage>
            <EditorRead initialValue={markDownText} />
        </StyledAboutPage>
    );
}

const StyledAboutPage = styled.section`
    max-width: 800px;
    width: 100%;
    padding: 20px;
`;
