import { firebaseDb } from "firebase.config";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styled from "@emotion/styled";

const EditorRead = dynamic(
    async () => await import("@/components/commons/EditorRead"),
    { ssr: false }
);

export default function ProjectDetailPage() {
    const router = useRouter();
    const { id } = router.query;
    const [boardData, setBoardData] = useState<DocumentData | undefined>({});

    // fetch
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

    useEffect(() => {
        if (router.isReady && id) fetchBoardData(id.toString());
    }, [router]);

    return (
        <StyledProjectDetail>
            <EditorRead initialValue={boardData?.content} />
        </StyledProjectDetail>
    );
}

const StyledProjectDetail = styled.section`
    width: 100%;
`;
