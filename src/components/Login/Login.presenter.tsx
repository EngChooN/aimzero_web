import Link from "next/link";
import * as LogIn from "./Login.styles";
import { FcGoogle } from "react-icons/fc";
import { LoginTypes } from "@/types/interfaces/common";

export default function LoginUI(props: LoginTypes) {
  const { setId, setPass, login, loginGoogle } = props;
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
              setId(e.target.value);
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
              setPass(e.target.value);
            }}
          />
          {/* input underline */}
          <div></div>
        </LogIn.InputBox>
        <LogIn.BottomSection>
          <LogIn.Btn onClick={login}>LogIn</LogIn.Btn>
          <LogIn.BtnGoogle onClick={loginGoogle}>
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
