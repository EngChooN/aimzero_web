import * as Photos from "./Photo.styles";
import profileData from "../../../public/locales/en/common.json";
import { Image } from "antd";
import styled from "@emotion/styled";
import { AiOutlinePlus } from "react-icons/ai";
import { FiMail, FiInstagram } from "react-icons/fi";
import { FaBlog } from "react-icons/fa";
import { RxGithubLogo } from "react-icons/rx";

export default function PhotoUI(props: any) {
  return (
    <Photos.Wrapper>
      {/* selected img modal window */}
      {/* 근데 왜 state 초깃값이 ""인데, 조건이 undefined여야 안보이는거냐 넌? */}
      {props.uploadStep == 2 ? (
        <Photos.Modal>
          <Photos.SelImg src={props.uploadImg} />
          <Photos.ModalBtnWrapper>
            <Photos.ModalBtn>Cancle</Photos.ModalBtn>
            <Photos.ModalBtn>Ok</Photos.ModalBtn>
          </Photos.ModalBtnWrapper>
        </Photos.Modal>
      ) : null}
      <Photos.TopSection>
        <Photos.Title>Photo</Photos.Title>
        <Photos.ProfileBox>
          <Photos.ProfileImg src={"/images/photo/profile.GIF"} />
          <Photos.InfoBox>
            <Photos.Name>joonyoung cho</Photos.Name>
            <Photos.Posts></Photos.Posts>
            {/* contact info */}
            <Photos.Info>
              <FiMail style={{ marginRight: "10px" }} />{" "}
              {profileData.photo.profileInfo.mail}
            </Photos.Info>
            <Photos.Info>
              <FaBlog style={{ marginRight: "10px" }} />{" "}
              {profileData.photo.profileInfo.blog}
            </Photos.Info>
            <Photos.Info>
              <RxGithubLogo style={{ marginRight: "10px" }} />{" "}
              {profileData.photo.profileInfo.github}
            </Photos.Info>
            <Photos.Info>
              <FiInstagram style={{ marginRight: "10px" }} />{" "}
              {profileData.photo.profileInfo.instagram}
            </Photos.Info>
          </Photos.InfoBox>
        </Photos.ProfileBox>
      </Photos.TopSection>
      <Photos.BottomSection>
        {props.userInfo?.email == "aimzero9303@gmail.com" ? (
          <Photos.ImgBox>
            <Photos.Additional onClick={() => props.fileInput.current.click()}>
              <AiOutlinePlus color={"white"} fontSize={60} />
              <input
                type={"file"}
                style={{ display: "none" }}
                accept="image/*"
                ref={props.fileInput}
                onChange={(e) => props.selectFile(e.target.files[0])}
              />
            </Photos.Additional>
          </Photos.ImgBox>
        ) : null}
        {/* <Photos.PostImg /> */}
        <Photos.ImgBox>
          <Image
            width={250}
            height={250}
            src={"/images/landing/IMG_4710.JPG"}
          />
        </Photos.ImgBox>
      </Photos.BottomSection>
    </Photos.Wrapper>
  );
}
