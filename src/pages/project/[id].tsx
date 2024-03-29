import { firebaseDb } from "firebase.config";
import { DocumentData, deleteDoc, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styled from "@emotion/styled";
import TagView from "@/components/commons/Tag/TagView";
import BoardTitle from "@/components/commons/Board/BoardTitle";
import Image from "next/image";
import Button from "@/components/commons/Button/Button";
import { useAuth } from "@/hooks/commons";

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
        router.push("/project?tag=all");
    };

    useEffect(() => {
        if (router.isReady && id) fetchBoardData(id.toString());
    }, [router]);

    return (
        <StyledProjectDetail>
            <BoardTitle title={boardData?.title} />
            <TagView tags={boardData?.tag} path="project" />
            {useAuth() && (
                <div
                    className="btnWrapper"
                    style={{ display: "flex", justifyContent: "flex-end" }}
                >
                    <Button
                        label="update"
                        backgroundColor="black"
                        primary={false}
                        onClick={onClickUpdate}
                    />
                    <Button
                        label="delete"
                        backgroundColor="black"
                        primary={false}
                        onClick={onClickDelete}
                    />
                </div>
            )}

            {boardData?.thumb && (
                <ThumbnailWrapper>
                    <Image
                        alt="thumbnail"
                        fill
                        sizes="100%, 250px"
                        src={boardData?.thumb}
                        placeholder="empty"
                    />
                </ThumbnailWrapper>
            )}
            <EditorRead initialValue={boardData?.content} />
        </StyledProjectDetail>
    );
}

const StyledProjectDetail = styled.section`
    max-width: 800px;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 60px;

    > h1 {
        margin: 0px;
        margin-bottom: 20px;
        padding-top: 15px;
    }

    .btnWrapper {
        display: flex;
        justify-content: flex-end;

        > button {
            margin-top: 0px;
            margin-bottom: 20px;
        }
    }

    @media (min-width: 1100px) {
        padding-top: 30px;
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
