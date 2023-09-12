import { CommitInfoTypes } from "@/pages/experiment/make+commit";
import styled from "@emotion/styled";
import { SetStateAction } from "react";
import Button from "../commons/Button/Button";

export default function CommitFooter(props: {
    setCommitInfo: React.Dispatch<SetStateAction<CommitInfoTypes>>;
    commitInfo: CommitInfoTypes;
    setCommitMs: React.Dispatch<SetStateAction<any>>;
}) {
    const { setCommitInfo, commitInfo, setCommitMs } = props;

    const makeCommit = () => {
        setCommitMs(
            <div>
                git commit -m "{commitInfo.type}: {commitInfo.header}
                <br />
                <br />
                {commitInfo.body.why} 때문에,
                <br />
                {commitInfo.body.what} 작업 함
                {commitInfo.footer !== "" ? (
                    <>
                        <br />
                        <br />
                        resolves: ${commitInfo.footer}"
                    </>
                ) : (
                    <>"</>
                )}
            </div>
        );
    };

    return (
        <StyledCommitBody>
            <p>참조 할 해당 이슈</p>
            <Input
                placeholder="이슈 번호 또는 생략"
                onChange={(e) => {
                    setCommitInfo((prev) => ({
                        ...prev,
                        footer: e.target.value,
                    }));
                }}
                value={commitInfo?.footer}
            />
            <Button
                label="메세지 만들기"
                primary={false}
                backgroundColor="black"
                onClick={makeCommit}
            />
        </StyledCommitBody>
    );
}

const StyledCommitBody = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;

    > p {
        margin: 0px;
        text-align: center;
        font-size: 16px;
        margin-right: 10px;
    }

    > button {
        margin: 0px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
            sans-serif;
    }
`;

const Input = styled.input`
    margin-left: 10px;
    margin-right: 10px;
    padding-left: 20px;
    padding-right: 20px;
    max-width: 150px;
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
        border-color: darkgrey;
    }
`;
