import styled from "@emotion/styled";

export const Wrapper = styled.section`
  max-width: 1200px;
  width: 100%;
  height: calc(100vh - 64.5px - 297px);
  @media (max-width: 1100px) {
    height: calc(100vh - 300px);
  }
  display: flex;
  flex-direction: column;
  position: relative;
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
`;

export const BoardTitleInfo = styled.div`
  display: flex;
  justify-content: center;
  width: 35%;
  font-weight: 600;
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
  border-bottom: 1px solid lightgray;
  transition: all 0.3s;
  cursor: pointer;

  :hover {
    background-color: #ededed;
  }
`;

export const BoardNumber = styled.div`
  width: 15%;
  margin-left: 30px;
  font-family: serif;
`;

export const BoardTitle = styled.div`
  width: 35%;
  font-family: serif;
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
`;

export const BoardBottomBox = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
`;

export const BoardWriteBtn = styled.button``;
