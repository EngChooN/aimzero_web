import styled from "@emotion/styled";
// atnd
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import Board from "./Board/Board";

export default function Main() {
    const items: TabsProps["items"] = [
        {
            key: "1",
            label: `Free`,
            children: <Board menu={"free"} />,
        },
        {
            key: "2",
            label: `Q&A`,
            children: <Board menu={"qna"} />,
        },
        {
            key: "3",
            label: `Feedback`,
            children: <Board menu={"feedback"} />,
        },
    ];

    return (
        <Wrapper>
            <Tabs defaultActiveKey="1" items={items} />
        </Wrapper>
    );
}

export const Wrapper = styled.section`
    max-width: 1200px;
    width: 100%;
    height: fit-content;
`;
