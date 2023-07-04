import styled from "@emotion/styled";

export const Wrapper = styled.section`
    max-width: 1200px;
    width: 100%;

    height: calc(100vh - 300px);
    @media (max-width: 1100px) {
        height: calc(100vh - 160px);
    }
`;
