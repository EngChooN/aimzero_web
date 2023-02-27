import styled from "@emotion/styled";

export const Wrapper = styled.section`
  max-width: 1200px;
  width: 100%;
  padding-bottom: 50px;
  height: calc(100vh - 130px);
  @media (max-width: 1100px) {
    height: calc(100vh - 64.5px);
  }

  display: flex;
  flex-direction: column;
`;
