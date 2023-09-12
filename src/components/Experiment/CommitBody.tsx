import { CommitInfoTypes } from "@/pages/experiment/make+commit";
import styled from "@emotion/styled";
import { SetStateAction } from "react";

export default function CommitBody(props: {
    setCommitInfo: React.Dispatch<SetStateAction<CommitInfoTypes>>;
    commitInfo: CommitInfoTypes;
}) {
    const { setCommitInfo, commitInfo } = props;

    return (
        <StyledCommitBody>
            <h2>Why</h2>
            <Input
                placeholder="왜 해당 작업을 하셨나요?"
                onChange={(e) => {
                    setCommitInfo((prev) => ({
                        ...prev,
                        body: {
                            ...prev.body,
                            why: e.target.value,
                        },
                    }));
                }}
                value={commitInfo?.body.why}
            />
            <p>때문에</p>
            <h2 style={{ marginLeft: "10px" }}>What</h2>
            <Input
                placeholder="어느 곳을 작업하셨나요?"
                onChange={(e) => {
                    setCommitInfo((prev) => ({
                        ...prev,
                        body: {
                            ...prev.body,
                            what: e.target.value,
                        },
                    }));
                }}
                value={commitInfo?.body.what}
            />
            <p>작업</p>
        </StyledCommitBody>
    );
}

const StyledCommitBody = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 60px;

    > h2 {
        font-size: 28px;
        font-family: serif;
        margin: 0;
    }
`;

const Input = styled.input`
    margin-left: 10px;
    margin-right: 10px;
    padding-left: 20px;
    padding-right: 20px;
    max-width: 175px;
    width: 100%;
    height: 40px;
    border: unset;
    background: unset;
    outline: unset;
    border: 1px solid lightgrey;
    transition: 0.3s all ease;
    border-radius: 100px;

    :hover {
        border-color: darkgrey;
    }
    :focus {
        max-width: 320px;
        border-color: darkgrey;
    }
`;
