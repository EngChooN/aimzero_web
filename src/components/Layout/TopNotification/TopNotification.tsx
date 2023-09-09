import styled from "@emotion/styled";

export default function TopNotification() {
    return (
        <StyledTopNotification>
            <a>실험실 바로가기 (이것저것 프로젝트)</a>
        </StyledTopNotification>
    );
}

const StyledTopNotification = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 70px;

    z-index: 99999;
`;
