import Layout from "@/components/Layout/Layout";
import { appWithTranslation } from "next-i18next";
// recoil
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppProps } from "next/app";
import { Global } from "@emotion/react";
import reset from "@/styles/Globals";

// google tag manager
import * as gtag from "libs/gtag";
import Script from "next/script";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
    gtag.useGtag();
    return (
        <>
            {/* ... */}
            {process.env.NODE_ENV !== "development" && (
                <>
                    {/* Global Site Tag (gtag.js) - Google Analytics */}
                    <Script
                        strategy="afterInteractive"
                        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
                    />
                    <Script
                        id="gtag-init"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gtag.GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
                        }}
                    />
                </>
            )}
            <QueryClientProvider client={queryClient}>
                <RecoilRoot>
                    <Global styles={reset} />
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </RecoilRoot>
            </QueryClientProvider>
        </>
    );
}

export default MyApp;
