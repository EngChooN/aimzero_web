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
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Title = styled.h3`
  margin: 0;
  font-family: AbrilFatface;
  font-size: 40px;
  margin-bottom: 20px;
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

export const Name = styled.div`
  font-family: Garamond;
  font-size: 25px;
  margin-bottom: 15px;
`;

export const Posts = styled.div``;

export const Info = styled.div`
  display: flex;
  align-items: center;

  margin-top: 5px;
  margin-bottom: 5px;

  font-family: serif;
`;

export const BottomSection = styled.div`
  padding-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  width: 66%;
`;

export const Additional = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 250px;
  height: 250px;
  background-color: lightgray;
  cursor: pointer;
  transition: all 0.3s;

  :hover {
    background-color: darkgray;
  }
`;

export const PostImg = styled.img``;

export const ImgBox = styled.div`
  margin: 7px;
`;
