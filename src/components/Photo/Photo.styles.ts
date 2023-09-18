import styled from "@emotion/styled";

export const Wrapper = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    max-width: 1200px;
    width: 100%;
    min-height: calc(100vh - 300px);
    height: 100%;
    padding-top: 40px;

    @media (max-width: 1100px) {
        min-height: calc(100vh - 64.5px - 170px);
        padding-top: 15px;
    }
`;

export const BottomSection = styled.div`
    overflow: hidden;
    padding: 10px;
    padding-bottom: 20px;

    place-items: center;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    max-width: 750px;
    width: 100%;
    gap: 10px;

    overflow-y: scroll;

    @media (max-width: 689px) {
        max-width: 490px;
    }

    @media (max-width: 600px) {
        max-width: 490px;
    }

    @media (max-width: 490px) {
        grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    }

    @media (max-width: 460px) {
        grid-template-columns: repeat(auto-fill, minmax(141px, 1fr));
        max-width: 355px;
    }
`;

export const SelImgWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
`;

export const Additional = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 230px;
    height: 230px;
    background-color: lightgray;
    cursor: pointer;
    transition: all 0.3s;
    border-radius: 4px;

    :hover {
        background-color: darkgray;
    }

    @media (max-width: 600px) {
        width: 200px;
        height: 200px;
    }

    @media (max-width: 460px) {
        width: 160px;
        height: 160px;
    }
`;

export const ImgBox = styled.div`
    width: 230px;
    height: 230px;
    position: relative;

    @media (max-width: 600px) {
        width: 200px;
        height: 200px;
    }

    @media (max-width: 460px) {
        width: 160px;
        height: 160px;
    }
`;

export const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100vh;
    background-color: white;
    z-index: 1;
`;

export const SelImg = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 4px;
    object-fit: cover;
    transition: all 0.3s;

    :hover {
        filter: invert(25%);
    }
`;

export const DataPresentText = styled.div`
    margin-top: 75px;
    margin-bottom: 90px;
`;
