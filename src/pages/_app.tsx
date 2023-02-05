import { useRouter } from "next/router";
import "../../styles/globals.css";
import Layout from "../components/Layout/Layout";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // const currPath = router.asPath;
  return (
    // <>
    //   {currPath == "/" ? (
    //     <Component {...pageProps} />
    //   ) : (
    <Layout>
      <Component {...pageProps} />
    </Layout>
    //   )}
    // </>
  );
}

export default MyApp;
