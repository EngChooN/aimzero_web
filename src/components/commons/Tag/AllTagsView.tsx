import styled from "@emotion/styled";
import { firebaseDb } from "firebase.config";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import { SetStateAction, useEffect, useState } from "react";

export default function AllTagsView(props: {
    collectionName: string;
    boardData: DocumentData[];
    setFilteredData: React.Dispatch<SetStateAction<DocumentData[]>>;
}) {
    const { collectionName, boardData, setFilteredData } = props;
    const [allTags, setAllTags] = useState<string[]>([]);
    const [selectedTag, setSelectedTag] = useState<string>("");

    const getAllTags = async () => {
        const projectCollectionRef = collection(firebaseDb, collectionName);
        const querySnapshot = await getDocs(projectCollectionRef);
        const tags: string[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const tag = data.tag;
            for (let i = 0; i < tag.length; i++) {
                tags.push(tag[i]);
            }
        });
        const primaryTag = [...new Set(tags)];
        setAllTags(primaryTag);
    };

    useEffect(() => {
        getAllTags();
    }, []);

    useEffect(() => {
        const filteredBoardByTag = () => {
            if (selectedTag) {
                if (selectedTag == "all") {
                    return;
                } else {
                    setFilteredData((prev) =>
                        prev.filter((prev) => prev.tag.includes(selectedTag))
                    );
                }
            }
        };

        setFilteredData(boardData);
        filteredBoardByTag();
    }, [selectedTag]);

    return (
        <StyledAllTagView>
            <Tag
                onClick={() => {
                    setSelectedTag("all");
                    console.log(selectedTag);
                }}
            >
                #all
            </Tag>
            {allTags?.map((el, index) => (
                <Tag
                    key={index}
                    onClick={() => {
                        setSelectedTag(el);
                        console.log(selectedTag);
                    }}
                >
                    #{el}
                </Tag>
            ))}
        </StyledAllTagView>
    );
}

const StyledAllTagView = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid lightgray;
`;

const Tag = styled.div`
    display: flex;
    align-items: center;

    height: 30px;
    background-color: #f3f3f3;
    border-radius: 15px;

    padding-right: 10px;
    padding-left: 10px;
    margin-right: 10px;
    margin-bottom: 20px;

    font-family: serif;
    font-size: 12px;

    cursor: pointer;
`;
