import styled from "@emotion/styled";
import AwesomeSlider from "react-awesome-slider";

export const Wrapper = styled.main`
  max-width: 1200px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Section01 = styled.section`
  display: flex;
`;

export const Sec01Left = styled.div`
  width: 50%;
`;

export const Sec01Img = styled.img`
  // test
  position: absolute;
  padding-left: 100px;
  width: 47%;
  left: 0;
  bottom: 0;

  /* width: 100%; */
`;

export const Sec01Right = styled.div`
  // test
  position: absolute;
  right: 0;
  bottom: 10%;
  width: 50%;
  padding-right: 100px;

  /* width: 50%; */
  /* padding-left: 100px; */
`;

export const Sec01TitleBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid black;
`;

export const Sec01SectionText = styled.h1`
  font-family: Garamond;
  font-size: 20px;
  font-weight: 200;
  color: darkgray;
  margin: 0;
  margin-top: 17px;
`;

export const Sec01Title = styled.h1`
  font-family: AbrilFatface;
  font-size: 40px;

  margin: 0;
`;

export const Sec01MiniTitle = styled.h3`
  font-family: AbrilFatface;
  font-size: 20px;
`;

export const Sec01Content = styled.p`
  font-family: serif;
  font-size: 16px;
`;

export const Sec01Highlight = styled.b`
  font-family: MarckScript;
  font-size: 22px;
  font-weight: 200;
`;

export const Slider = styled(AwesomeSlider)`
  .awssld__content {
    background-color: white;
  }
  .awssld__content > div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export const Section02 = styled.section`
  display: flex;
  flex-direction: column;
`;

export const Sec02Top = styled.div`
  width: 100%;
  height: 10%;
  border-bottom: 1px solid black;

  display: flex;
  justify-content: center;
`;

export const Sec02Bottom = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 90%;
`;

export const Sec02ContentsBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  width: 80%;
  height: 100%;
`;

export const Sec02TitleBox = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* margin-bottom: 20px; */
`;

export const Sec02SectionText = styled.h1`
  font-family: Garamond;
  font-size: 20px;
  font-weight: 200;
  color: darkgray;
  margin: 0;
`;

export const Sec02Title = styled.h1`
  font-family: AbrilFatface;
  font-size: 40px;
  margin: 0;
  margin-bottom: 20px;
`;

export const Sec02ImgBox = styled.div`
  padding: 15px;
  border: 1px solid black;

  display: flex;
  flex-direction: column;
`;

export const Sec02Img = styled.img`
  max-width: 250px;
  width: 100%;
`;

export const Sec02ImgPlace = styled.div`
  max-width: 250px;
  width: 100%;

  font-family: AbrilFatface;
  font-size: 20px;

  margin-top: 10px;
`;

export const Sec02ImgDesc = styled.div`
  max-width: 250px;
  width: 100%;

  font-family: serif;
  font-size: 16px;
  margin-top: 10px;
`;

export const Sec02ImgDate = styled.div`
  max-width: 250px;
  width: 100%;

  font-family: serif;
  font-size: 14px;
  margin-top: 10px;
  color: darkgray;
`;
