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

// styles
const Wrapper = styled.article`
  display: flex;
  flex-direction: column;

  padding-bottom: 70px;
  margin-bottom: 30px;
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
`;

const Btns = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Tags = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  /* margin-top: 20px; */
  margin-bottom: 20px;
  /* padding-top: 20px; */
  /* padding-bottom: 20px; */
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
  /* margin-top: 28px; */
  margin-right: 10px;
  margin-bottom: 20px;

  font-family: serif;
  font-size: 12px;
`;

export default function BoardViewer(props: any) {
  const [loginStatus, setLoginStatus] = useRecoilState(loginState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  return (
    <Wrapper>
      {props.boardData.content && (
        <>
          <Title>{props.boardData.title}</Title>
          <InfoWrapper>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Name>{props.boardData.name}</Name>
              <Date>{props.boardData.timestamp.toDate().toISOString()}</Date>
            </div>
            <Btns>
              {userInfo?.email == props.boardData.email &&
              loginStatus == true ? (
                <>
                  <SubmitBtn
                    style={{
                      marginLeft: "10px",
                      width: "100%",
                      height: "20px",
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
                  >
                    delete
                  </SubmitBtn>
                </>
              ) : null}
            </Btns>
          </InfoWrapper>
          <Tags>
            {props.boardData.tag?.map((el: any, index: number) => (
              <Tag key={index}>#{el}</Tag>
            ))}
          </Tags>

          <Viewer
            initialValue={props.boardData.content}
            plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
          />
        </>
      )}
    </Wrapper>
  );
}
