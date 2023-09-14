import styled from "@emotion/styled";
// atnd
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import Board from "./Board/Board";

export default function Main() {
    const onChange = (key: string) => {
        console.log(key);
    };

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
        // {
        //     key: "3",
        //     label: `News`,
        //     children: <Board menu={"news"} />,
        // },
    ];

    return (
        <Wrapper>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </Wrapper>
    );
}

export const Wrapper = styled.section`
    max-width: 1200px;
    width: 100%;
    height: fit-content;
`;
