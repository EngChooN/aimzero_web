import CommitTypeSelector from "@/components/Experiment/MakeCommit/CommitTypeSelector/CommitTypeSelector";
import styled from "@emotion/styled";
import { useState } from "react";

export interface CommitInfoTypes {
    type: string;
    header: string;
    body: {
        what: string;
        why: string;
    };
    footer: string;
}
export default function MakeCommitPage() {
    const [commitInfo, setCommitInfo] = useState({
        type: "",
        header: "",
        body: {
            what: "",
            why: "",
        },
        footer: "",
    });

    return (
        <StyledMakeCommitPage>
            <CommitTypeSelector setCommitInfo={setCommitInfo} />
        </StyledMakeCommitPage>
    );
}

const StyledMakeCommitPage = styled.section`
    max-width: 1200px;
    width: 100%;

    height: fit-content;
    min-height: calc(100vh - 300px);

    @media (max-width: 1100px) {
        min-height: calc(100vh - 224px);
    }
`;
