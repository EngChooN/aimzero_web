import * as Visit from "./VisitLog.styles";
import { useRef, useState } from "react";
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
// uuid
import { uuidv4 } from "@firebase/util";
// icon
import { AiFillDelete } from "react-icons/ai";
// antd
import { Skeleton } from "antd";
// react-query
import { useMutation, useQuery, useQueryClient } from "react-query";
// recoil
import { useRecoilState } from "recoil";
import { userInfoState } from "../../common/Recoil/userInfoState";
import { loginState } from "../../common/Recoil/loginState";

export default function VisitLog() {
    const [comment, setComment] = useState("");
    const listRef = useRef<any>(null);
    const [loginStatus] = useRecoilState(loginState);
    const [userInfo] = useRecoilState(userInfoState);
    // Uncaught TypeError: Cannot read property 'split' of undefined (fix code)
    const name = (userInfo?.email || "").split("@")[0];

    // fetch comments func
    async function fetchComments() {
        const visitlog = collection(getFirestore(firebaseApp), "visitlog");
        const result = await getDocs(
            query(visitlog, orderBy("timestamp", "desc"))
        );
        const fetchData = result.docs.map((el) => el.data());
        return fetchData;
    }

    // delete comment func
    const deleteCommentFunc = async (el: any) => {
        await deleteDoc(doc(firebaseDb, "visitlog", el.id)).then(() => {
            try {
                return;
            } catch (err) {
                console.error(err);
                return;
            }
        });
    };

    // create comment func
    const createCommentFunc = async () => {
        if (comment !== "") {
            const id = uuidv4();
            await setDoc(doc(firebaseDb, "visitlog", id), {
                id: id,
                name:
                    loginStatus == true && userInfo.email ? name : "Anonymous",
                comment: comment,
                timestamp: new Date(),
            });
            // fetchComments();
            setComment("");
            listRef.current.scrollTop = 0;
        } else {
            alert("Please enter a comment & password");
        }
    };

    // onClick event handler
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        createComment();
    };

    const queryClient = useQueryClient();

    // fetch
    const { isLoading, data: commentsData } = useQuery(
        "visitlog",
        fetchComments
    );

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

    return (
        <Visit.Wrapper>
            <Visit.ListLog ref={listRef}>
                <>
                    <Skeleton
                        avatar
                        paragraph={{ rows: 2 }}
                        active={true}
                        loading={isLoading}
                    />
                    <Skeleton
                        avatar
                        paragraph={{ rows: 2 }}
                        active={true}
                        loading={isLoading}
                    />
                    <Skeleton
                        avatar
                        paragraph={{ rows: 2 }}
                        active={true}
                        loading={isLoading}
                    />
                </>

                {commentsData?.map((el, index) => (
                    <Visit.CommentWrapper key={index}>
                        <Visit.LogBox>
                            <Visit.Comment>{el.comment}</Visit.Comment>
                            {/* edit button */}
                            <Visit.ProfileWrapper>
                                <Visit.Name>{el.name}</Visit.Name>
                                <div
                                    style={{
                                        fontSize: "12px",
                                        color: "darkgray",
                                    }}
                                >
                                    {
                                        el.timestamp
                                            .toDate()
                                            .toISOString()
                                            .split("T")[0]
                                    }
                                </div>
                                {name == el.name && (
                                    <AiFillDelete
                                        color="darkgray"
                                        style={{
                                            cursor: "pointer",
                                            marginLeft: "10px",
                                        }}
                                        onClick={() => {
                                            deleteComment(el);
                                        }}
                                    />
                                )}
                            </Visit.ProfileWrapper>
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
