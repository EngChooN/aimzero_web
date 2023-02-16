import Link from "next/link";
import * as LogIn from "./Login.styles";
import { FcGoogle } from "react-icons/fc";

export default function LoginUI(props: any) {
  return (
    <LogIn.Wrapper>
      <LogIn.LoginBox>
        <LogIn.TitleBox>
          <LogIn.Title>Log In</LogIn.Title>
        </LogIn.TitleBox>
        <LogIn.InputBox>
          <LogIn.Input
            placeholder="email"
            onChange={(e) => {
              props.setId(e.target.value);
            }}
          />
          {/* input underline */}
          <div></div>
        </LogIn.InputBox>
        <LogIn.InputBox>
          <LogIn.Input
            placeholder="password"
            type={"password"}
            onChange={(e) => {
              props.setPass(e.target.value);
            }}
          />
          {/* input underline */}
          <div></div>
        </LogIn.InputBox>
        <LogIn.BottomSection>
          <LogIn.Btn onClick={props.login}>LogIn</LogIn.Btn>
          <LogIn.BtnGoogle onClick={props.loginGoogle}>
            <FcGoogle fontSize={20} style={{ marginRight: "10px" }} />
            with Google
          </LogIn.BtnGoogle>

          <Link href="/signup" style={{ fontFamily: "serif" }}>
            SignUp
          </Link>
        </LogIn.BottomSection>
      </LogIn.LoginBox>
    </LogIn.Wrapper>
  );
}
