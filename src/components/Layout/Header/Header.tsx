import styled from "@emotion/styled";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { firebaseAuth } from "../../../../firebase.config";
import { loginState } from "../../../common/Recoil/loginState";

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 130px;
  background-color: white;
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
  const [loginStatus, setLoginStatus] = useRecoilState(loginState);
  const headerList = ["about", "skills", "projects", "photo", "visit log"];

  // logOut func
  const logOut = async () => {
    firebaseAuth.signOut();
    setLoginStatus(false);
    location.reload();
  };

  return (
    <Wrapper>
      <Menu>
        <List>{headerList[0]}</List>
        <List>{headerList[1]}</List>
        <List>{headerList[2]}</List>
        <Logo>
          <Link href={"/"}>AimZero</Link>
        </Logo>
        <List>
          <Link href="/photo">{headerList[3]}</Link>
        </List>
        <List>{headerList[4]}</List>
        <List>
          {loginStatus == false ? (
            <Link href="/login">login</Link>
          ) : (
            <div onClick={logOut}>logout</div>
          )}
        </List>
      </Menu>
    </Wrapper>
  );
}
