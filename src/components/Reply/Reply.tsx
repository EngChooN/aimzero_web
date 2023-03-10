import * as Comment from "./Reply.styles";
// recoil
import { useRecoilState } from "recoil";
import { userInfoState } from "../../common/Recoil/userInfoState";
import { loginState } from "../../common/Recoil/loginState";
import dynamic from "next/dynamic";
import ReplyViewer from "./Viewer/ReplyViewer";

const ReplyWrite = dynamic(() => import("./Write/ReplyWrite"), { ssr: false });

export default function Reply(props: any) {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [loginStatus, setLoginStatus] = useRecoilState(loginState);
  const name = (userInfo?.email || "").split("@")[0];

  return (
    <Comment.Wrapper>
      <Comment.Title>Comment..</Comment.Title>
      {/* comment write component */}
      {loginStatus == true && userInfo.email != "" ? (
        <Comment.WriteBox>
          <Comment.Name>{name}</Comment.Name>
          <ReplyWrite boardData={props.boardData} />
        </Comment.WriteBox>
      ) : null}
      {/* comment list component */}
      <ReplyViewer boardData={props.boardData} />
    </Comment.Wrapper>
  );
}
