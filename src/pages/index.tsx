import styled from "@emotion/styled";
import HomeSec01 from "@/components/Home/HomeSec01/HomeSec01";
import HomeSec02 from "@/components/Home/HomeSec02/HomeSec02";
import FullPageScroll, {
    FullPageElement,
} from "@/components/commons/FullPageScroll/FullPageScroll";
import Splash from "@/components/Home/Splash/Splash";
import Footer from "@/components/Layout/Footer/Footer";

export default function Home() {
    const pageSection = [
        <FullPageElement key={1} style={{ background: "red" }}>
            <span>풀페이지 스크롤 1번 섹션</span>
        </FullPageElement>,
        <FullPageElement key={2} style={{ background: "green" }}>
            <span>풀페이지 스크롤 2번 섹션</span>
        </FullPageElement>,
        <FullPageElement key={3} style={{ background: "blue" }}>
            <span>풀페이지 스크롤 3번 섹션</span>
        </FullPageElement>,
        <FullPageElement key={4} style={{ background: "yellow" }}>
            <span>풀페이지 스크롤 4번 섹션</span>
        </FullPageElement>,
    ];

    return (
        <>
            <Splash />
            <StyledHome>
                <HomeSec01 />
                <HomeSec02 />
                {/* <FullPageScroll pageSection={pageSection} /> */}
                <Footer specialColor={"rgb(28, 5, 34)"} />
            </StyledHome>
        </>
    );
}

const StyledHome = styled.div`
    background-color: rgb(28, 5, 34);
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
