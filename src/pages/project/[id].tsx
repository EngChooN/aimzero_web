import { firebaseDb } from "firebase.config";
import { DocumentData, deleteDoc, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styled from "@emotion/styled";
import TagView from "@/components/commons/Tag/TagView";
import TopBoardInfo from "@/components/commons/Board/TopBoardInfo";
import ProjectList from "@/components/Project/ProjectList";
import BoardTitle from "@/components/commons/Board/BoardTitle";
import Image from "next/image";

const EditorRead = dynamic(
    async () => await import("@/components/commons/Editor/EditorRead"),
    { ssr: false }
);

export default function ProjectDetailPage() {
    const router = useRouter();
    const { id } = router.query;
    const [boardData, setBoardData] = useState<DocumentData | undefined>({});

    // fetch board data function
    const fetchBoardData = async (id: string) => {
        if (id.toString()) {
            const docRef = doc(firebaseDb, "project", id.toString());
            try {
                const docSnap = (await getDoc(docRef)).data();
                console.log("docSnap", docSnap);
                setBoardData(docSnap);
            } catch (error) {
                console.error(error);
            }
        }
    };

    // update function
    const onClickUpdate = () => {
        router.push({
            pathname: "/project/create",
            query: { fetchBoardId: boardData?.id },
        });
    };

    // delete function
    const onClickDelete = () => {
        if (id) {
            deleteDoc(doc(firebaseDb, "project", id.toString()));
        }
        router.push("/project");
    };

    useEffect(() => {
        if (router.isReady && id) fetchBoardData(id.toString());
    }, [router]);

    return (
        <StyledProjectDetail>
            <BoardTitle title={boardData?.title} />
            <TopBoardInfo
                writer={boardData?.name}
                timestamp={
                    boardData?.timestamp?.toDate().toISOString().split("T")[0]
                }
                updateFunc={onClickUpdate}
                deleteFunc={onClickDelete}
            />
            <TagView tags={boardData?.tag} />
            {boardData?.thumb !== null && (
                <ThumbnailWrapper>
                    <Image alt="thumbnail" fill src={boardData?.thumb} />
                </ThumbnailWrapper>
            )}

            <EditorRead initialValue={boardData?.content} />
            <BoardTitle title={"another project.."} />
            <ProjectList />
        </StyledProjectDetail>
    );
}

const StyledProjectDetail = styled.section`
    max-width: 800px;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;

    > div {
        /* height: 100px; */
    }
`;

const ThumbnailWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: fit-content;

    > img {
        position: static !important;
        max-width: 600px !important;
        width: 100% !important;
        height: auto !important;
        margin: 20px 0 20px 0;
        border: 4px solid darkgray;
        border-radius: 10px;
    }
`;
