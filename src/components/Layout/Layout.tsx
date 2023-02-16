import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { firebaseAuth } from "../../../firebase.config";
import { loginState } from "../../common/Recoil/loginState";
import { useEffect } from "react";

const Content = styled.section`
  background-color: white;
  display: flex;
  justify-content: center;
`;

export default function Layout({ children }) {
  const [loginStatus, setLoginStatus] = useRecoilState(loginState);
  // useEffect(() => {
  //   firebaseAuth.onAuthStateChanged((user) => {
  //     if (user) {
  //       setLoginStatus(true);
  //     } else {
  //       setLoginStatus(false);
  //     }
  //   });
  // }, []);

  console.log("current login status: ", loginStatus);
  return (
    <>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </>
  );
}
