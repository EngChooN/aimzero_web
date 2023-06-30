import Layout from "@/components/Layout/Layout";
import { appWithTranslation } from "next-i18next";
// recoil
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppProps } from "next/app";
import { Global } from "@emotion/react";
import reset from "@/styles/Globals";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <Global styles={reset} />
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </RecoilRoot>
        </QueryClientProvider>
    );
}

export default appWithTranslation(MyApp);
