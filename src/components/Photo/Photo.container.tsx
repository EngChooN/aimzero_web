import PhotoUI from "./Photo.presenter";
import { useEffect, useRef, useState } from "react";
// recoil
import { useRecoilState } from "recoil";
import { userInfoState } from "../../common/Recoil/userInfoState";
// firebase
import {
  firebaseApp,
  firebaseDb,
  firebaseStorage,
} from "../../../firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
// uuid
import { uuidv4 } from "@firebase/util";

export default function Photo() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  // file input click from custom button
  const fileInput = useRef(null);
  // image file
  const [imageUpload, setImageUpload] = useState<any>("");
  // uploaded image url
  const [image, setImage] = useState("");
  // fetch images url data
  const [images, setImages] = useState([]);
  // image upload step flag
  const [uploadStep, setUploadStep] = useState(1);

  // select fileInput func (onChange)
  const selectFile = (file: Blob) => {
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
    const id = uuidv4();
    await setDoc(doc(firebaseDb, "photo", id), {
      id: id,
      imgUrl: image,
      timestamp: new Date(),
    });
    fetchImages();
    setImageUpload("");
    setImage("");
    setUploadStep(1);
  };

  // fetch images func
  async function fetchImages() {
    const photo = collection(getFirestore(firebaseApp), "photo");
    const result = await getDocs(query(photo, orderBy("timestamp", "desc")));
    const fetchData = result.docs.map((el) => el.data());
    setImages(fetchData);
  }

  // first time fetch
  useEffect(() => {
    fetchImages();
  }, []);

  // delete img{
  const deletePhoto = async (id) => {
    await deleteDoc(doc(firebaseDb, "photo", id));
    fetchImages();
  };

  return (
    <PhotoUI
      userInfo={userInfo}
      fileInput={fileInput}
      selectFile={selectFile}
      uploadStep={uploadStep}
      image={image}
      uploadImgUrl={uploadImgUrl}
      images={images}
      deletePhoto={deletePhoto}
    />
  );
}
