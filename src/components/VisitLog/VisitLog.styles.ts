import styled from "@emotion/styled";

export const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1200px;
    width: 100%;
    padding: 30px 10px 60px 10px;
`;

export const ProfileWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    width: 100%;
    margin-top: 10px;
`;

export const ListLog = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: scroll;
`;

export const CommentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 50px;
    width: 100%;
`;

export const LogBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 10px;
    margin-right: 10px;
    padding: 20px;
    border-radius: 10px;
    background-color: #f3f3f3;
    word-break: break-all;
`;

export const Name = styled.p`
    font-size: 12px;
    margin: 0;
    margin-right: 10px;
`;

export const Comment = styled.span`
    height: fit-content;
    font-size: 14px;
`;

export const WriteBox = styled.div`
    position: fixed;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 0);
    display: flex;
    max-width: 1200px;
    width: 100%;
    padding: 0px 10px 30px 10px;
    background-color: white;
`;

export const CommentInput = styled.input`
    border-radius: 25px;
    background-color: #f3f3f3;
    border: none;
    width: 100%;
    height: 45px;
    padding: 10px;
    padding-left: 20px;
    font-size: 14px;
    /* font-family: serif; */

    :focus {
        outline: none;
    }
`;

export const SubmitBtn = styled.button`
    border-radius: 25px;
    margin-left: 10px;
    max-width: fit-content;
    width: 100%;
    height: 45px;
    background: none;
    background-color: black;
    border: none;
    border: 1px solid black;

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

    @media (max-width: 600px) {
        width: 20%;
    }
`;
