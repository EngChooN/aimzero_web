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
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
} from "firebase/firestore";
// uuid
import { uuidv4 } from "@firebase/util";
// bottom scroll listener
import { useBottomScrollListener } from "react-bottom-scroll-listener";
// lodash
import _ from "lodash";

export default function Photo() {
  // first loading show skeleton flag
  const [isLoading, setIsLoading] = useState(true);
  // more fetch loading show skeleton flag
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  // more data present text
  const [dataPresent, setDataPresent] = useState(
    "If you scroll, the data will be loaded."
  );

  const [userInfo] = useRecoilState(userInfoState);
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
    const result = await getDocs(
      query(photo, orderBy("timestamp", "desc"), limit(10))
    );

    const fetchData = result.docs.map((el) => el.data());
    setImages(fetchData);
    setIsLoading(false);
  }

  // scroll bottom callback func (fetch more data #infinite scroll)
  useBottomScrollListener(() => {
    const loadData = _.debounce(async () => {
      if (dataPresent == "If you scroll, the data will be loaded.") {
        console.log("bottom! load new  data..");
        setIsMoreLoading(true);
        const lastImg = images[images.length - 1];
        const photo = collection(getFirestore(firebaseApp), "photo");
        const result = await getDocs(
          query(
            photo,
            orderBy("timestamp", "desc"),
            limit(6),
            startAfter(lastImg.timestamp)
          )
        );

        const fetchData = result.docs.map((el) => el.data());

        if (fetchData.length === 0) {
          setIsMoreLoading(false);
          setDataPresent("There is no more data.");
          console.log("All images are loaded.");
          return;
        }

        setImages([...images, ...fetchData]);
        console.log(images);
        setIsMoreLoading(false);
      }
    }, 500);

    loadData();
  });

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
      isLoading={isLoading}
      isMoreLoading={isMoreLoading}
      dataPresent={dataPresent}
    />
  );
}
