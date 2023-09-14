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
    padding: 30px;

    @media (max-width: 400px) {
        padding: 10px;
    }
`;

export const BtnWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const BottomWrapper = styled.div`
    display: flex;
    width: 100%;
`;

export const tagWrapper = styled.div`
    overflow-y: scroll;
    display: flex;
    flex-wrap: wrap;
    width: 50%;
    height: 100px;
`;

export const tag = styled.div`
    display: flex;
    align-items: center;

    height: 30px;
    background-color: #f3f3f3;
    border-radius: 15px;

    padding-right: 10px;
    padding-left: 10px;
    margin-top: 28px;
    margin-left: 10px;

    font-family: serif;
`;
