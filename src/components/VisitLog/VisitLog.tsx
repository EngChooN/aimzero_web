import * as Visit from "./VisitLog.styles";
import { useState } from "react";
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
  const name = userInfo.email.split("@")[0];
  const router = useRouter();

  const submitComment = async () => {
    if (loginStatus == true && userInfo.email != "") {
      await addDoc(collection(firebaseDb, "visitlog"), {
        name: name,
        comment: comment,
      });
    } else {
      router.push("/login");
    }
  };

  const fetchComments = async () => {
    const querySnapshot = await getDocs(collection(firebaseDb, "visitlog"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  fetchComments();
  return (
    <Visit.Wrapper>
      <Visit.Title>Visit Log</Visit.Title>
      <Visit.ListLog>
        <Visit.ProfileWrapper>
          <Visit.NoneProfile src={"images/profile.png"} />
          <Visit.Name>visitor01</Visit.Name>
        </Visit.ProfileWrapper>
        <Visit.LogBox>
          <Visit.Comment>Good site!</Visit.Comment>
        </Visit.LogBox>
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
