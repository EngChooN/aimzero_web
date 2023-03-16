import * as Visit from "./VisitLog.styles";
import { useRef, useState } from "react";
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
import { AiFillDelete } from "react-icons/ai";
// antd
import { Skeleton } from "antd";
// react-query
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function VisitLog() {
  // fetch comments func
  async function fetchComments() {
    const visitlog = collection(getFirestore(firebaseApp), "visitlog");
    const result = await getDocs(query(visitlog, orderBy("timestamp", "desc")));
    const fetchData = result.docs.map((el) => el.data());
    return fetchData;
  }

  // delete comment func
  const deleteCommentFunc = async (id) => {
    await deleteDoc(doc(firebaseDb, "visitlog", id)).then(() => {
      try {
        console.log("done");
        return;
      } catch (err) {
        console.log(err);
        return;
      }
    });
  };

  // create comment func
  const createCommentFunc = async () => {
    if (loginStatus == true && userInfo.email != "") {
      if (comment != "") {
        const id = uuidv4();
        await setDoc(doc(firebaseDb, "visitlog", id), {
          id: id,
          name: name,
          comment: comment,
          timestamp: new Date(),
        });
        // fetchComments();
        setComment("");
        listRef.current.scrollTop = 0;
      } else {
        alert("Please enter a comment");
      }
    } else {
      router.push("/login");
    }
  };

  // onClick event handler
  const handleSubmit = (e) => {
    e.preventDefault();
    createComment();
  };

  const queryClient = useQueryClient();

  // fetch
  const { isLoading, data: commentsData } = useQuery("visitlog", fetchComments);
  // delete
  const { mutate: deleteComment } = useMutation(deleteCommentFunc, {
    onSuccess: () => {
      queryClient.invalidateQueries("visitlog");
    },
  });
  // create
  const { mutate: createComment } = useMutation(createCommentFunc, {
    onSuccess: () => {
      queryClient.invalidateQueries("visitlog");
    },
  });

  const [comment, setComment] = useState("");
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [loginStatus, setLoginStatus] = useRecoilState(loginState);
  const router = useRouter();
  const listRef = useRef(null);
  // Uncaught TypeError: Cannot read property 'split' of undefined (fix code)
  const name = (userInfo?.email || "").split("@")[0];

  return (
    <Visit.Wrapper>
      <Visit.ListLog ref={listRef}>
        <>
          <Skeleton
            avatar
            paragraph={{ rows: 2 }}
            active={true}
            loading={isLoading}
            style={{ padding: "30px" }}
          />
          <Skeleton
            avatar
            paragraph={{ rows: 2 }}
            active={true}
            loading={isLoading}
            style={{ padding: "30px" }}
          />
          <Skeleton
            avatar
            paragraph={{ rows: 2 }}
            active={true}
            loading={isLoading}
            style={{ padding: "30px" }}
          />
        </>

        {commentsData?.map((el, index) => (
          <Visit.CommentWrapper key={index}>
            <Visit.ProfileWrapper>
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
        <Visit.SubmitBtn onClick={handleSubmit}>submit</Visit.SubmitBtn>
      </Visit.WriteBox>
    </Visit.Wrapper>
  );
}
