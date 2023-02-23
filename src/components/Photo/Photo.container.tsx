import PhotoUI from "./Photo.presenter";
import { useEffect, useRef, useState } from "react";
// recoil
import { useRecoilState } from "recoil";
import { userInfoState } from "../../common/Recoil/userInfoState";
import { firebaseDb, firebaseStorage } from "../../../firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

export default function Photo() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const fileInput = useRef(null);
  // image file
  const [imageUpload, setImageUpload] = useState<any>("");
  // uploaded image url
  const [image, setImage] = useState("");
  const [uploadStep, setUploadStep] = useState(1);

  // select fileInput func (onChange)
  const selectFile = (file) => {
    console.log(file);
    setImageUpload(file);
    setUploadStep(2);
  };

  // if change imageUpload value, func start
  useEffect(() => {
    const imageRef = ref(firebaseStorage, `photo/${imageUpload.name}`); // storage directory (path, file name)
    if (!imageUpload) return;
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImage(url);
        console.log(url);
      });
    });
  }, [imageUpload]);

  // image url add firebase db func
  const uploadImgUrl = async () => {
    await addDoc(collection(firebaseDb, "photo"), {
      imgUrl: image,
      timestamp: new Date(),
    });
    // fetchComments();
    setImageUpload("");
    setImage("");
    setUploadStep(1);
  };

  return (
    <PhotoUI
      userInfo={userInfo}
      fileInput={fileInput}
      selectFile={selectFile}
      uploadStep={uploadStep}
      image={image}
      uploadImgUrl={uploadImgUrl}
    />
  );
}
