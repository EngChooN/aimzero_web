import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import styled from "@emotion/styled";
// il18
// import { useTranslation, i18n } from "next-i18next";
import commonData from "../../../public/locales/en/common.json";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const DisplayText = styled(Space)`
  font-family: serif;
`;

export default function LocaleButton() {
  // const { t } = useTranslation("common");

  // click func
  // const changeLanguage = (lang: string) => {
  //   i18n.changeLanguage(lang);
  // };

  const items: MenuProps["items"] = [
    {
      label: (
        <a
          rel="noopener noreferrer"
          // onClick={() => {
          //   changeLanguage("en");
          // }}
          style={{ fontFamily: "serif" }}
        >
          🏴󠁧󠁢󠁥󠁮󠁧󠁿 {commonData.languageButton.lang01}
        </a>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <a
          rel="noopener noreferrer"
          // onClick={() => {
          //   changeLanguage("ko");
          // }}
          style={{ fontFamily: "serif" }}
        >
          🇰🇷 {commonData.languageButton.lang02}
        </a>
      ),
      key: "1",
    },
  ];

  return (
    <Wrapper>
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <DisplayText>
            Language
            <DownOutlined />
          </DisplayText>
        </a>
      </Dropdown>
    </Wrapper>
  );
}
