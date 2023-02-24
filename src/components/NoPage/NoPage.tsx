import styled from "@emotion/styled";

const Wrapper = styled.section`
  max-width: 1200px;
  width: 100%;
  height: 600px;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Img = styled.img`
  max-width: 150px;
  width: 100%;
`;

const Desc = styled.h2`
  font-family: AbrilFatface;
`;

export default function NoPage() {
  return (
    <Wrapper>
      <Img src={"images/no_page.gif"} />
      <Desc>This page does not exist yet.</Desc>
    </Wrapper>
  );
}
