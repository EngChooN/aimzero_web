import { firebaseDb } from "firebase.config";
import { DocumentData, deleteDoc, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styled from "@emotion/styled";
import TagView from "@/components/commons/Tag/TagView";
import BoardTitle from "@/components/commons/Board/BoardTitle";
import Image from "next/image";
// import Button from "@/components/commons/Button/Button";
import Reply from "@/components/Reply/Reply";
import TopBoardInfo from "@/components/commons/Board/TopBoardInfo";

const EditorRead = dynamic(
    async () => await import("@/components/commons/Editor/EditorRead"),
    { ssr: false }
);

export default function BlogDetailPage() {
    const router = useRouter();
    const { id } = router.query;
    const [boardData, setBoardData] = useState<DocumentData | undefined>({});

    // fetch board data function
    const fetchBoardData = async (id: string) => {
        if (id.toString()) {
            const docRef = doc(firebaseDb, "blog", id.toString());
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
            pathname: "/blog/create",
            query: { fetchBoardId: boardData?.id },
        });
    };

    // delete function
    const onClickDelete = () => {
        if (id) {
            deleteDoc(doc(firebaseDb, "blog", id.toString()));
        }
        router.push("/blog?tag=all");
    };

    useEffect(() => {
        if (router.isReady && id) fetchBoardData(id.toString());
    }, [router]);

    return (
        <StyledBlogDetail>
            <BoardTitle title={boardData?.title} />
            <TopBoardInfo
                writer={boardData?.name}
                timestamp={
                    boardData?.timestamp?.toDate().toISOString().split("T")[0]
                }
                updateFunc={() => {
                    onClickUpdate();
                }}
                deleteFunc={() => {
                    onClickDelete();
                }}
            />
            {boardData?.tag?.length > 0 ? (
                <TagView tags={boardData?.tag} path="blog" />
            ) : (
                <p
                    style={{
                        fontSize: "13px",
                        color: "lightgrey",
                        fontFamily: "serif",
                    }}
                >
                    nothing tags..
                </p>
            )}
            {/* <div
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
            </div> */}
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
            {boardData && boardData.id !== undefined && (
                <Reply boardData={boardData} />
            )}
        </StyledBlogDetail>
    );
}

const StyledBlogDetail = styled.section`
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
        border: 1px solid darkgray;
        border-radius: 10px;
    }
`;
