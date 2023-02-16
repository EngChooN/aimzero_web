import styled from "@emotion/styled";

export const Wrapper = styled.section`
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

export const LoginBox = styled.div`
  max-width: 300px;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputBox = styled.div`
  max-width: 300px;
  width: 100%;
`;

export const Input = styled.input`
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

export const BottomSection = styled.div`
  max-width: 300px;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Btn = styled.button`
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

export const TitleBox = styled.div`
  display: flex;
  justify-content: center;

  max-width: 300px;
  width: 100%;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid black;
`;
export const Title = styled.h1`
  font-family: AbrilFatface;
  font-size: 40px;

  margin: 0;
`;
