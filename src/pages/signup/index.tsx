import styled from "@emotion/styled";
import { useState } from "react";
import { loginState } from "../../common/Recoil/loginState";
import { useRecoilState } from "recoil";
// firebase
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

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
  margin-bottom: 10px;

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

export default function Signup() {
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [rePass, setRePass] = useState("");
  const [loginStatus, setLoginStatus] = useRecoilState(loginState);

  // signUp func
  const signUp = async (id, pass) => {
    try {
      const auth = getAuth();
      const { user } = await createUserWithEmailAndPassword(auth, id, pass);
      const { stsTokenManager, uid } = user;
      setAuthInfo({ uid, id, authToken: stsTokenManager });
      navigate("/");
    } catch ({ code, message }) {
      alert(errorMessage[code]);
    }
  };

  const goToSignUp = () => {
    const reg =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    // e-mail check
    if (reg.test(id) == false || id == "") {
      alert("Plz check your e-mail");
      return;
    }
    // pass check
    if (pass.length < 6 || pass == "") {
      alert("Password must be at least 6 digits");
      return;
    }
    // confirm pass check
    if (pass !== rePass || rePass == "") {
      alert("Must be the same as the password");
      return;
    }

    console.log("success!!");
  };

  return (
    <Wrapper>
      <LoginBox>
        <TitleBox>
          <Title>Sign Up</Title>
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
        <InputBox>
          <Input
            placeholder="confirm password"
            type={"password"}
            onChange={(e) => {
              setRePass(e.target.value);
              console.log(pass);
            }}
          />
          {/* input underline */}
          <div></div>
        </InputBox>
        <BottomSection>
          <Btn onClick={goToSignUp}>OK</Btn>
        </BottomSection>
      </LoginBox>
    </Wrapper>
  );
}
