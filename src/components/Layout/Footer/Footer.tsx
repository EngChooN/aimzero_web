import styled from "@emotion/styled";
import { FaBlogger, FaGithub, FaDiscord } from "react-icons/fa";

const Wrapper = styled.section`
  width: 100%;
  height: 250px;
  background-color: #ededed;
  color: black;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContentsWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = styled.div`
  max-width: 200px;
  width: 100%;
  margin-bottom: 10px;

  display: flex;
  justify-content: space-evenly;
`;

const Desc = styled.span`
  font-family: Garamond;
`;

const Logo = styled.div`
  font-family: Pacifico;
  font-weight: 200;
  font-size: 30px;
  color: black;

  margin-bottom: 25px;

  cursor: pointer;
`;

export default function Footer() {
  return (
    <Wrapper>
      <ContentsWrapper>
        <Logo>
          <a href="/">AimZero</a>
        </Logo>
        <IconWrapper>
          <FaBlogger style={{ fontSize: "30px", cursor: "pointer" }} />
          <FaGithub style={{ fontSize: "30px", cursor: "pointer" }} />
          <FaDiscord style={{ fontSize: "30px", cursor: "pointer" }} />
        </IconWrapper>
        <Desc>Copyright(c)2023 by Joonyoung Cho</Desc>
      </ContentsWrapper>
    </Wrapper>
  );
}

// FaBlogger 블로그
// FaGithub 깃허브
// FaDiscord 디스코드
