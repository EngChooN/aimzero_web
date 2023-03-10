import * as Home from "./Main.styles";
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
      label: `Blog`,
      children: <Board menu={"blog"} />,
    },
    {
      key: "2",
      label: `Q&A`,
      children: <Board menu={"qna"} />,
    },
    {
      key: "3",
      label: `News`,
      children: <Board menu={"news"} />,
    },
  ];

  return (
    <Home.Wrapper>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </Home.Wrapper>
  );
}
