import { CommitInfoTypes } from "@/pages/experiment/make+commit";
import styled from "@emotion/styled";
import { SetStateAction } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Tooltip } from "antd";

export default function CommitBody(props: {
    setCommitInfo: React.Dispatch<SetStateAction<CommitInfoTypes>>;
    commitInfo: CommitInfoTypes;
}) {
    const { setCommitInfo, commitInfo } = props;

    return (
        <StyledCommitBody>
            <div>
                <h2>Why</h2>
                <Input
                    maxLength={72}
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
                    maxLength={72}
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
            </div>

            <h2 style={{ display: "flex", alignItems: "center" }}>
                Besides that,
                <Tooltip
                    placement="top"
                    title={`각 행은 72자 이내가 좋습니다.`}
                >
                    <AiOutlineInfoCircle
                        size={16}
                        style={{ marginLeft: "5px" }}
                    />
                </Tooltip>
            </h2>
            <TextArea
                placeholder="그 외 추가 설명 또는 생략"
                onChange={(e) => {
                    setCommitInfo((prev) => ({
                        ...prev,
                        body: {
                            ...prev.body,
                            besides: `${e.target.value}`,
                        },
                    }));
                }}
            />
        </StyledCommitBody>
    );
}

const StyledCommitBody = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 60px;

    > h2 {
        font-size: 28px;
        font-family: serif;
        margin: 0;
        margin-bottom: 20px;
    }

    > div {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 60px;

        > h2 {
            font-size: 28px;
            font-family: serif;
            margin: 0;
        }
    }

    @media (max-width: 645px) {
        > div {
            flex-direction: column;

            > h2 {
                margin-top: 20px;
                margin-bottom: 20px;
            }
        }
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

    @media (max-width: 645px) {
        max-width: 90%;

        :focus {
            max-width: 90%;
        }
    }
`;

const TextArea = styled.textarea`
    max-width: 500px;
    width: 100%;
    min-height: 200px;
    height: fit-content;
    resize: none;
    padding: 10px;
    border: 1px solid lightgrey;
    transition: 0.3s all ease;

    :hover {
        border-color: darkgrey;
    }
    :focus {
        outline: 0;
        border-color: darkgrey;
    }

    @media (max-width: 645px) {
        max-width: 90%;
    }
`;
