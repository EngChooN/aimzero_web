import styled from "@emotion/styled";
import { Carousel } from "antd";
import commonData from "../../../../public/locales/en/common.json";

export default function AboutSection01() {
  const contentStyle: React.CSSProperties = {
    height: "500px",
    backgroundColor: "#ededed",
    color: "black",
    padding: "20px",
    paddingBottom: "10px",
    fontFamily: "serif",
    // border: "1px solid",
  };

  const renderSlide = () => {
    const slide = [];
    for (let i = 0; i < commonData.pfReview.length; i++) {
      slide.push(
        <div style={{ marginLeft: "10px", marginRight: "10px" }}>
          <div style={contentStyle}>
            {commonData.pfReview[0].one.titleOne}
            <br />
            {commonData.pfReview[0].one.titleTwo}
            <br />
            {commonData.pfReview[0].one.contentOne}
            <br />
            <br />
            {commonData.pfReview[0].one.titleThree}
            <br />
            {commonData.pfReview[0].one.contentTwo}
            <br />
            <br />
            {commonData.pfReview[0].one.titleFour}
            <br />
            {commonData.pfReview[0].one.contentThree}
          </div>
        </div>
      );
    }

    return slide;
  };

  return (
    <Wrapper>
      <One>
        <Img></Img>
      </One>
      <Two>
        <TitleBox>
          <Title>{commonData.section01.title}</Title>
        </TitleBox>
        <Highlight>{commonData.section01.highlight[0]}</Highlight>
        <MiniTitle>{commonData.section01.miniTitle[0]}</MiniTitle>
        <Content>{commonData.section01.content[0]}</Content>
        <MiniTitle>{commonData.section01.miniTitle[1]}</MiniTitle>
        <Content>{commonData.section01.content[1]}</Content>
        <Content>{commonData.section01.content[2]}</Content>
      </Two>
      <Three>
        <Carousel autoplay>{renderSlide()}</Carousel>
        <Content>{commonData.section01.content[3]}</Content>
      </Three>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 1200px;
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const One = styled.div`
  width: 30%;
  /* padding-left: 20px; */
  padding-right: 20px;

  @media (max-width: 900px) {
    width: 100%;
    padding-right: 0px;
  }
`;

const Two = styled.div`
  width: 35%;
  border-right: 1px solid black;
  padding-right: 20px;

  @media (max-width: 900px) {
    width: 100%;
    border: none;
    padding: 0;
    margin-top: 20px;
  }
`;

const Three = styled.div`
  width: 35%;
  padding-left: 20px;

  @media (max-width: 900px) {
    width: 100%;
    padding: 0;
  }
`;

const TitleBox = styled.div``;

const Title = styled.h1`
  font-family: AbrilFatface;
  font-size: 35px;

  margin: 0;
  margin-bottom: 20px;
  word-break: break-all;
`;

const Highlight = styled.b`
  font-family: MarckScript;
  font-size: 22px;
  font-weight: 200;
`;

const MiniTitle = styled.h3`
  font-family: AbrilFatface;
  font-size: 20px;
  word-break: break-all;
`;

const Content = styled.p`
  font-family: serif;
  font-size: 16px;
  word-break: break-all;
`;

const Img = styled.div`
  background-image: url(${commonData.section01.img[0]});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 720px;
  border: 1px solid black;

  @media (max-width: 900px) {
    background-position: top;
  }
`;
