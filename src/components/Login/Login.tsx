import styled from "@emotion/styled";
import { useState } from "react";
// firebase
import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { authService } from "../../../firebase.config";
import { loginState } from "../../common/Recoil/loginState";
import { useRecoilState } from "recoil";

const Wrapper = styled.section`
  max-width: 1200px;
  width: 100%;
  max-height: 720px;
  height: 100%;
  padding-top: 100px;
  padding-bottom: 100px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  max-width: 300px;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputBox = styled.div`
  max-width: 300px;
  width: 100%;
`;

const Input = styled.input`
  background-color: #f3f3f3;
  border: none;
  width: 100%;
  height: 45px;
  padding: 10px;
  margin-top: 20px;
  font-size: 17px;
  font-family: serif;
  + div {
    height: 1px;
    width: 0%;
    transition: all 0.3s;
    border-top: 1px solid white;
  }
  :hover {
    + div {
      width: 100%;
      border-top: 1px solid darkgray;
    }
  }
  :focus {
    outline: none;
    + div {
      width: 100%;
      border-top: 1px solid black;
    }
  }
`;

const BottomSection = styled.div`
  max-width: 300px;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Btn = styled.button`
  max-width: 300px;
  width: 100%;
  height: 40px;
  background: none;
  background-color: black;
  border: none;
  border: 1px solid black;

  padding: 25px;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-top: 40px;
  margin-bottom: 15px;

  font-family: serif;
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  :hover {
    background-color: #2f2f2f;
  }
  :active {
    background-color: black;
  }
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: center;

  max-width: 300px;
  width: 100%;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid black;
`;
const Title = styled.h1`
  font-family: AbrilFatface;
  font-size: 40px;

  margin: 0;
`;

export default function Login() {
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [loginStatus, setLoginStatus] = useRecoilState(loginState);

  // logIn func (email & pass 6 length up)
  async function loginWithEmail(id: string, pass: string) {
    try {
      await signInWithEmailAndPassword(authService, id, pass);
      setLoginStatus(true);
    } catch (e) {
      return e.message.replace("Firebase: Error ", "");
    }
  }

  const goToLogin = () => {
    loginWithEmail;
  };
  return (
    <Wrapper>
      <LoginBox>
        <TitleBox>
          <Title>Log In</Title>
        </TitleBox>
        <InputBox>
          <Input
            placeholder="email"
            onChange={(e) => {
              setId(e.target.value);
              console.log(id);
            }}
          />
          {/* input underline */}
          <div></div>
        </InputBox>
        <InputBox>
          <Input
            placeholder="password"
            type={"password"}
            onChange={(e) => {
              setPass(e.target.value);
              console.log(pass);
            }}
          />
          {/* input underline */}
          <div></div>
        </InputBox>
        <BottomSection>
          <Btn onClick={goToLogin}>LogIn</Btn>
          <a href="/signup" style={{ fontFamily: "serif" }}>
            SignUp
          </a>
        </BottomSection>
      </LoginBox>
    </Wrapper>
  );
}
