import CommitBody from "@/components/Experiment/MakeCommit/CommitBody";
import CommitFooter from "@/components/Experiment/MakeCommit/CommitFooter";
import CommitHeader from "@/components/Experiment/MakeCommit/CommitHeader";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

export interface CommitInfoTypes {
    type: string;
    scope: string;
    header: string;
    body: {
        what: string;
        why: string;
        besides: string;
    };
    footer: string;
}

export default function MakeCommitPage() {
    const [commitInfo, setCommitInfo] = useState({
        type: "fix",
        scope: "",
        header: "",
        body: {
            what: "",
            why: "",
            besides: "",
        },
        footer: "",
    });
    const [step, setStep] = useState(0);
    const [commitMs, setCommitMs] = useState(``);

    useEffect(() => {
        if (commitInfo.header === "") {
            setStep(0);
        }
        if (commitInfo.header !== "") {
            setStep(1);
        }
        if (commitInfo.body.what !== "" && commitInfo.body.why !== "") {
            setStep(2);
        }
    }, [commitInfo]);

    return (
        <StyledMakeCommitPage>
            {step === 0 || step === 1 || step === 2 ? (
                <CommitHeader
                    setCommitInfo={setCommitInfo}
                    commitInfo={commitInfo}
                />
            ) : null}

            {step === 1 || step === 2 ? (
                <CommitBody
                    setCommitInfo={setCommitInfo}
                    commitInfo={commitInfo}
                />
            ) : null}

            {step === 2 ? (
                <CommitFooter
                    setCommitInfo={setCommitInfo}
                    commitInfo={commitInfo}
                    setCommitMs={setCommitMs}
                />
            ) : null}

            <div>
                {step === 2 && commitMs !== "" ? (
                    <article>{commitMs}</article>
                ) : null}
            </div>
        </StyledMakeCommitPage>
    );
}
const fadeInUp = keyframes`
    0%{
        opacity: 0;
        /* margin-top: 150px; */
    }
    25%{
        /* margin-top: 50px; */
    }
    100%{
        opacity: 1;
        /* margin-top: 0px; */
    }
`;

const StyledMakeCommitPage = styled.article`
    max-width: 1200px;
    width: 100%;
    padding-top: 30px;
    padding-left: 10px;
    padding-right: 10px;

    height: fit-content;
    min-height: calc(100vh - 250px);

    @media (max-width: 1100px) {
        min-height: calc(100vh - 235px);
    }

    @media (max-width: 645px) {
        padding-top: 0px;
    }

    > div {
        display: flex;
        justify-content: center;

        animation: ${fadeInUp} 0.5s ease-in-out;

        > article {
            max-width: 450px;
            width: 100%;
            background-color: #373737;
            color: white;
            padding: 10px;
            font-family: serif;
            margin-bottom: 60px;
        }
    }
`;
