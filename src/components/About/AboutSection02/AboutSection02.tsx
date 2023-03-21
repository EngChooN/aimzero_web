import styled from "@emotion/styled";
import commonData from "../../../../public/locales/en/common.json";
import { Btn } from "../../Login/Login.styles";

const Wrapper = styled.section`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Block = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-top: 1px solid;
  @media (max-width: 900px) {
    /* flex-direction: column; */
  }
`;

const Title = styled.h2`
  font-family: AbrilFatface;
  font-size: 30px;
  margin: 0;
  margin-bottom: 20px;
`;

const Left01 = styled.div`
  display: flex;
  flex-direction: column;
  font-family: serif;
  font-size: 17px;
  width: 50%;
  border-right: 1px solid;
  padding: 0px;
  padding-right: 20px;
`;

const Right01 = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0px;
  padding-left: 20px;
  font-family: serif;
  font-size: 17px;
`;

const Left02 = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  padding: 20px;
  font-family: serif;
  font-size: 17px;
  padding-left: 20px;
  padding-right: 0px;
  @media (max-width: 900px) {
    width: 100%;
    padding-left: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Right02 = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  padding: 20px;
  padding-left: 0px;
  padding-right: 20px;
  @media (max-width: 900px) {
    display: none;
  }
`;

const Left03 = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  padding: 20px;
  padding-left: 0px;
  font-family: serif;
  font-size: 17px;
  @media (max-width: 900px) {
    width: 100%;
    padding-right: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Right03 = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  padding-right: 0px;
  width: 35%;
  @media (max-width: 900px) {
    display: none;
  }
`;

const Left04 = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  padding: 20px;
  font-family: serif;
  font-size: 17px;
  padding-left: 20px;
  padding-right: 0px;
  @media (max-width: 900px) {
    width: 100%;
    padding-left: 0px;
  }
`;

const Right04 = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  padding: 20px;
  padding-left: 0px;
  padding-right: 20px;
  @media (max-width: 900px) {
    display: none;
  }
`;

const Img = styled.img`
  @media (max-width: 900px) {
    display: none;
  }
`;

export default function AboutSection02() {
  return (
    <Wrapper>
      {/* 01 */}
      <Block
        style={{
          alignItems: "flex-start",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <Left01>
          <Title>{commonData.section02.one.title}</Title>
          {commonData.section02.one.content}
        </Left01>
        {/* content */}
        <Right01>
          <Title>{commonData.section02.two.title}</Title>
          {commonData.section02.two.content}
        </Right01>
      </Block>
      {/* 02 */}
      <Block>
        <Right02>
          <Img
            src={"images/about/section2-02.gif"}
            style={{
              width: "100%",
              border: "1px solid",
              padding: "20px",
            }}
          />
        </Right02>
        <Left02>
          <Title>{commonData.section02.three.title}</Title>
          {commonData.section02.three.contentOne}
          <br />
          <br />
          {commonData.section02.three.contentTwo}
          <br />
          <br />
          <br />
          <Btn style={{ margin: "0px", maxWidth: "200px" }}>
            Project good assessment
          </Btn>
        </Left02>
        {/* content */}
      </Block>
      {/* 03 */}
      <Block>
        <Left03>
          <Title>{commonData.section02.four.title}</Title>
          {commonData.section02.four.contentOne}
          <br />
          <br />
          {commonData.section02.four.contentTwo}
          <br />
          <br />
          <Btn style={{ margin: "0px", maxWidth: "200px" }}>
            Project bad assessment
          </Btn>
          <br />
          {commonData.section02.four.contentThree}
        </Left03>
        {/* content */}
        <Right03>
          <Img
            src={"images/about/section2-03.gif"}
            style={{ width: "100%", border: "1px solid" }}
          />
        </Right03>
      </Block>
      {/* 04 */}
      <Block>
        <Right04>
          <Img
            src={"images/about/section2-04.gif"}
            style={{ width: "100%", border: "1px solid", padding: "10px" }}
          />
        </Right04>
        <Left04>
          <Title>{commonData.section02.five.title}</Title>
          {commonData.section02.five.contentOne}
          <br />
          <br />
          {commonData.section02.five.contentTwo}
        </Left04>
        {/* content */}
      </Block>
    </Wrapper>
  );
}
