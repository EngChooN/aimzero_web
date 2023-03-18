import styled from "@emotion/styled";
import commonData from "../../../../public/locales/en/common.json";

const Wrapper = styled.section`
  max-width: 1200px;
  width: 100%;
  display: flex;
  align-items: center;
`;

const Left = styled.div`
  width: 40%;
  padding-left: 50px;
`;

const Right = styled.div`
  width: 60%;
  padding-right: 50px;
  padding-left: 50px;
`;

const TitleBox = styled.div``;

const Title = styled.h1`
  font-family: AbrilFatface;
  font-size: 40px;

  margin: 0;
`;

const Highlight = styled.b`
  font-family: MarckScript;
  font-size: 22px;
  font-weight: 200;
`;

const MiniTitle = styled.h3`
  font-family: AbrilFatface;
  font-size: 20px;
`;

const Content = styled.p`
  font-family: serif;
  font-size: 16px;
`;

const Img = styled.img`
  width: 100%;
`;

export default function AboutSection01() {
  return (
    <Wrapper>
      <Left>
        <Img src={commonData.section01.img[0]} />
      </Left>
      <Right>
        <TitleBox>
          {/* title */}
          <Title>{commonData.section01.title}</Title>
        </TitleBox>
        {/* highlight */}
        <Highlight>{commonData.section01.highlight[0]}</Highlight>
        <MiniTitle>
          {/* mini-title01 */}
          {commonData.section01.miniTitle[0]}
        </MiniTitle>
        {/* content01 */}
        <Content>{commonData.section01.content[0]}</Content>
        {/* mini-title02 */}
        <MiniTitle>{commonData.section01.miniTitle[1]}</MiniTitle>
        {/* content02-01 */}
        <Content>{commonData.section01.content[1]}</Content>
        {/* content02-02 */}
        <Content>{commonData.section01.content[2]}</Content>
      </Right>
    </Wrapper>
  );
}
