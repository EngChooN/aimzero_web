import * as Landing from "./Landing.styles";
// slider
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/fall-animation.css";
// il18
import { useTranslation } from "next-i18next";
// antd
import { Image } from "antd";

const LandingComponent = () => {
  const { t } = useTranslation("common");
  return (
    <Landing.Wrapper>
      {/* slider */}
      <Landing.Slider bullets={false} animation="fallAnimation">
        {/* section01 */}
        <Landing.Section01>
          <Landing.Sec01Left>
            <Landing.Sec01Img src={t("section01.img.0")} />
          </Landing.Sec01Left>
          <Landing.Sec01Right>
            <Landing.Sec01TitleBox>
              {/* title */}
              <Landing.Sec01Title>{t("section01.title")}</Landing.Sec01Title>
              <Landing.Sec01SectionText>section One</Landing.Sec01SectionText>
            </Landing.Sec01TitleBox>
            {/* highlight */}
            <Landing.Sec01Highlight>
              {t("section01.highlight.0")}
            </Landing.Sec01Highlight>
            <Landing.Sec01MiniTitle>
              {/* mini-title01 */}
              {t("section01.miniTitle.0")}
            </Landing.Sec01MiniTitle>
            {/* content01 */}
            <Landing.Sec01Content>
              {t("section01.content.0")}
            </Landing.Sec01Content>
            {/* mini-title02 */}
            <Landing.Sec01MiniTitle>
              {t("section01.miniTitle.1")}
            </Landing.Sec01MiniTitle>
            {/* content02-01 */}
            <Landing.Sec01Content>
              {t("section01.content.1")}
            </Landing.Sec01Content>
            {/* content02-02 */}
            <Landing.Sec01Content>
              {t("section01.content.2")}
            </Landing.Sec01Content>
          </Landing.Sec01Right>
        </Landing.Section01>
        {/* section02 */}
        <Landing.Section02>
          <Landing.Sec02Top>
            <Landing.Sec02TitleBox>
              <Landing.Sec02SectionText>section Two</Landing.Sec02SectionText>
              <Landing.Sec02Title>{t("section02.title")}</Landing.Sec02Title>
            </Landing.Sec02TitleBox>
          </Landing.Sec02Top>
          <Landing.Sec02Bottom>
            <Landing.Sec02ContentsBox>
              {/* picture01 */}
              <Landing.Sec02ImgBox>
                <Image width={250} src={t("section02.img01.src")} />
                <Landing.Sec02ImgPlace>
                  {t("section02.img01.place")}
                </Landing.Sec02ImgPlace>
                <Landing.Sec02ImgDesc>
                  {t("section02.img01.desc")}
                </Landing.Sec02ImgDesc>
                <Landing.Sec02ImgDate>
                  {t("section02.img01.date")}
                </Landing.Sec02ImgDate>
              </Landing.Sec02ImgBox>
              {/* picture02 */}
              <Landing.Sec02ImgBox>
                <Image width={250} src={t("section02.img02.src")} />
                <Landing.Sec02ImgPlace>
                  {t("section02.img02.place")}
                </Landing.Sec02ImgPlace>
                <Landing.Sec02ImgDesc>
                  {t("section02.img02.desc")}
                </Landing.Sec02ImgDesc>
                <Landing.Sec02ImgDate>
                  {t("section02.img02.date")}
                </Landing.Sec02ImgDate>
              </Landing.Sec02ImgBox>
              {/* picture03 */}
              <Landing.Sec02ImgBox>
                <Image width={250} src={t("section02.img03.src")} />
                <Landing.Sec02ImgPlace>
                  {t("section02.img03.place")}
                </Landing.Sec02ImgPlace>
                <Landing.Sec02ImgDesc>
                  {t("section02.img03.desc")}
                </Landing.Sec02ImgDesc>
                <Landing.Sec02ImgDate>
                  {t("section02.img03.date")}
                </Landing.Sec02ImgDate>
              </Landing.Sec02ImgBox>
            </Landing.Sec02ContentsBox>
          </Landing.Sec02Bottom>
        </Landing.Section02>
      </Landing.Slider>
    </Landing.Wrapper>
  );
};

export default LandingComponent;
