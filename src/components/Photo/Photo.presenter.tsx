import * as Photos from "./Photo.styles";
import profileData from "../../../public/locales/en/common.json";
// antd
import { Image } from "antd";
// icon
import { AiOutlinePlus, AiFillDelete } from "react-icons/ai";
import { FiMail, FiInstagram } from "react-icons/fi";
import { FaBlog } from "react-icons/fa";
import { RxGithubLogo } from "react-icons/rx";

export default function PhotoUI(props: any) {
  return (
    <Photos.Wrapper>
      <Photos.TopSection>
        {/* <Photos.Title>Photo</Photos.Title> */}
        <Photos.ProfileBox>
          <Photos.ProfileImg src={"/images/photo/profile.GIF"} />
          <Photos.InfoBox>
            <Photos.Name>Joonyoung Cho</Photos.Name>
            <Photos.Posts></Photos.Posts>
            {/* contact info */}
            <Photos.Info>
              <FiMail style={{ marginRight: "10px" }} />{" "}
              {profileData.photo.profileInfo.mail}
            </Photos.Info>
            <Photos.Info>
              <FaBlog style={{ marginRight: "10px" }} />{" "}
              <a href={profileData.photo.profileInfo.blog} target="_blank">
                {profileData.photo.profileInfo.blog}
              </a>
            </Photos.Info>
            <Photos.Info>
              <RxGithubLogo style={{ marginRight: "10px" }} />{" "}
              <a href={profileData.photo.profileInfo.github} target="_blank">
                {profileData.photo.profileInfo.github}
              </a>
            </Photos.Info>
            <Photos.Info>
              <FiInstagram style={{ marginRight: "10px" }} />{" "}
              <a href={profileData.photo.profileInfo.instagram} target="_blank">
                {profileData.photo.profileInfo.instagram}
              </a>
            </Photos.Info>
          </Photos.InfoBox>
        </Photos.ProfileBox>
      </Photos.TopSection>
      <Photos.BottomSection>
        {props.userInfo?.email == "aimzero9303@gmail.com" ? (
          <Photos.ImgBox>
            {props.uploadStep == 1 ? (
              <Photos.Additional
                onClick={() => props.fileInput.current.click()}
              >
                {/* file add btn */}
                <AiOutlinePlus
                  color={"white"}
                  fontSize={60}
                  style={{ position: "absolute" }}
                />
                {/* file input */}
                <input
                  type={"file"}
                  style={{ display: "none" }}
                  accept="image/*"
                  ref={props.fileInput}
                  onChange={(e) => props.selectFile(e.target.files[0])}
                />
              </Photos.Additional>
            ) : (
              // img preview
              <Photos.SelImgWrapper onClick={props.uploadImgUrl}>
                <AiOutlinePlus
                  color={"darkGray"}
                  fontSize={60}
                  style={{ position: "absolute", zIndex: 9999999 }}
                />
                <Photos.SelImg src={props.image} />
              </Photos.SelImgWrapper>
            )}
          </Photos.ImgBox>
        ) : null}
        {/* <Photos.PostImg /> */}
        {props.images?.map((el, index) => (
          <Photos.ImgBox key={index}>
            <Image width={230} height={230} src={el.imgUrl} />
            {props.userInfo?.email == "aimzero9303@gmail.com" ? (
              <AiFillDelete
                fontSize={30}
                color={"lightgray"}
                style={{
                  cursor: "pointer",
                  marginLeft: "10px",
                  position: "absolute",
                  bottom: "3",
                  right: "3",
                }}
                onClick={() => {
                  props.deletePhoto(el.id);
                }}
              />
            ) : null}
          </Photos.ImgBox>
        ))}
      </Photos.BottomSection>
    </Photos.Wrapper>
  );
}
