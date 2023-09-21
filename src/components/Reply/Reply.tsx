import * as Comment from "./Reply.styles";
// recoil
import { useRecoilState } from "recoil";
import { userInfoState } from "../../common/Recoil/userInfoState";
import { loginState } from "../../common/Recoil/loginState";
import dynamic from "next/dynamic";
import ReplyViewer from "./Viewer/ReplyViewer";
import {
    DocumentData,
    collection,
    getDocs,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import { firebaseDb } from "firebase.config";
import { useEffect, useState } from "react";

const ReplyWrite = dynamic(
    () => import("@/components/Reply/Write/ReplyWrite"),
    { ssr: false }
);

export default function Reply(props: { boardData: DocumentData }) {
    const { boardData } = props;
    const [userInfo] = useRecoilState(userInfoState);
    const [loginStatus] = useRecoilState(loginState);
    const name = (userInfo?.email || "").split("@")[0];

    const [comments, setCommentsData] = useState<DocumentData[]>([]);

    // comment list load func
    const fetchComments = async () => {
        const comments = collection(firebaseDb, "comment");
        const result = await getDocs(
            query(
                comments,
                where("id", "==", boardData.id),
                orderBy("timestamp", "desc")
            )
        );
        const fetchData = result.docs.map((el) => el.data());
        setCommentsData(fetchData);
    };

    useEffect(() => {
        fetchComments();
    }, []);

    return (
        <Comment.Wrapper>
            <Comment.Title>Comment..</Comment.Title>
            {/* comment write component */}
            {loginStatus == true && userInfo.email != "" ? (
                <Comment.WriteBox>
                    <Comment.Name>{name}</Comment.Name>
                    <ReplyWrite
                        boardData={boardData}
                        setCommentsData={setCommentsData}
                        fetchComments={fetchComments}
                    />
                </Comment.WriteBox>
            ) : null}
            {/* comment list component */}
            <ReplyViewer
                boardData={boardData}
                comments={comments}
                setCommentsData={setCommentsData}
                fetchComments={fetchComments}
            />
        </Comment.Wrapper>
    );
}
