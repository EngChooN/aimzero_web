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
`;

const Title = styled.h1``;

const Content = styled.p``;

const Highlight = styled.b``;

export default function Home() {
  return (
    <Wrapper>
      <Section01>
        <Left>
          <Img src={landingData[0].img} />
        </Left>
        <Right>
          <Title>{landingData[0].title}</Title>
          <Content>{landingData[0].content}</Content>
          <Highlight>{landingData[0].highlight}</Highlight>
        </Right>
      </Section01>
    </Wrapper>
  );
}
