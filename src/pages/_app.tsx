import "../styles/globals.css";
import Layout from "../components/Layout/Layout";
import { appWithTranslation } from "next-i18next";
// import LocaleButton from "../components/LocaleButton/LocaleButton";
// recoil
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Layout>
        {/* <LocaleButton /> */}
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}

export default appWithTranslation(MyApp);
