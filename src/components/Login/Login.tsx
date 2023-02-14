import styled from "@emotion/styled";

const Wrapper = styled.section`
  max-width: 1200px;
  width: 100%;
  max-height: 720px;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  width: 50%;
  height: 100%;
  background-color: white;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputBox = styled.div``;

const Input = styled.input`
  width: 100%;
  border: none;
  height: 40px;
  margin-top: 20px;
  font-size: 18px;
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
  width: 100%;

  display: flex;
  justify-content: center;
`;

const Btn = styled.button`
  background: none;
  border: none;
  border: 1px solid black;

  padding: 25px;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-top: 40px;

  cursor: pointer;

  :hover {
    background-color: darkgray;

    color: white;
  }
  :active {
    background-color: black;
  }
`;

export default function Login() {
  return (
    <Wrapper>
      <LoginBox>
        <InputBox>
          <Input placeholder="id" />
          {/* input underline */}
          <div></div>
        </InputBox>
        <InputBox>
          <Input placeholder="password" />
          {/* input underline */}
          <div></div>
        </InputBox>
        <BottomSection>
          <Btn>LogIn</Btn>
          <Btn>SignUp</Btn>
        </BottomSection>
      </LoginBox>
    </Wrapper>
  );
}
