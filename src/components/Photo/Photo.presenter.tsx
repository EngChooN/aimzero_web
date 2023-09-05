import * as Photos from "./Photo.styles";
import profileData from "../../../public/locales/en/common.json";
// antd
import { Image } from "antd";
import { Skeleton } from "antd";
// icon
import { AiOutlinePlus, AiFillDelete } from "react-icons/ai";
import { FiMail, FiInstagram } from "react-icons/fi";
import { FaBlog } from "react-icons/fa";
import { RxGithubLogo } from "react-icons/rx";
import { PhotoType } from "@/types/interfaces/common";
import { DocumentData } from "firebase/firestore";
import React from "react";

export default function PhotoUI(props: PhotoType) {
    const {
        userInfo,
        uploadStep,
        selectFile,
        fileInput,
        uploadImgUrl,
        image,
        images,
        isLoading,
        isMoreLoading,
        dataPresent,
        deletePhoto,
        windowWidth,
    } = props;

    const skeleton = () => {
        const skeletonUi = [];
        let width = "230px";

        if (windowWidth <= 600) {
            width = "200px";
        }
        if (windowWidth <= 460) {
            width = "160px";
        }

        for (let i = 0; i < 7; i++) {
            skeletonUi.push(
                <Skeleton.Image
                    style={{
                        width: width,
                        height: width,
                    }}
                    active={true}
                />
            );
        }
        return skeletonUi;
    };

    return (
        <Photos.Wrapper>
            <Photos.TopSection>
                <Photos.ProfileBox>
                    <Photos.ProfileImg
                        alt="profile"
                        src={"/images/photo/profile.GIF"}
                    />
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
                            <a
                                href={profileData.photo.profileInfo.blog}
                                target="_blank"
                            >
                                {profileData.photo.profileInfo.blog}
                            </a>
                        </Photos.Info>
                        <Photos.Info>
                            <RxGithubLogo style={{ marginRight: "10px" }} />{" "}
                            <a
                                href={profileData.photo.profileInfo.github}
                                target="_blank"
                            >
                                {profileData.photo.profileInfo.github}
                            </a>
                        </Photos.Info>
                        <Photos.Info>
                            <FiInstagram style={{ marginRight: "10px" }} />{" "}
                            <a
                                href={profileData.photo.profileInfo.instagram}
                                target="_blank"
                            >
                                {profileData.photo.profileInfo.instagram}
                            </a>
                        </Photos.Info>
                    </Photos.InfoBox>
                </Photos.ProfileBox>
            </Photos.TopSection>
            <Photos.BottomSection>
                {isLoading == true ? (
                    <>{skeleton()}</>
                ) : userInfo?.email === "aimzero9303@gmail.com" ? (
                    <Photos.ImgBox>
                        {uploadStep == 1 ? (
                            <Photos.Additional
                                onClick={() => fileInput.current?.click()}
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
                                    ref={fileInput}
                                    onChange={(e: any) =>
                                        selectFile(e.target.files[0])
                                    }
                                />
                            </Photos.Additional>
                        ) : (
                            // img preview
                            <Photos.SelImgWrapper onClick={uploadImgUrl}>
                                <AiOutlinePlus
                                    color={"darkGray"}
                                    fontSize={60}
                                    style={{
                                        position: "absolute",
                                        zIndex: 9999999,
                                    }}
                                />
                                <Photos.SelImg src={image} />
                            </Photos.SelImgWrapper>
                        )}
                    </Photos.ImgBox>
                ) : null}
                {images?.map((el: DocumentData, index: number) => (
                    <Photos.ImgBox key={index}>
                        <Image
                            width={"100%"}
                            height={"100%"}
                            src={el.imgUrl}
                            alt="daily"
                            loading="lazy"
                            // placeholder={
                            //     <Image
                            //         preview={false}
                            //         src={`${el.imgUrl}?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200`}
                            //         width={"100%"}
                            //         height={"100%"}

                            //     />
                            // }
                        />
                        {userInfo?.email === "aimzero9303@gmail.com" ? (
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
                                    deletePhoto(el.id);
                                }}
                            />
                        ) : null}
                    </Photos.ImgBox>
                ))}
                {isMoreLoading && <>{skeleton()}</>}
            </Photos.BottomSection>
            <Photos.DataPresentText>{dataPresent}</Photos.DataPresentText>
        </Photos.Wrapper>
    );
}
