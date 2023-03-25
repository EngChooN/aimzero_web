import styled from "@emotion/styled";
import AboutSection01 from "../../components/About/AboutSection01/AboutSection01";
import AboutSection02 from "../../components/About/AboutSection02/AboutSection02";

const Wrapper = styled.section`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  /* margin-top: 50px; */
  margin-bottom: 30px;
  margin-left: 20px;
  margin-right: 20px;

  @media (max-width: 1200px) {
    margin: 0px;
    border: none;
  }
`;

const Banner = styled.div`
  background-image: url("images/about/IMG_7615.jpeg");
  width: 100%;
  height: 250px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 40px;
  @media (max-width: 900px) {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    right: 0px;
    margin-top: 30px;
    @media (max-width: 390px) {
      margin-top: 40px;
    }
  }
`;

const Title = styled.h2`
  font-family: AbrilFatface;
  font-size: 60px;
  text-shadow: -1px 0px white, 0px 1px white, 1px 0px white, 0px -1px white;
  margin: 0;
  word-break: break-all;
  @media (max-width: 900px) {
    font-size: 45px;
  }
  @media (max-width: 390px) {
    font-size: 40px;
  }
`;

const MiniTitle = styled.h3`
  margin: 0;
  font-size: 40px;
  font-family: Garamond;
  text-shadow: -1px 0px white, 0px 1px white, 1px 0px white, 0px -1px white;
  text-align: end;
  word-break: break-all;
  @media (max-width: 900px) {
    font-size: 30px;
  }
`;

const Label = styled.div`
  width: 100%;
  height: 40px;
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: serif;
  font-size: 14px;
  text-align: center;
  word-break: break-all;
  @media (max-width: 900px) {
    font-size: 12px;
  }
`;

const HighlightLabel = styled.div`
  width: 100%;
  height: 10px;
  background-color: darkgray;
`;

const EtcInfo = styled.div`
  color: white;
  font-family: serif;
  cursor: pointer;
  :first-child {
    border-right: 1px solid white;
    padding-right: 30px;
    @media (max-width: 1200px) {
      border: none;
    }
  }
  :last-child {
    border-left: 1px solid white;
    padding-left: 30px;
    @media (max-width: 1200px) {
      border: none;
    }
  }
`;

const Modal = styled.section`
  position: fixed;
  top: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background-color: white;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
`;

export default function AboutPage() {
  return (
    <Wrapper>
      <Banner>
        <TitleWrapper>
          <Title>Introduce my story</Title>
          <MiniTitle>SPRING 2023</MiniTitle>
        </TitleWrapper>
      </Banner>
      <Label>
        INTRODUCTION AND INFORMATION ABOUT ME FOR FRIENDS WHO ARE CURIOUS ABOUT
        WHAT KIND OF DEVELOPER I AM
      </Label>
      <HighlightLabel></HighlightLabel>
      <div
        style={{
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingTop: "20px",
          width: "100%",
        }}
      >
        <AboutSection01 />
        <AboutSection02 />
      </div>
      <HighlightLabel
        style={{
          height: "50px",
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "35%",
            height: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <EtcInfo>CONTACT</EtcInfo>
          <EtcInfo>SKILLS</EtcInfo>
          <EtcInfo>CAREER</EtcInfo>
        </div>
      </HighlightLabel>
    </Wrapper>
  );
}
