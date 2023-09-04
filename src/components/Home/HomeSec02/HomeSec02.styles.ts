import styled from "@emotion/styled";

export const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    max-width: 1200px;
    width: 100%;
    height: fit-content;
    color: white;

    > h1 {
        font-size: 40px;
        margin-bottom: 20px;
        margin-top: 80px;

        @media (max-width: 600px) {
            font-size: 30px;
        }
    }

    > h2 {
        max-width: 970px;
        width: 100%;
        margin-bottom: 20px;
        margin-top: 0px;
        font-size: 30px;
    }

    @media (max-width: 600px) {
        > h2 {
            font-size: 25px;
        }
    }
`;

export const SkillsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    > h2 {
        max-width: 970px;
        width: 100%;
        margin-bottom: 10px;
        margin-top: 0px;
        font-size: 30px;
    }

    > h3 {
        max-width: 970px;
        width: 100%;
        margin-top: 0px;
    }

    @media (max-width: 600px) {
        > h2 {
            font-size: 25px;
        }

        > h3 {
            font-size: 17px;
        }
    }
`;

export const SkillsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin-bottom: 80px;

    @media (max-width: 910px) {
        display: flex;
        flex-direction: column;
    }
`;

export const SkillBox = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    max-width: 500px;
    width: 100%;
    min-height: 215px;
    height: fit-content;
    box-shadow: 0px 0px 10px white;
    border-radius: 15px;
    transition: 0.3s all ease;

    @media (max-width: 910px) {
        max-width: 100%;
    }

    @media (max-width: 600px) {
        min-height: fit-content;
    }
`;

export const ImgWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100px;
    height: 100%;
    padding: 5px;

    > img {
        height: 100%;
    }
`;

export const DescWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 350px;
    width: 100%;
    padding: 5px;

    > h1 {
        font-size: 20px;
        margin-top: 5px;
        margin-bottom: 10px;
    }

    @media (max-width: 910px) {
        max-width: 100%;
    }

    @media (max-width: 600px) {
        > span {
            font-size: 15px;
        }
    }
`;

export const IntroWrapper = styled.div`
    overflow: hidden;
    display: flex;
    justify-content: center;
    border-radius: 15px;
    /* padding: 20px; */
    box-shadow: 0px 0px 10px white;
    max-width: 970px;
    width: 100%;

    > img {
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        width: 40%;
        /* height: 100%; */
        object-fit: cover;
    }

    @media (max-width: 760px) {
        flex-direction: column;
        align-items: center;
        font-size: 15px;

        > img {
            width: 100%;
            margin-bottom: 20px;
            border-top-right-radius: 8px;
            border-bottom-left-radius: 0px;
        }
    }
`;

export const IntroDescWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    width: 60%;

    > div {
        > ul {
            padding-left: 20px;
        }
    }

    @media (max-width: 760px) {
        width: 100%;
        /* padding-left: 0px;
        padding-right: 0px; */
    }
`;

export const MoreButton = styled.div`
    margin-top: 20px;
    width: 100%;
    height: 50px;
    /* box-shadow: 0px 0px 3px white; */
    border: 1px solid grey;
    background-color: black;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    :hover {
        background-color: rgba(0, 0, 0, 0.4);
    }
`;
