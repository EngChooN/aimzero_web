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
import Button from "../commons/Button/Button";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/commons";

export default function ProjectList() {
    const router = useRouter();
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
                                    height: "130px",
                                    objectFit: "cover",
                                }}
                                alt="thumbnail"
                                src={item.thumb ?? "/images/no_img.jpg"}
                            />
                        }
                    >
                        <List.Item.Meta
                            title={<a href={item.href}>{`${item.title}`}</a>}
                            description={item.desc}
                        />
                    </List.Item>
                )}
            />
            {useAuth() && (
                <div className="btnWrapper">
                    <Button
                        label={"write"}
                        backgroundColor={"black"}
                        primary={false}
                        onClick={() => {
                            router.push("/project/create");
                        }}
                    />
                </div>
            )}
        </Wrapper>
    );
}

const Wrapper = styled.section`
    max-width: 1200px;
    width: 100%;
    min-height: calc(100vh - 300px);
    height: 100%;
    padding-bottom: 24px;

    > .btnWrapper {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }

    @media (max-width: 1100px) {
        min-height: calc(100vh - 224px);
    }

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
