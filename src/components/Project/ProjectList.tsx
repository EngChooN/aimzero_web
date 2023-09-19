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
import ProjectBox, { StyledProjectBox } from "./ProjectBox";
import { Skeleton } from "antd";

export default function ProjectList() {
    const router = useRouter();
    const [boardData, setBoardData] = useState<DocumentData[]>([]);
    const [filteredData, setFilteredData] = useState<DocumentData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchBoards = async () => {
        const board = collection(getFirestore(firebaseApp), "project");
        const result = await getDocs(
            query(board, orderBy("timestamp", "desc"))
        );
        const fetchData = result.docs.map((el) => el.data());
        setBoardData(fetchData);
        setFilteredData(fetchData);
        setIsLoading(false);
    };

    const skeletonRender = () => {
        const skeletonUi: JSX.Element[] = [];
        Array(4)
            .fill(0)
            .forEach((el, index) => {
                skeletonUi.push(
                    <StyledProjectBox
                        key={index}
                        style={{
                            padding: "10px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Skeleton active={isLoading} />
                        <Skeleton active={isLoading} />
                        <Skeleton active={isLoading} />
                    </StyledProjectBox>
                );
            });
        return skeletonUi;
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
            {useAuth() && (
                <Button
                    label="Create project description post"
                    backgroundColor="black"
                    primary={false}
                />
            )}
            <div>
                {isLoading && <>{skeletonRender()}</>}
                {!isLoading &&
                    filteredData.map((el, index) => (
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
        grid-template-columns: repeat(3, 400px);
        gap: 30px;
        justify-items: center;
        padding-top: 50px;

        @media (max-width: 1260px) {
            grid-template-columns: repeat(2, 400px);
        }

        @media (max-width: 840px) {
            grid-template-columns: repeat(1, 400px);
        }

        @media (max-width: 450px) {
            grid-template-columns: repeat(1, 100%);
            margin-left: 10px;
            margin-right: 10px;
        }
    }

    > button {
        margin: 0;
        margin-top: 30px;
    }

    @media (max-width: 1100px) {
        min-height: calc(100vh - 224px);
    }
`;
