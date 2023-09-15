import styled from "@emotion/styled";

export const Wrapper = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    width: 100%;
`;

export const BoardListBox = styled.div`
    width: 100%;
`;

export const BoardInfo = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid black;
    transition: all 0.3s;
`;

export const BoardNumberInfo = styled.div`
    width: 15%;
    font-weight: 600;
    margin-left: 30px;

    @media (max-width: 460px) {
        display: none;
    }
`;

export const BoardTitleInfo = styled.div`
    display: flex;
    justify-content: center;
    width: 35%;
    font-weight: 600;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media (max-width: 460px) {
        width: 50%;
        margin-left: 10px;
    }
`;

export const BoardDateInfo = styled.div`
    width: 30%;
    display: flex;
    justify-content: center;
    font-weight: 600;
`;

export const NameInfo = styled.div`
    width: 20%;
    display: flex;
    justify-content: center;
    font-weight: 600;
`;

export const Board = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid lightgrey;
    transition: all 0.3s;
    cursor: pointer;

    > div {
        transition: all 0.3s;
    }

    :hover {
        background-color: #ededed;
    }
`;

export const BoardNumber = styled.div`
    width: 15%;
    margin-left: 30px;
    font-family: serif;

    @media (max-width: 460px) {
        display: none;
    }
`;

export const BoardTitle = styled.div`
    text-align: center;
    width: 35%;
    font-family: serif;

    // text "..." processing
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 460px) {
        width: 50%;
        margin-left: 10px;
    }
`;

export const BoardDate = styled.div`
    width: 30%;
    display: flex;
    justify-content: center;
    font-family: serif;
`;

export const Name = styled.div`
    width: 20%;
    display: flex;
    justify-content: center;
    font-family: serif;

    @media (max-width: 460px) {
        margin-left: 5px;
        margin-right: 5px;
    }
`;

export const BoardBottomBox = styled.div`
    position: relative;
    margin-top: 30px;
    margin-bottom: 30px;
`;

export const BoardWriteBtn = styled.button`
    position: absolute;
    margin-right: 10px;
    top: 0px;
    right: 0px;

    height: 40px;
    background: none;
    background-color: black;
    border: none;
    border: 1px solid black;
    border-radius: 20px;

    padding: 25px;
    padding-top: 15px;
    padding-bottom: 15px;

    font-family: serif;
    color: white;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    :hover {
        background-color: #2f2f2f;
    }
    :active {
        background-color: black;
    }
`;
