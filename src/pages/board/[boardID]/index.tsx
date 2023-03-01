import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
// firebase
import { collection, getDocs, query, where } from "firebase/firestore";
import { firebaseDb } from "../../../../firebase.config";

const BoardViewer = dynamic(
  () => import("../../../components/Main/Board/BoardViewer/BoardViewer"),
  { ssr: false }
);

export default function BoardDetailPage() {
  const router = useRouter();
  // get url parameter
  const urlParams = router.query.boardID;
  const [boardData, setBoardData] = useState({});

  // fetch board detail data func
  async function fetchBoardDetail(condition) {
    const querySnapshot = await getDocs(condition);
    querySnapshot.forEach((doc) => {
      setBoardData(doc.data());
    });
  }

  useEffect(() => {
    if (urlParams === undefined) return;

    // parameter => clicked board type ...ex) blog, qna, news
    const boardType = (urlParams as string).split("=")[0];
    // parameter => clicked board id
    const boardId = (urlParams as string).split("=")[1];

    // search board detail data condition
    if (boardType !== "" && boardId !== "") {
      const condition = query(
        collection(firebaseDb, boardType),
        where("id", "==", boardId)
      );

      fetchBoardDetail(condition);
    }
  }, [router]);

  return (
    <div>
      <BoardViewer boardData={boardData} />
    </div>
  );
}
