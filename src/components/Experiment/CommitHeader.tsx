import { CommitInfoTypes } from "@/pages/experiment/make+commit";
import styled from "@emotion/styled";
import { SetStateAction, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Tooltip } from "antd";

export default function CommitHeader(props: {
    setCommitInfo: React.Dispatch<SetStateAction<CommitInfoTypes>>;
    commitInfo: CommitInfoTypes;
}) {
    const { setCommitInfo, commitInfo } = props;
    const [select, setSelect] = useState(0);
    const CommitType = [
        {
            name: "feat",
            desc: "새로운 기능에 대한 커밋",
        },
        {
            name: "fix",
            desc: "버그 수정에 대한 커밋",
        },
        {
            name: "build",
            desc: "빌드 관련 파일 수정 / 모듈 설치 또는 삭제에 대한 커밋",
        },
        {
            name: "chore",
            desc: "그 외 자잘한 수정에 대한 커밋",
        },
        {
            name: "ci",
            desc: "ci 관련 설정 수정에 대한 커밋",
        },
        {
            name: "docs",
            desc: "문서 수정에 대한 커밋",
        },
        {
            name: "style",
            desc: "코드 스타일 혹은 포맷 등에 관한 커밋",
        },
        {
            name: "refactor",
            desc: "코드 리팩토링에 대한 커밋",
        },
        {
            name: "test",
            desc: "테스트 코드 수정에 대한 커밋",
        },
        {
            name: "perf",
            desc: "성능 개선에 대한 커밋",
        },
    ];

    return (
        <StyledCommitTypeSelector>
            <ButtonWrapper>
                {CommitType.map((el, index) => (
                    <TypeButton
                        key={index}
                        isActive={select === index}
                        onClick={() => {
                            setSelect(index);
                            setCommitInfo((prev) => ({
                                ...prev,
                                type: el.name,
                            }));
                        }}
                    >
                        {el.name}
                    </TypeButton>
                ))}
            </ButtonWrapper>
            <div>
                <p>
                    {CommitType[select].desc}{" "}
                    <Tooltip
                        placement="top"
                        title={`과거형이 아닌, 명령문으로 작성합니다.`}
                    >
                        <AiOutlineInfoCircle style={{ marginLeft: "5px" }} />
                    </Tooltip>
                </p>
                <Input
                    maxLength={50}
                    onChange={(event) => {
                        setCommitInfo((prev) => ({
                            ...prev,
                            header: event.target.value,
                        }));
                    }}
                    placeholder="커밋 메시지 제목 입력"
                    value={commitInfo.header}
                ></Input>
            </div>
        </StyledCommitTypeSelector>
    );
}

const StyledCommitTypeSelector = styled.section`
    display: flex;
    flex-direction: column;
    margin-bottom: 60px;

    > div {
        display: flex;
        align-items: center;
        justify-content: center;

        > p {
            display: flex;
            align-items: center;
            margin: 0px;
            font-size: 16px;
            margin-right: 10px;
        }
    }

    @media (max-width: 645px) {
        margin-bottom: 40px;
        margin-top: 30px;

        > div {
            flex-direction: column;

            > p {
                margin-bottom: 20px;
            }
        }
    }
`;

const ButtonWrapper = styled.section`
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    display: flex;
    /* justify-content: space-around; */

    margin-bottom: 60px;
`;

const TypeButton = styled.div<{ isActive: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: serif;
    font-size: 17px;
    color: white;

    width: 90px;
    padding-top: 8px;
    padding-bottom: 8px;

    background-color: ${(props) => (props.isActive ? "black" : "darkgrey")};
    border-radius: 20px;

    cursor: pointer;
`;

const Input = styled.input`
    padding-left: 20px;
    padding-right: 20px;
    max-width: 160px;
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
        max-width: 300px;
        border-color: darkgrey;
    }

    @media (max-width: 645px) {
        max-width: 90%;

        :focus {
            max-width: 90%;
        }
    }
`;
