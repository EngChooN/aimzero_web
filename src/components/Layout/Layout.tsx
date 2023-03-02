import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import { useEffect } from "react";
import styled from "@emotion/styled";
// firebase
import { firebaseAuth } from "../../../firebase.config";
// recoil
import { useRecoilState } from "recoil";
import { loginState } from "../../common/Recoil/loginState";
import { userInfoState } from "../../common/Recoil/userInfoState";

const Content = styled.section`
  background-color: white;
  display: flex;
  justify-content: center;
`;

export default function Layout({ children }) {
  const [loginStatus, setLoginStatus] = useRecoilState(loginState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  // login check func
  function loginCheck() {
    firebaseAuth.onAuthStateChanged((userInfo) => {
      if (userInfo) {
        setLoginStatus(true);
        setUserInfo(userInfo);
        console.log(userInfo);
        console.log("check login OK!");
      } else {
        setLoginStatus(false);
        setUserInfo("");
        console.log("check login NO!");
      }
    });
  }

  useEffect(() => {
    // loginCheck();
  }, []);

  return (
    <>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </>
  );
}
