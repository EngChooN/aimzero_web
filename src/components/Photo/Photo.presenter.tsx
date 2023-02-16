import * as Photos from "./Photo.styles";
import profileData from "../../../public/locales/en/common.json";
import { Image } from "antd";

export default function PhotoUI(props: any) {
  return (
    <Photos.Wrapper>
      <Photos.TopSection>
        <Photos.ProfileBox>
          <Photos.ProfileImg src={"/images/photo/profile.GIF"} />
          <Photos.InfoBox>
            <Photos.Name>Joonyoung Cho</Photos.Name>
            <Photos.Posts></Photos.Posts>
            {/* contact info */}
            <Photos.Info>
              mail: {profileData.photo.profileInfo.mail}
            </Photos.Info>
            <Photos.Info>
              blog: {profileData.photo.profileInfo.blog}
            </Photos.Info>
            <Photos.Info>
              github: {profileData.photo.profileInfo.github}
            </Photos.Info>
            <Photos.Info>
              instagram: {profileData.photo.profileInfo.instagram}
            </Photos.Info>
          </Photos.InfoBox>
        </Photos.ProfileBox>
      </Photos.TopSection>
      <Photos.BottomSection>
        {props.userInfo?.email == "aimzero9303@gmail.com" ? (
          <Photos.Additional></Photos.Additional>
        ) : null}
        {/* <Photos.PostImg /> */}
        <Photos.ImgBox>
          <Image
            width={250}
            height={250}
            src={"/images/landing/IMG_4710.JPG"}
          />
        </Photos.ImgBox>
        <Photos.ImgBox>
          <Image
            width={250}
            height={250}
            src={"/images/landing/IMG_4710.JPG"}
          />
        </Photos.ImgBox>
        <Photos.ImgBox>
          <Image
            width={250}
            height={250}
            src={"/images/landing/IMG_4710.JPG"}
          />
        </Photos.ImgBox>
        <Photos.ImgBox>
          <Image
            width={250}
            height={250}
            src={"/images/landing/IMG_4710.JPG"}
          />
        </Photos.ImgBox>
        <Photos.ImgBox>
          <Image
            width={250}
            height={250}
            src={"/images/landing/IMG_4710.JPG"}
          />
        </Photos.ImgBox>
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
