import { CommitInfoTypes } from "@/pages/experiment/make+commit";
import styled from "@emotion/styled";
import { SetStateAction } from "react";
import Button from "@/components/commons/Button/Button";

export default function CommitFooter(props: {
    setCommitInfo: React.Dispatch<SetStateAction<CommitInfoTypes>>;
    commitInfo: CommitInfoTypes;
    setCommitMs: React.Dispatch<SetStateAction<any>>;
}) {
    const { setCommitInfo, commitInfo, setCommitMs } = props;

    const makeCommit = () => {
        // 제목 끝 마침표 제거
        let updatedHeader = commitInfo.header;
        if (commitInfo.header[commitInfo.header.length - 1] === ".") {
            updatedHeader = commitInfo.header.substring(
                0,
                commitInfo.header.length - 1
            );
        }
        setCommitInfo((prev) => ({
            ...prev,
            header: updatedHeader,
        }));

        // besides \n 찾아서 줄바꿈 처리
        const besides = commitInfo.body.besides;
        let updateBesidesArr = besides.split("\n");
        // besides 72자 이상 줄바꿈 처리
        if (besides !== "") {
            let newArr = [];
            for (let i = 0; i < updateBesidesArr.length; i++) {
                if (updateBesidesArr[i].length > 72) {
                    const longStr = updateBesidesArr[i];
                    for (let j = 0; j < longStr.length; j += 72) {
                        newArr.push(longStr.substring(j, j + 72));
                    }
                } else {
                    newArr.push(updateBesidesArr[i]);
                }
            }
            updateBesidesArr = newArr;

            // footer없이 besides만 존재한다면 마지막 요소에 " <- 를 붙여 줌
            if (commitInfo.footer === "") {
                updateBesidesArr[updateBesidesArr.length - 1] =
                    updateBesidesArr[updateBesidesArr.length - 1] + `"`;
            }
        }
        console.log(updateBesidesArr);

        // 최종 만들어진 커밋 메세지
        setCommitMs(
            <div style={{ overflowX: "scroll" }}>
                git commit -m "{commitInfo.type}
                {/* 스코프 범위 값 유무 확인 */}
                {commitInfo.scope !== "" ? `(${commitInfo.scope})` : ""}:{" "}
                {/* 제목 첫 번째 글자 대문자 처리 */}
                {updatedHeader[0].toUpperCase() + updatedHeader.substring(1)}
                <br />
                <br />
                {commitInfo.body.why} 때문에,
                <br />
                {commitInfo.body.what} 작업 함.
                {updateBesidesArr.length > 0 && updateBesidesArr[0] !== "" ? (
                    <>
                        <br />
                        <br />
                        {updateBesidesArr.map((el, index) => (
                            <p
                                key={index}
                                style={{
                                    margin: "0px",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {el === "" ? <br /> : el}
                            </p>
                        ))}
                    </>
                ) : (
                    <>"</>
                )}
                {commitInfo.footer !== "" ? (
                    <div>
                        <br />
                        resolves: {commitInfo.footer}"
                    </div>
                ) : null}
            </div>
        );
    };

    return (
        <StyledCommitFooter>
            <p>참조 할 해당 이슈</p>
            <div>
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
            </div>
        </StyledCommitFooter>
    );
}

const StyledCommitFooter = styled.section`
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

    > div {
        display: flex;
        align-items: center;

        > button {
            margin: 0px;
            font-family: system-ui, -apple-system, BlinkMacSystemFont,
                "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
                "Helvetica Neue", sans-serif;
        }
    }

    @media (max-width: 645px) {
        flex-direction: column;

        > div {
            margin-top: 20px;
            margin-bottom: 10px;
        }
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
