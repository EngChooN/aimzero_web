import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
// firebase
import { firebaseAuth } from "../../../firebase.config";
// recoil
import { useRecoilState } from "recoil";
import { loginState } from "../../common/Recoil/loginState";
import { userInfoState } from "../../common/Recoil/userInfoState";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

const Content = styled.section`
  background-color: white;
  display: flex;
  justify-content: center;
`;

export default function Layout({ children }) {
  const [, setLoginStatus] = useRecoilState(loginState);
  const [, setUserInfo] = useRecoilState(userInfoState);
  const router = useRouter();

  const footerBlockPath = ["/visit+log"];
  const [footerFlag, setFooterFlag] = useState(true);

  useEffect(() => {
    // login check func
    const loginCheck = () => {
      onAuthStateChanged(firebaseAuth, (user) => {
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

  useEffect(() => {
    if (!router.isReady) return;
    console.log("path name", router.pathname);
    if (footerBlockPath.includes(router.pathname)) {
      console.log("No footer!");
      setFooterFlag(false);
    } else {
      console.log("Yes footer!");
      setFooterFlag(true);
    }
  });

  return (
    <>
      <Header />
      <Content>{children}</Content>
      {footerFlag == true ? <Footer /> : null}
    </>
  );
}
