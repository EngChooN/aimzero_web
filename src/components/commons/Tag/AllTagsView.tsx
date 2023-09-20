import styled from "@emotion/styled";
import { Skeleton } from "antd";
import { firebaseDb } from "firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AllTagsView(props: {
    collectionName: string;
    urlTag: string | string[] | undefined;
}) {
    const { collectionName, urlTag } = props;
    const [allTags, setAllTags] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

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
        setIsLoading(false);
    };

    const skeletonRender = () => {
        const skeletonUi: JSX.Element[] = [];
        Array(20)
            .fill(0)
            .forEach((el, index) => {
                skeletonUi.push(
                    <Skeleton.Button
                        key={index}
                        style={{ marginRight: "10px", marginBottom: "20px" }}
                        active={isLoading}
                        size={"default"}
                        shape={"round"}
                        block={false}
                    />
                );
            });
        return skeletonUi;
    };

    useEffect(() => {
        getAllTags();
    }, []);

    return (
        <StyledAllTagView>
            {isLoading && <>{skeletonRender()}</>}
            {!isLoading && (
                <>
                    <Tag
                        onClick={() => {
                            router.push("/project?tag=all");
                        }}
                        isActive={urlTag === "all"}
                    >
                        #all
                    </Tag>
                    {allTags?.map((el, index) => (
                        <Tag
                            key={index}
                            onClick={() => {
                                router.push(`/project?tag=${el}`);
                            }}
                            isActive={urlTag === el}
                        >
                            #{el}
                        </Tag>
                    ))}
                </>
            )}
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
    border-bottom: 1px solid lightgray;

    @media (max-width: 840px) {
        overflow-x: scroll;
        flex-wrap: nowrap;
        justify-content: flex-start;
        width: 100%;
    }
`;

const Tag = styled.div<{ isActive: boolean }>`
    display: flex;
    align-items: center;

    height: 30px;
    background-color: ${(props) => (props.isActive ? "#d1d1d1" : "#f3f3f3")};
    border-radius: 15px;

    padding-right: 10px;
    padding-left: 10px;
    margin-right: 10px;
    margin-bottom: 20px;

    font-family: serif;
    font-size: 12px;

    transition: all 0.3s ease;
    cursor: pointer;

    :hover {
        background-color: #d1d1d1;
    }

    @media (max-width: 840px) {
        min-width: fit-content;
    }
`;
