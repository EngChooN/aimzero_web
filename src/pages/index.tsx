import LandingComponent from "../components/Landing/Landing";
import { useEffect } from "react";
// i18n
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Home = () => {
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
