import { css } from "@emotion/react";

const reset = css`
    html,
    body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    a,
    div,
    p,
    section,
    article,
    h1,
    h2,
    h3,
    span {
        color: inherit;
        text-decoration: none;
    }

    * {
        box-sizing: border-box;
    }

    /* 로고 폰트 */
    @font-face {
        font-family: Pacifico;
        src: url("/fonts/Pacifico-Regular.ttf");
        font-display: auto;
    }

    /* 헤더, 푸터 폰트 */
    @font-face {
        font-family: Garamond;
        src: url("/fonts/Garamond Becker No2 Caps Med Regular.ttf");
        font-display: auto;
    }

    /* 본문 타이틀 폰트 */
    @font-face {
        font-family: AbrilFatface;
        src: url("/fonts/AbrilFatface-Regular.ttf");
        font-display: auto;
    }

    /* 본문 하이라이트 폰트 */
    @font-face {
        font-family: MarckScript;
        src: url("/fonts/MarckScript-Regular.ttf");
        font-display: auto;
    }

    /* antd custom */
    .ant-pagination .ant-pagination-item-active a {
        color: black;
    }

    /* a {
        color: black;
    } */

    .ant-pagination .ant-pagination-item-active {
        border-color: black;
    }

    .ant-pagination .ant-pagination-item-active:hover {
        border-color: black;
    }

    .ant-pagination .ant-pagination-item-active:hover a {
        color: black;
    }

    .ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
        color: black;
    }

    .ant-tabs .ant-tabs-tab {
        color: darkgray;
    }

    .ant-tabs .ant-tabs-tab:hover {
        color: black;
    }

    .ant-tabs .ant-tabs-ink-bar {
        background: black;
    }

    .ant-tabs-nav-list {
        margin-left: 22px;
    }

    /* react-pdf custom */
    .react-pdf__Page__textContent {
        display: none;
    }

    .react-pdf__Page__annotations {
        display: none;
    }

    .react-pdf__Page__canvas {
        margin: 0 auto;
        width: 70% !important;
        height: 100% !important;
    }

    .toastui-editor-defaultUI {
        border-radius: 0px;
    }

    .ant-list-item-extra {
        display: flex;
        justify-content: center;
    }

    .ant-tabs-top > .ant-tabs-nav,
    .ant-tabs-bottom > .ant-tabs-nav,
    .ant-tabs-top > div > .ant-tabs-nav,
    .ant-tabs-bottom > div > .ant-tabs-nav {
        margin: 0px;
    }

    .ant-image .ant-image-mask:hover {
        border-radius: 4px;
    }
`;

export default reset;
