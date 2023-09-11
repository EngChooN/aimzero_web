import { CommitInfoTypes } from "@/pages/experiment/make+commit";
import styled from "@emotion/styled";
import { SetStateAction, useState } from "react";

export default function CommitTypeSelector(props: {
    setCommitInfo: React.Dispatch<SetStateAction<CommitInfoTypes>>;
}) {
    const { setCommitInfo } = props;
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
            {CommitType.map((el, index) => (
                <TypeButton
                    key={index}
                    isActive={select === index}
                    onClick={() => {
                        setSelect(index);
                    }}
                >
                    {el.name}
                </TypeButton>
            ))}
        </StyledCommitTypeSelector>
    );
}

const StyledCommitTypeSelector = styled.div`
    display: flex;
    justify-content: space-around;
`;

const TypeButton = styled.div<{ isActive: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: serif;
    font-size: 20px;
    color: white;

    width: 100px;
    padding: 5px;
    padding-top: 9px;
    padding-bottom: 9px;

    background-color: ${(props) => (props.isActive ? "black" : "darkgrey")};
    border-radius: 20px;

    cursor: pointer;
`;
