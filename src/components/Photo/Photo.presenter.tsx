import * as Photos from "./Photo.styles";
// antd
import { Image } from "antd";
import { Skeleton } from "antd";
// icon
import { AiOutlinePlus, AiFillDelete } from "react-icons/ai";
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

    let width = "230px";

    if (windowWidth <= 600) {
        width = "200px";
    }
    if (windowWidth <= 460) {
        width = "160px";
    }

    const skeleton = () => {
        const skeletonUi = [];
        for (let i = 0; i < 7; i++) {
            skeletonUi.push(
                <Skeleton.Image
                    key={i}
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
                            style={{ objectFit: "cover", borderRadius: "4px" }}
                            // 데이터를 불러오고, 이미지가 완전히 로드되 기 전에 표시
                            placeholder={
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: `${width}`,
                                        height: `${width}`,
                                        backgroundColor: "grey",
                                        borderRadius: "4px",
                                    }}
                                >
                                    <p style={{ color: "white" }}>wait..</p>
                                </div>
                            }
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
