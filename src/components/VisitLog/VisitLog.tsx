import * as Visit from "./VisitLog.styles";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
// firebase
import {
  collection,
  getFirestore,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { firebaseApp, firebaseDb } from "../../../firebase.config";
// recoil
import { useRecoilState } from "recoil";
import { userInfoState } from "../../common/Recoil/userInfoState";
import { loginState } from "../../common/Recoil/loginState";
// uuid
import { uuidv4 } from "@firebase/util";
// icon
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

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
      if (comment != "") {
        const id = uuidv4();
        await setDoc(doc(firebaseDb, "visitlog", id), {
          id: id,
          name: name,
          comment: comment,
          timestamp: new Date(),
        });
        fetchComments();
        setComment("");
        listRef.current.scrollTop = 0;
      } else {
        alert("Please enter a comment");
      }
    } else {
      router.push("/login");
    }
  };

  // delete comment func
  const deleteComment = async (id) => {
    await deleteDoc(doc(firebaseDb, "visitlog", id)).then(() => {
      try {
        console.log("done");
      } catch (err) {
        console.log(err);
      }
    });
    fetchComments();
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
              {/* <Visit.NoneProfile src={"images/profile.png"} /> */}
              <Visit.Name>{el.name}</Visit.Name>
              <div
                style={{
                  fontFamily: "serif",
                  fontSize: "12px",
                  color: "darkgray",
                }}
              >
                {el.timestamp.toDate().toISOString().split("T")[0]}
              </div>
            </Visit.ProfileWrapper>
            <Visit.LogBox>
              <Visit.Comment>{el.comment}</Visit.Comment>
              {/* edit option buttons */}
              {name == el.name && (
                <Visit.BtnWrapper>
                  {/* <AiFillEdit color="darkgray" style={{ cursor: "pointer" }} /> */}
                  <AiFillDelete
                    color="darkgray"
                    style={{ cursor: "pointer", marginLeft: "10px" }}
                    onClick={() => {
                      deleteComment(el.id);
                    }}
                  />
                </Visit.BtnWrapper>
              )}
            </Visit.LogBox>
          </Visit.CommentWrapper>
        ))}
      </Visit.ListLog>
      <Visit.WriteBox>
        <Visit.CommentInput
          onChange={(e) => {
            setComment(e.target.value);
          }}
          placeholder="typing your visit log"
          value={comment}
        />
        <Visit.SubmitBtn onClick={submitComment}>submit</Visit.SubmitBtn>
      </Visit.WriteBox>
    </Visit.Wrapper>
  );
}
