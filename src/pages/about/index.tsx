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
  margin-top: 50px;
  margin-bottom: 50px;
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

const Title = styled.h2`
  font-family: AbrilFatface;
  font-size: 60px;
  text-shadow: -1px 0px white, 0px 2px white, 2px 0px white, 0px -2px white;
  margin: 0;
`;

const MiniTitle = styled.h3`
  margin: 0;
  font-size: 40px;
  font-family: Garamond;
  text-shadow: -2px 0px white, 0px 2px white, 2px 0px white, 0px -2px white;
  text-align: end;
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
`;

const HighlightLabel = styled.div`
  width: 100%;
  height: 10px;
  background-color: darkgray;
`;

export default function AboutPage() {
  return (
    <Wrapper>
      <Banner>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: "0",
            right: "40px",
          }}
        >
          <Title>Introduce my story</Title>
          <MiniTitle>SPRING 2023</MiniTitle>
        </div>
      </Banner>
      <Label>
        INTRODUCTION AND INFORMATION ABOUT ME FOR FRIENDS WHO ARE CURIOUS ABOUT
        WHAT KIND OF DEVELOPER I AM
      </Label>
      <HighlightLabel></HighlightLabel>
      <div
        style={{
          paddingLeft: "30px",
          paddingRight: "30px",
          paddingTop: "20px",
        }}
      >
        <AboutSection01 />
        <AboutSection02 />
      </div>
    </Wrapper>
  );
}
