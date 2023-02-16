import styled from "@emotion/styled";

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 1200px;
  width: 100%;
`;

export const TopSection = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const ProfileBox = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  padding-bottom: 20px;
  border-bottom: 1px solid black;
  margin-bottom: 20px;
`;

export const ProfileImg = styled.img`
  width: 170px;
  height: 170px;
  border-radius: 100px;
  border: 3px solid darkgray;
`;

export const InfoBox = styled.div``;

export const Name = styled.div``;

export const Posts = styled.div``;

export const Info = styled.div``;

export const BottomSection = styled.div`
  padding-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  width: 66%;
`;

export const Additional = styled.div`
  background-color: black;

  width: 250px;
  height: 250px;

  margin: 10px;
`;

export const PostImg = styled.img``;

export const ImgBox = styled.div`
  margin: 7px;
`;
