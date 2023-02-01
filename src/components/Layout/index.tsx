import Footer from "./Footer/index";
import Header from "./Header/index";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
}
