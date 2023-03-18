import AboutSection01 from "../../components/About/AboutSection01/AboutSection01";
// react-fullpage
import { SectionsContainer, Section, Header, Footer } from "react-fullpage";
import NoPage from "../../components/NoPage/NoPage";
import PageHeader from "../../components/Layout/Header/Header";
import PageFooter from "../../components/Layout/Footer/Footer";

export default function AboutPage() {
  let options = {
    activeClass: "active", // the class that is appended to the sections links
    anchors: ["01", "02", "03"], // the anchors for each sections
    arrowNavigation: true, // use arrow keys
    className: "SectionContainer", // the class name for the section container
    delay: 600, // the scroll animation speed
    navigation: false, // use dots navigation
    scrollBar: false, // use the browser default scrollbar
    sectionClassName: "Section", // the section class name
    sectionPaddingTop: "0", // the section top padding
    sectionPaddingBottom: "0", // the section bottom padding
    verticalAlign: false, // align the content of each section vertical
  };

  return (
    <>
      <Header>
        <PageHeader />
      </Header>
      <Footer>
        <PageFooter />
      </Footer>
      <SectionsContainer {...options}>
        <Section>
          <AboutSection01 />
        </Section>
        <Section>2</Section>
        <Section>3</Section>
      </SectionsContainer>
    </>
  );
}
