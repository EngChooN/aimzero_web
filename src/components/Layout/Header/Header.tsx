import styled from "@emotion/styled";

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 130px;
  background-color: white;
  /* border-bottom: 1px solid black; */

  /* 헤더 상단 고징인데 생각보다 미관상 별로더라..
  position: sticky;
  top: 0px; */
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  max-width: 1200px;
  width: 100%;
`;

const Logo = styled.div`
  font-family: Pacifico;
  font-weight: 200;
  font-size: 30px;
  color: black;

  padding-bottom: 5px;

  cursor: pointer;
`;

const List = styled.div`
  font-family: Garamond;
  font-weight: 400;
  font-size: 25px;
  color: black;

  padding-bottom: 3px;

  border-bottom: 1px solid rgba(0, 0, 0, 0);
  cursor: pointer;
  :hover {
    border-bottom: 1px solid black;
    color: black;
  }
`;

export default function Header() {
  const headerList = [
    "about",
    "skills",
    "projects",
    "photo",
    "visit log",
    "login",
  ];
  return (
    <Wrapper>
      <Menu>
        <List>{headerList[0]}</List>
        <List>{headerList[1]}</List>
        <List>{headerList[2]}</List>
        <Logo>
          <a href="/">AimZero</a>
        </Logo>
        <List>
          <a href="/photo">{headerList[3]}</a>
        </List>
        <List>{headerList[4]}</List>
        <List>
          <a href="/login">{headerList[5]}</a>
        </List>
      </Menu>
    </Wrapper>
  );
}
