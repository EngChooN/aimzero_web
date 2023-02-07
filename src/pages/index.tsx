// import React from "react";
import styled from "@emotion/styled";
// import landingData from "../../public/locales/en/landing.json";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Wrapper = styled.main`
  max-width: 1200px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Section01 = styled.section`
  display: flex;
`;

const Left = styled.div`
  width: 50%;
`;

const Img = styled.img`
  width: 100%;
`;

const Right = styled.div`
  width: 50%;
  padding-left: 100px;
`;

const Title = styled.h1`
  font-family: AbrilFatface;
  font-size: 45px;
`;

const MiniTitle = styled.h3`
  font-family: AbrilFatface;
  font-size: 24px;
`;

const Content = styled.p`
  font-family: serif;
  font-size: 18px;
`;

const Highlight = styled.b`
  font-family: MarckScript;
  font-size: 27px;
  font-weight: 200;
`;

const Home = () => {
  const { t } = useTranslation("common");
  return (
    <Wrapper>
      <Section01>
        <Left>
          <Img src={t("section01.img.0")} />
        </Left>
        <Right>
          <Title>{t("section01.title")}</Title>
          <Highlight>{t("section01.highlight.0")}</Highlight>
          <MiniTitle>{t("section01.miniTitle.0")}</MiniTitle>
          <Content>{t("section01.content.0")}</Content>
          <MiniTitle>{t("section01.miniTitle.1")}</MiniTitle>
          <Content>{t("section01.content.1")}</Content>
          <Content>{t("section01.content.2")}</Content>
        </Right>
      </Section01>
    </Wrapper>
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
