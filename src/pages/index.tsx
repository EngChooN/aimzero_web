import Main from "../components/Main/Main";
// i18n
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Home = () => {
    return (
        <>
            <Main />
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
