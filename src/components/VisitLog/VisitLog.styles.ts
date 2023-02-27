import styled from "@emotion/styled";

export const Wrapper = styled.section`
  max-width: 1200px;
  width: 100%;
  height: calc(100vh - 130px);
  @media (max-width: 1100px) {
    height: calc(100vh - 64.5px);
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 30px;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  max-width: 80px;
  width: 100%;
`;

export const NoneProfile = styled.img`
  margin-top: 5px;
  width: 35px;
  height: 35px;
`;

export const ListLog = styled.div`
  display: flex;
  flex-direction: column;

  overflow-y: scroll;
  width: 100%;
  height: 100%;

  border-bottom: 1px solid darkgray;
  padding-bottom: 30px;
  margin-bottom: 30px;
`;

export const CommentWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  width: 100%;
`;

export const LogBox = styled.div`
  width: 60%;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid black;
`;

export const Name = styled.p`
  font-family: serif;
  font-size: 15px;
  display: flex;
  align-items: center;
  margin: 0;
  margin-top: 7px;
`;
export const Title = styled.h1`
  font-family: AbrilFatface;
  font-size: 40px;

  margin: 0;
  padding-bottom: 40px;
  padding-top: 40px;
`;

export const Comment = styled.span`
  font-family: serif;
`;

export const WriteBox = styled.div`
  display: flex;
  width: 80%;
`;

export const CommentInput = styled.input`
  background-color: #f3f3f3;
  border: none;
  width: 80%;
  height: 45px;
  padding: 10px;
  font-size: 17px;
  font-family: serif;

  :focus {
    outline: none;
  }
`;

export const SubmitBtn = styled.button`
  max-width: 300px;
  width: 20%;
  height: 45px;
  background: none;
  background-color: black;
  border: none;
  border: 1px solid black;

  padding: 25px;
  padding-top: 15px;
  padding-bottom: 15px;

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
