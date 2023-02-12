import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import LandingComponent from "../components/Landing/Landing";

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
