import styled from "@emotion/styled";
import Link from "next/link";

export default function TopNotification() {
    return (
        <StyledTopNotification>
            <Link href={"/experiment"}>
                실험실 바로가기 (이것저것 만들어보자)
            </Link>
        </StyledTopNotification>
    );
}

const StyledTopNotification = styled.section`
    background-color: black;
    color: white;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 60px;

    font-weight: 200;

    z-index: 99999;
`;
