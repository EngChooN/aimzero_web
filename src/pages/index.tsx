import styled from "@emotion/styled";

import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";

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

const Sec01Left = styled.div`
  width: 50%;
`;

const Sec01Img = styled.img`
  // test
  width: 82%;
  /* width: 100%; */
`;

const Sec01Right = styled.div`
  width: 50%;
  padding-left: 100px;
`;

const Sec01Title = styled.h1`
  font-family: AbrilFatface;
  font-size: 45px;
`;

const Sec01MiniTitle = styled.h3`
  font-family: AbrilFatface;
  font-size: 24px;
`;

const Sec01Content = styled.p`
  font-family: serif;
  font-size: 18px;
`;

const Sec01Highlight = styled.b`
  font-family: MarckScript;
  font-size: 27px;
  font-weight: 200;
`;

const Slider = styled(AwesomeSlider)`
  .awssld__content {
    background-color: white;
  }
  .awssld__content > div {
    display: flex;
  }
`;

const Home = () => {
  const { t } = useTranslation("common");
  return (
    <Wrapper>
      <Slider bullets={false} animation="cubeAnimation">
        <Section01>
          <Sec01Left>
            <Sec01Img src={t("section01.img.0")} />
          </Sec01Left>
          <Sec01Right>
            <Sec01Title>{t("section01.title")}</Sec01Title>
            <Sec01Highlight>{t("section01.highlight.0")}</Sec01Highlight>
            <Sec01MiniTitle>{t("section01.miniTitle.0")}</Sec01MiniTitle>
            <Sec01Content>{t("section01.content.0")}</Sec01Content>
            <Sec01MiniTitle>{t("section01.miniTitle.1")}</Sec01MiniTitle>
            <Sec01Content>{t("section01.content.1")}</Sec01Content>
            <Sec01Content>{t("section01.content.2")}</Sec01Content>
          </Sec01Right>
        </Section01>
      </Slider>
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
