import PhotoUI from "./Photo.presenter";
// recoil
import { useRecoilState } from "recoil";
import { userInfoState } from "../../common/Recoil/userInfoState";
// firebase
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useEffect, useRef, useState } from "react";

export default function Photo() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [imgFile, setImgFile] = useState("");
  const fileInput = useRef(null);
  const [uploadStep, setUploadStep] = useState(1);

  useEffect(() => {
    console.log("파일", imgFile);
  }, [imgFile]);

  // select fileInput func (onChange)
  const selectFile = (file: Blob) => {
    console.log("imgFile", file);
    const imgUrl = URL.createObjectURL(file);
    console.log("imgUrl", imgUrl);
    setImgFile(imgUrl);
    setUploadStep(2);
  };

  // upload func
  const uploadImg = () => {};
  return (
    <PhotoUI
      userInfo={userInfo}
      fileInput={fileInput}
      selectFile={selectFile}
      uploadImg={uploadImg}
      uploadStep={uploadStep}
    />
  );
}
