import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import styled from "@emotion/styled";
// il18
import { useTranslation } from "next-i18next";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const DisplayText = styled(Space)`
  font-family: serif;
`;

export default function LocaleButton() {
  const { t } = useTranslation("common");

  // click func
  const changeLanguageEn = () => {
    console.log("en setting");
    localStorage.setItem("lang", "en");
  };
  const changeLanguageKo = () => {
    console.log("ko setting");
    localStorage.setItem("lang", "ko");
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={changeLanguageEn}
          style={{ fontFamily: "serif" }}
        >
          {t("languageButton.lang01")}
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
          target="_blank"
          rel="noopener noreferrer"
          onClick={changeLanguageKo}
          style={{ fontFamily: "serif" }}
        >
          {t("languageButton.lang02")}
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
