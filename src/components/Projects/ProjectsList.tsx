import React from "react";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, List, Space } from "antd";
import styled from "@emotion/styled";

const Wrapper = styled.section`
  padding: 50px;
`;

export default function ProjectsList() {
  const data = Array.from({ length: 23 }).map((_, i) => ({
    href: "https://ant.design",
    title: `ant design part ${i}`,
    avatar: `https://joesch.moe/api/v1/random?key=${i}`,
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  }));

  return (
    <Wrapper>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    </Wrapper>
  );
}
