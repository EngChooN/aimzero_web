import * as Visit from "./VisitLog.styles";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// firebase
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { firebaseApp, firebaseDb } from "../../../firebase.config";
// recoil
import { useRecoilState } from "recoil";
import { userInfoState } from "../../common/Recoil/userInfoState";
import { loginState } from "../../common/Recoil/loginState";

export default function VisitLog() {
  const [comment, setComment] = useState("");
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [loginStatus, setLoginStatus] = useRecoilState(loginState);
  const [commentsData, setCommentsData] = useState([]);
  const name = userInfo?.email.split("@")[0];
  const router = useRouter();

  const submitComment = async () => {
    if (loginStatus == true && userInfo.email != "") {
      await addDoc(collection(firebaseDb, "visitlog"), {
        name: name,
        comment: comment,
      });
      fetchComments();
    } else {
      router.push("/login");
    }
  };

  const fetchComments = async () => {
    const querySnapshot = await getDocs(collection(firebaseDb, "visitlog"));
    let fetchData = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      fetchData = [...fetchData, doc.data()];
    });
    setCommentsData(fetchData);
  };

  useEffect(() => {
    const fetching = async () => {
      await fetchComments();
    };

    fetching();
  }, []);

  return (
    <Visit.Wrapper>
      <Visit.Title>Visit Log</Visit.Title>
      <Visit.ListLog>
        {commentsData.map((el, index) => (
          <Visit.CommentWrapper>
            <Visit.ProfileWrapper>
              <Visit.NoneProfile src={"images/profile.png"} />
              <Visit.Name>{el.name}</Visit.Name>
            </Visit.ProfileWrapper>
            <Visit.LogBox>
              <Visit.Comment>{el.comment}</Visit.Comment>
            </Visit.LogBox>
          </Visit.CommentWrapper>
        ))}
      </Visit.ListLog>
      <Visit.WriteBox>
        <Visit.CommentInput
          onChange={(e) => {
            setComment(e.target.value);
          }}
          placeholder="Write your comment"
        />
        <Visit.SubmitBtn onClick={submitComment}>submit</Visit.SubmitBtn>
      </Visit.WriteBox>
    </Visit.Wrapper>
  );
}
