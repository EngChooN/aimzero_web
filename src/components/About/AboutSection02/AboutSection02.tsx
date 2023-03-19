import styled from "@emotion/styled";
import commonData from "../../../../public/locales/en/common.json";

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
`;

const Title = styled.h2`
  font-family: AbrilFatface;
  font-size: 30px;
  margin: 0;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  padding: 30px;
  font-family: serif;
  font-size: 17px;
`;

const Right = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
`;

export default function AboutSection02() {
  return (
    <Wrapper>
      {/* 01 */}
      <Block>
        <Block>
          <Left>
            <Title>{commonData.section02.one.title}</Title>
            {commonData.section02.one.content}
          </Left>
          {/* content */}
          <Right>
            <img
              src={"images/about/section2-01.gif"}
              style={{ width: "100%" }}
            />
          </Right>
        </Block>
      </Block>
      {/* 02 */}
      <Block>
        <Block>
          <Right>
            <img
              src={"images/about/section2-02.gif"}
              style={{ width: "100%" }}
            />
          </Right>
          <Left>
            <Title style={{ display: "flex", justifyContent: "flex-end" }}>
              {commonData.section02.two.title}
            </Title>
            {commonData.section02.two.contentOne}
            <br />
            <br />
            {commonData.section02.two.contentTwo}
            <br />
            <br />
            <br />
            <button>Project good assessment</button>
          </Left>
          {/* content */}
        </Block>
      </Block>
      {/* 03 */}
      <Block>
        <Block>
          <Left>
            <Title>{commonData.section02.three.title}</Title>
            {commonData.section02.three.contentOne}
            <br />
            <br />
            {commonData.section02.three.contentTwo}
            <br />
            <br />
            <button>Project bad assessment</button>
            <br />
            <br />
            {commonData.section02.three.contentThree}
          </Left>
          {/* content */}
          <Right>
            <img
              src={"images/about/section2-03.gif"}
              style={{ width: "100%" }}
            />
          </Right>
        </Block>
      </Block>
    </Wrapper>
  );
}
