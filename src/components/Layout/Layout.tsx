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
import { onAuthStateChanged } from "firebase/auth";

const Content = styled.section`
  background-color: white;
  display: flex;
  justify-content: center;
`;

export default function Layout({ children }) {
  const [loginStatus, setLoginStatus] = useRecoilState(loginState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  useEffect(() => {
    // login check func
    const loginCheck = async () => {
      await onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
          setLoginStatus(true);
          setUserInfo(user);
          console.log(user);
          console.log("check login OK!");
        } else {
          setLoginStatus(false);
          setUserInfo("");
          console.log("check login NO!");
        }
      });
    };

    loginCheck();
  }, [firebaseAuth]);

  return (
    <>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </>
  );
}
