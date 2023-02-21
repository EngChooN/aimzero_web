import PhotoUI from "./Photo.presenter";
import { useEffect, useRef, useState } from "react";
// recoil
import { useRecoilState } from "recoil";
import { userInfoState } from "../../common/Recoil/userInfoState";

export default function Photo() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const fileInput = useRef(null);
  const [uploadStep, setUploadStep] = useState(1);

  // select fileInput func (onChange)
  const selectFile = (file: Blob) => {
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
