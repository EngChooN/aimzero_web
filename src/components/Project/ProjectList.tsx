import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
    DocumentData,
    collection,
    getDocs,
    getFirestore,
    orderBy,
    query,
} from "firebase/firestore";
import { firebaseApp } from "firebase.config";
import Button from "../commons/Button/Button";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/commons";
import AllTagView from "../commons/Tag/AllTagsView";
import ProjectBox from "./ProjectBox";

export default function ProjectList() {
    const router = useRouter();
    const [boardData, setBoardData] = useState<DocumentData[]>([]);
    const [filteredData, setFilteredData] = useState<DocumentData[]>([]);

    const fetchBoards = async () => {
        const board = collection(getFirestore(firebaseApp), "project");
        const result = await getDocs(
            query(board, orderBy("timestamp", "desc"))
        );
        const fetchData = result.docs.map((el) => el.data());
        setBoardData(fetchData);
        setFilteredData(fetchData);
    };

    useEffect(() => {
        fetchBoards();
    }, []);

    return (
        <Wrapper>
            <AllTagView
                collectionName="project"
                boardData={boardData}
                setFilteredData={setFilteredData}
            />
            <div>
                {filteredData.map((el, index) => (
                    <ProjectBox key={index} boardData={el} />
                ))}
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;

    max-width: 1200px;
    width: 100%;
    height: fit-content;
    padding-top: 30px;
    padding-bottom: 50px;

    > div {
        display: grid;
        grid-template-columns: repeat(2, 400px);
        gap: 30px;
        justify-items: center;
        padding-top: 50px;

        @media (max-width: 900px) {
            grid-template-columns: repeat(1, 400px);
        }

        @media (max-width: 450px) {
            display: flex;
            flex-direction: column;
            margin-left: 10px;
            margin-right: 10px;
        }
    }

    @media (max-width: 1100px) {
        min-height: calc(100vh - 224px);
    }
`;
