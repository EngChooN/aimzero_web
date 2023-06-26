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
    } = props;
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
                    <>
                        <Skeleton.Image
                            style={{
                                width: "230px",
                                height: "230px",
                                margin: "7px",
                            }}
                            active={true}
                        />
                        <Skeleton.Image
                            style={{
                                width: "230px",
                                height: "230px",
                                margin: "7px",
                            }}
                            active={true}
                        />
                        <Skeleton.Image
                            style={{
                                width: "230px",
                                height: "230px",
                                margin: "7px",
                            }}
                            active={true}
                        />
                        <Skeleton.Image
                            style={{
                                width: "230px",
                                height: "230px",
                                margin: "7px",
                            }}
                            active={true}
                        />
                        <Skeleton.Image
                            style={{
                                width: "230px",
                                height: "230px",
                                margin: "7px",
                            }}
                            active={true}
                        />
                        <Skeleton.Image
                            style={{
                                width: "230px",
                                height: "230px",
                                margin: "7px",
                            }}
                            active={true}
                        />
                    </>
                ) : userInfo?.email == "aimzero9303@gmail.com" ? (
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
                        <Image width={230} height={230} src={el.imgUrl} />
                        {userInfo?.email == "aimzero9303@gmail.com" ? (
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
                {isMoreLoading && (
                    <>
                        <Skeleton.Image
                            style={{
                                width: "230px",
                                height: "230px",
                                margin: "7px",
                            }}
                            active={true}
                        />
                        <Skeleton.Image
                            style={{
                                width: "230px",
                                height: "230px",
                                margin: "7px",
                            }}
                            active={true}
                        />
                        <Skeleton.Image
                            style={{
                                width: "230px",
                                height: "230px",
                                margin: "7px",
                            }}
                            active={true}
                        />
                        <Skeleton.Image
                            style={{
                                width: "230px",
                                height: "230px",
                                margin: "7px",
                            }}
                            active={true}
                        />
                        <Skeleton.Image
                            style={{
                                width: "230px",
                                height: "230px",
                                margin: "7px",
                            }}
                            active={true}
                        />
                        <Skeleton.Image
                            style={{
                                width: "230px",
                                height: "230px",
                                margin: "7px",
                            }}
                            active={true}
                        />
                    </>
                )}
            </Photos.BottomSection>
            <Photos.DataPresentText>{dataPresent}</Photos.DataPresentText>
        </Photos.Wrapper>
    );
}
