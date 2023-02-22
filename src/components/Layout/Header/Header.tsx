import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
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

const List = styled.div<{ currentUrl: boolean }>`
  font-family: Garamond;
  font-weight: 400;
  font-size: 25px;
  color: black;

  padding-bottom: 3px;
  cursor: pointer;

  div {
    width: ${(props) => (props.currentUrl ? "100%" : "0%")};
    height: 1px;
    border-bottom: 1px solid
      ${(props) => (props.currentUrl ? "black" : "white")};
    transition: all 0.3s;
  }

  :hover {
    div {
      width: 100%;
      border-bottom: 1px solid black;
    }
  }
`;

export default function Header() {
  const [loginStatus, setLoginStatus] = useRecoilState(loginState);
  const headerList = ["about", "skills", "projects", "photo", "visit log"];
  const router = useRouter();
  const crrUrl = router.pathname;

  console.log(crrUrl);

  // logOut func
  const logOut = async () => {
    firebaseAuth.signOut();
    setLoginStatus(false);
    location.reload();
  };

  return (
    <Wrapper>
      <Menu>
        {/* about */}
        <List currentUrl={crrUrl === "/about"}>
          <Link href="/about">{headerList[0]}</Link>
          <div></div>
        </List>
        {/* skills */}
        <List currentUrl={crrUrl === "/skills"}>
          <Link href="/skills">{headerList[1]}</Link>
          <div></div>
        </List>
        {/* project */}
        <List currentUrl={crrUrl === "/projects"}>
          <Link href="/projects">{headerList[2]}</Link>
          <div></div>
        </List>
        {/* home */}
        <Logo>
          <Link href={"/"}>AimZero</Link>
        </Logo>
        {/* photo */}
        <List currentUrl={crrUrl === "/photo"}>
          <Link href="/photo">
            {headerList[3]}
            <div></div>
          </Link>
        </List>
        {/* visit log */}
        <List currentUrl={crrUrl === "/visit+log"}>
          <Link href="/visit+log">{headerList[4]}</Link>
          <div></div>
        </List>
        {/* login */}
        <List currentUrl={crrUrl === "/login"}>
          {loginStatus == false ? (
            <Link href="/login">
              login<div></div>
            </Link>
          ) : (
            // logout
            <Link href={"#"} onClick={logOut}>
              logout<div></div>
            </Link>
          )}
        </List>
      </Menu>
    </Wrapper>
  );
}
