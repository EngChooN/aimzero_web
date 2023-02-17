import PhotoUI from "./Photo.presenter";
// recoil
import { useRecoilState } from "recoil";
import { userInfoState } from "../../common/Recoil/userInfoState";
// firebase
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useRef, useState } from "react";

export default function Photo() {
  const [imgFile, setImgFile] = useState("");
  const fileInput = useRef(null);

  // select fileInput func
  const selectFile = () => {
    setImgFile(fileInput.current.files[0]);
    console.log(imgFile);
  };

  // upload func
  const uploadImg = () => {
    let image = fileInput.current.files[0]; //이미지 가져왔으니까 참조를 만들어라 !
    console.log(fileInput.current.files[0], "upload file data");
    const storage = getStorage();
    const storageRef = ref(storage, `images/${image.name}`);
    console.log("나는스토리지", storage, "나는 스토리지 Ref", storageRef);

    uploadBytes(storageRef, image).then((snapshot) => {
      console.log(snapshot, "이건 스냅샷");
    });
  };
  const [userInfo, serUserInfo] = useRecoilState(userInfoState);
  console.log(userInfo);
  return (
    <PhotoUI
      userInfo={userInfo}
      fileInput={fileInput}
      selectFile={selectFile}
      uploadImg={uploadImg}
    />
  );
}
