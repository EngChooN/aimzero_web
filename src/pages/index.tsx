import LandingComponent from "../components/Landing/Landing";
import { useEffect } from "react";
// i18n
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// recoil
import { useRecoilState } from "recoil";
// firebase
import { authService } from "../../firebase.config";
import { loginState } from "../common/Recoil/loginState";
const Home = () => {
  const [loginStatus, setLoginStatus] = useRecoilState(loginState);

  // login Info & Status
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setLoginStatus(true);
      } else {
        setLoginStatus(false);
      }
    });
  }, []);

  console.log("loginState", loginStatus);
  return (
    <>
      <LandingComponent />
    </>
  );
};

// export const getStaticProps = async ({ locale }) => {
//   console.log("locale of getStaticProps", locale);
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["common"])),
//     },
//   };
// };

export default Home;
