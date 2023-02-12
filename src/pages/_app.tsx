import "../../styles/globals.css";
import Layout from "../components/Layout/Layout";
import { appWithTranslation } from "next-i18next";
import LocaleButton from "../components/LocaleButton/LocaleButton";
// recoil
import { RecoilRoot } from "recoil";

import { PortfolioProvider } from "../../src/common/context/context";
import { prefix } from "../../src/common/config/config";

function MyApp({ Component, pageProps }) {
  return (
    <PortfolioProvider value={{ prefix }}>
      <RecoilRoot>
        <Layout>
          <LocaleButton />
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </PortfolioProvider>
  );
}

export default appWithTranslation(MyApp);
