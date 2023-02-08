import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import LandingComponent from "../components/Landing/Landing";
import LocaleButton from "../components/LocaleButton/LocaleButton";
import styled from "@emotion/styled";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    if (
      localStorage.getItem("lang") == null ||
      localStorage.getItem("lang") == undefined
    ) {
      localStorage.setItem("lang", "en");
    }
  }, []);
  return (
    <>
      <LocaleButton />
      <LandingComponent />
    </>
  );
};

export const getStaticProps = async ({ locale }) => {
  console.log("locale of getStaticProps", locale);
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

export default Home;
