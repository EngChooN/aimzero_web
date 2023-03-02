import * as Visit from "./VisitLog.styles";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
// firebase
import {
  addDoc,
  collection,
  getFirestore,
  getDocs,
  query,
  orderBy,
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
  const router = useRouter();
  const listRef = useRef(null);
  // Uncaught TypeError: Cannot read property 'split' of undefined (fix code)
  const name = (userInfo?.email || "").split("@")[0];

  // create comment func
  const submitComment = async () => {
    if (loginStatus == true && userInfo.email != "") {
      await addDoc(collection(firebaseDb, "visitlog"), {
        name: name,
        comment: comment,
        timestamp: new Date(),
      });
      fetchComments();
      setComment("");
      listRef.current.scrollTop = 0;
    } else {
      router.push("/login");
    }
  };

  // fetch comments func
  async function fetchComments() {
    const visitlog = collection(getFirestore(firebaseApp), "visitlog");
    const result = await getDocs(query(visitlog, orderBy("timestamp", "desc")));
    const fetchData = result.docs.map((el) => el.data());
    setCommentsData(fetchData);
  }

  // first time fetch
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <Visit.Wrapper>
      {/* <Visit.Title>Visit Log</Visit.Title> */}
      <Visit.ListLog ref={listRef}>
        {commentsData.map((el, index) => (
          <Visit.CommentWrapper key={index}>
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
          value={comment}
        />
        <Visit.SubmitBtn onClick={submitComment}>submit</Visit.SubmitBtn>
      </Visit.WriteBox>
    </Visit.Wrapper>
  );
}
