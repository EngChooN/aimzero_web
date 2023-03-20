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
`;

const Title = styled.h2`
  font-family: AbrilFatface;
  font-size: 30px;
  margin: 0;
  margin-bottom: 20px;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  padding: 20px;
  font-family: serif;
  font-size: 17px;
`;

const Right = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  padding: 20px;
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
        <Left
          style={{
            width: "50%",
            borderRight: "1px solid",
            padding: "0px",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          <Title>{commonData.section02.one.title}</Title>
          {commonData.section02.one.content}
        </Left>
        {/* content */}
        <Right
          style={{
            width: "50%",
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: "0px",
            paddingLeft: "20px",
            paddingRight: "20px",
            fontFamily: "serif",
            fontSize: "17px",
          }}
        >
          <Title>{commonData.section02.two.title}</Title>
          {commonData.section02.two.content}
        </Right>
      </Block>
      {/* 02 */}
      <Block>
        <Right>
          <img
            src={"images/about/section2-02.gif"}
            style={{ width: "100%", border: "1px solid", padding: "20px" }}
          />
        </Right>
        <Left>
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
        </Left>
        {/* content */}
      </Block>
      {/* 03 */}
      <Block>
        <Left style={{ width: "65%" }}>
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
        </Left>
        {/* content */}
        <Right style={{ width: "35%" }}>
          <img
            src={"images/about/section2-03.gif"}
            style={{ width: "100%", border: "1px solid" }}
          />
        </Right>
      </Block>
      {/* 04 */}
      <Block>
        <Right>
          <img
            src={"images/about/section2-04.gif"}
            style={{ width: "100%", border: "1px solid", padding: "10px" }}
          />
        </Right>
        <Left>
          <Title>{commonData.section02.five.title}</Title>
          {commonData.section02.five.contentOne}
          <br />
          <br />
          {commonData.section02.five.contentTwo}
        </Left>
        {/* content */}
      </Block>
    </Wrapper>
  );
}
