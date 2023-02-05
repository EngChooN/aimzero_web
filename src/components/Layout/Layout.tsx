import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import styled from "@emotion/styled";

const Content = styled.section`
  background-color: white;
  display: flex;
  justify-content: center;
`;

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </>
  );
}
