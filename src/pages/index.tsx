import React from "react";
import styled from "@emotion/styled";
import { landingData } from "../common/ts/landing";

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

export default function Home() {
  return (
    <Wrapper>
      <Section01>
        <Left>
          <Img src={landingData[0].img} />
        </Left>
        <Right>
          <Title>{landingData[0].title}</Title>
          <Highlight>{landingData[0].highlight}</Highlight>
          <MiniTitle>{landingData[0].miniTitle}</MiniTitle>
          <Content>{landingData[0].content}</Content>
          <MiniTitle>{landingData[0].miniTitle2}</MiniTitle>
          <Content>{landingData[0].content2}</Content>
          <Content>{landingData[0].content3}</Content>
        </Right>
      </Section01>
    </Wrapper>
  );
}
