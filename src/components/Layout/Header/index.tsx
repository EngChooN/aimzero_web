import styled from "@emotion/styled";

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url("/images/paper2.webp");
  background-repeat: repeat;
  width: 100%;
  height: 130px;

  border-bottom: 1px solid black;

  /* 헤더 상단 고징인데 생각보다 미관상 별로더라..
  position: sticky;
  top: 0px; */
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  max-width: 1200px;
  width: 100%;
`;

const Main = styled.div`
  font-family: Pacifico;
  font-weight: 400;
  font-size: 30px;
  color: black;

  padding-bottom: 5px;

  cursor: pointer;
`;

const List = styled.div`
  font-family: sans-serif;
  font-weight: 400;
  font-size: 25px;
  color: black;

  padding-bottom: 3px;

  border-bottom: 1px solid rgba(0, 0, 0, 0, 0);
  cursor: pointer;
  :hover {
    border-bottom: 1px solid black;
    color: black;
  }
`;

export default function Header() {
  const headerList = ["about", "project", "photo", "guest book"];
  return (
    <Wrapper>
      <Menu>
        <List>{headerList[0]}</List>
        <List>{headerList[1]}</List>
        <Main>AimZero</Main>
        <List>{headerList[2]}</List>
        <List>{headerList[3]}</List>
      </Menu>
    </Wrapper>
  );
}
