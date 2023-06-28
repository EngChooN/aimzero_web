import React, { useEffect, useState } from "react";
import { List } from "antd";
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

export default function ProjectList() {
    const [boardData, setBoardData] = useState<DocumentData[]>([]);

    const fetchBoards = async () => {
        const board = collection(getFirestore(firebaseApp), "project");
        const result = await getDocs(
            query(board, orderBy("timestamp", "desc"))
        );
        const fetchData = result.docs.map((el) => el.data());
        setBoardData(fetchData);
        console.log(boardData);
    };

    const data = Array.from({ length: boardData?.length ?? 0 }).map(
        (_, index) => ({
            href: `/project/${boardData[index]?.id}`,
            title: boardData[index]?.title,
            desc: boardData[index]?.desc,
            timestamp: boardData[index]?.timestamp,
            content: boardData[index]?.content,
            thumb: boardData[index]?.thumb,
        })
    );

    useEffect(() => {
        fetchBoards();
    }, []);

    return (
        <Wrapper>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 4,
                }}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item
                        key={item.title}
                        extra={
                            <img
                                style={{
                                    width: "220px",
                                    height: "150px",
                                    objectFit: "cover",
                                }}
                                alt="thumbnail"
                                src={item.thumb ?? "/images/no_img.jpg"}
                            />
                        }
                    >
                        <List.Item.Meta
                            title={
                                <a href={item.href}>{`${item.title} ${
                                    item.timestamp
                                        .toDate()
                                        .toISOString()
                                        .split("T")[0]
                                }`}</a>
                            }
                            description={item.desc}
                        />
                        <p>{item.content.slice(0, 150)}...</p>
                    </List.Item>
                )}
            />
        </Wrapper>
    );
}

const Wrapper = styled.section`
    max-width: 1200px;
    width: 100%;
    padding-bottom: 24px;

    @media (max-width: 680px) {
        > :where(.css-diro6f).ant-list-lg .ant-list-item {
            padding: 16px 24px;
            display: flex;
            flex-direction: column;
        }

        > :where(.css-diro6f).ant-list-vertical
            .ant-list-item
            .ant-list-item-extra {
            margin: 0px;
        }

        > :where(.css-diro6f).ant-list img {
            width: 100%;
            padding-top: 10px;
        }
    }
`;
