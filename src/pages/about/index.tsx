import styled from "@emotion/styled";
import AboutSection01 from "../../components/About/AboutSection01/AboutSection01";
import AboutSection02 from "../../components/About/AboutSection02/AboutSection02";

const Wrapper = styled.section`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function AboutPage() {
  return (
    <Wrapper>
      <AboutSection01 />
      <AboutSection02 />
    </Wrapper>
  );
}
