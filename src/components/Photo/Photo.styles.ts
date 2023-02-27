import styled from "@emotion/styled";

export const Wrapper = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 1200px;
  width: 100%;
  /* height: calc(100vh - 130px);
  @media (max-width: 1100px) {
    height: calc(100vh - 64.5px);
  } */
`;

export const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Title = styled.h3`
  margin: 0;
  margin-bottom: 20px;
  padding-top: 40px;
  font-family: AbrilFatface;
  font-size: 40px;
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
  width: 150px;
  height: 150px;
  border-radius: 100px;
  border: 3px solid darkgray;
`;

export const InfoBox = styled.div``;

export const Name = styled.div`
  font-family: Garamond;
  font-size: 23px;
  margin-bottom: 15px;
`;

export const Posts = styled.div``;

export const Info = styled.div`
  display: flex;
  align-items: center;

  margin-top: 5px;
  margin-bottom: 5px;

  font-family: serif;
  font-size: 16px;
`;

export const BottomSection = styled.div`
  padding-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  width: 61%;
  @media (max-width: 1100px) {
    width: 67%;
  }

  overflow-y: scroll;
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

  :hover {
    background-color: darkgray;
  }
`;

export const PostImg = styled.img``;

export const ImgBox = styled.div`
  margin: 7px;
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
  z-index: 99999;
`;

export const SelImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 250px;
  height: 250px;

  cursor: pointer;
  transition: all 0.3s;
`;

export const SelImg = styled.img`
  width: 100%;
  height: 100%;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  transition: all 0.3s;

  :hover {
    filter: invert(25%);
  }
`;
