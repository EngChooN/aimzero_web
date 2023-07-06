import styled from "@emotion/styled";
import { useEffect, useRef } from "react";

export default function Home() {
    const scrollRef = useRef<any>(null);
    const pageSection = [
        <FullPageElement style={{ background: "red" }}>1</FullPageElement>,
        <FullPageElement style={{ background: "green" }}>2</FullPageElement>,
        <FullPageElement style={{ background: "blue" }}>3</FullPageElement>,
        <FullPageElement style={{ background: "black" }}>4</FullPageElement>,
    ];

    useEffect(() => {
        const handleScroll = (e: React.WheelEvent) => {
            const scrollTop = scrollRef.current.scrollTop;
            const viewHeight = window.innerHeight;
            const deltaY = e.deltaY;

            console.log(scrollTop, viewHeight);
            if (scrollRef.current) {
                // down wheel event
                if (deltaY > 0) {
                    for (let i = 0; i < pageSection.length; i++) {
                        if (
                            scrollTop >= viewHeight * i &&
                            scrollTop <= viewHeight * (i + 1)
                        ) {
                            scrollRef.current.scrollTo({
                                top: viewHeight * (i + 1),
                                behavior: "smooth",
                            });
                        }
                    }
                }

                // up wheel event
                if (deltaY < 0) {
                    for (let i = 0; i < pageSection.length; i++) {
                        if (
                            scrollTop >= viewHeight * i &&
                            scrollTop <= viewHeight * (i + 1)
                        ) {
                            scrollRef.current.scrollTo({
                                top: viewHeight * (i - 1),
                                behavior: "smooth",
                            });
                        }
                    }
                }
            }
        };

        // 이벤트 등록
        if (scrollRef.current) {
            scrollRef.current.addEventListener("wheel", handleScroll);
        }

        // 메모리 최적화를 위해 이벤트 삭제 (선택사항)
        return () => {
            if (scrollRef.current) {
                scrollRef.current.removeEventListener("wheel", handleScroll);
            }
        };
    }, []);

    return (
        <FullPageScrollWrapper ref={scrollRef}>
            {pageSection}
        </FullPageScrollWrapper>
    );
}

const FullPageScrollWrapper = styled.section`
    width: 100vw;
    height: 100vh;

    overflow: scroll;
`;

const FullPageElement = styled.section`
    width: 100%;
    height: 100%;
`;
