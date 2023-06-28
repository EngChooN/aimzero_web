import styled from "@emotion/styled";
// toast ui
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
// toast plugin (code highlight)
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import { SubmitBtn } from "../../../VisitLog/VisitLog.styles";
// recoil
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../../common/Recoil/userInfoState";
import { loginState } from "../../../../common/Recoil/loginState";
import { useRouter } from "next/router";
import { DocumentData, deleteDoc, doc } from "firebase/firestore";
import { firebaseDb } from "../../../../../firebase.config";
import { useEffect } from "react";
import Reply from "../../../Reply/Reply";

export default function BoardViewer(props: { boardData: DocumentData }) {
    const { boardData } = props;
    const router = useRouter();
    const [loginStatus] = useRecoilState(loginState);
    const [userInfo] = useRecoilState(userInfoState);
    // url hash
    // get url parameter
    const urlParams = router.query.boardID;
    // blog, qna, news
    let boardType: string;

    useEffect(() => {
        if (urlParams === undefined) return;
        // parameter => clicked board type ...ex) blog, qna, news
        boardType = (urlParams as string).split("=")[0];
    });

    const deleteBoard = (id: string) => {
        deleteDoc(doc(firebaseDb, boardType, id));
        router.push("/");
    };
    return (
        <Wrapper>
            {boardData.content && (
                <>
                    <Title>{boardData.title}</Title>
                    <InfoWrapper>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Name>{boardData.name}</Name>
                            <Date>{boardData.timestamp}</Date>
                        </div>
                        {userInfo?.email === boardData.email &&
                        loginStatus == true ? (
                            <Btns>
                                <SubmitBtn
                                    style={{
                                        marginLeft: "10px",
                                        width: "100%",
                                        height: "20px",
                                    }}
                                    onClick={() => {
                                        router.push(
                                            `/board/${boardData.id}/edit#${boardType}`
                                        );
                                    }}
                                >
                                    update
                                </SubmitBtn>
                                <SubmitBtn
                                    style={{
                                        marginLeft: "10px",
                                        width: "100%",
                                        height: "20px",
                                    }}
                                    onClick={() => {
                                        deleteBoard(boardData.id);
                                    }}
                                >
                                    delete
                                </SubmitBtn>
                            </Btns>
                        ) : null}
                    </InfoWrapper>
                    <Tags>
                        {boardData.tag?.map((el: any, index: number) => (
                            <Tag key={index}>#{el}</Tag>
                        ))}
                    </Tags>
                    <div style={{ overflowX: "scroll" }}>
                        <Viewer
                            initialValue={boardData.content}
                            plugins={[
                                [codeSyntaxHighlight, { highlighter: Prism }],
                            ]}
                        />
                    </div>
                    <Reply boardData={boardData} />
                </>
            )}
        </Wrapper>
    );
}

// styles
const Wrapper = styled.article`
    display: flex;
    flex-direction: column;

    padding-bottom: 70px;
    margin-bottom: 30px;

    height: 100%;
    @media (max-width: 1100px) {
        min-height: calc(100vh - 64.5px - 170px);
        padding-top: 15px;
    }

    @media (max-width: 400px) {
        padding: 10px;
        padding-top: 15px;
    }
`;

const Title = styled.div`
    font-family: AbrilFatface;
    font-size: 35px;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid lightgray;
`;

const InfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    @media (max-width: 400px) {
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 90px;
    }
`;

const Name = styled.div`
    font-size: 18px;
    font-family: serif;
    margin-right: 15px;
`;

const Date = styled.div`
    font-family: serif;
    font-size: 13px;
    color: gray;
    text-align: center;
`;

const Btns = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const Tags = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 20px;
    border-bottom: 1px solid lightgray;
`;

const Tag = styled.div`
    display: flex;
    align-items: center;

    height: 30px;
    background-color: #f3f3f3;
    border-radius: 15px;

    padding-right: 10px;
    padding-left: 10px;
    margin-right: 10px;
    margin-bottom: 20px;

    font-family: serif;
    font-size: 12px;
`;
