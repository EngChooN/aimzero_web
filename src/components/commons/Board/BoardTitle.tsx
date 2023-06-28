import styled from "@emotion/styled";

export default function BoardTitle(props: { title: string }) {
    const { title } = props;

    return <StyledBoardTitle>{title}</StyledBoardTitle>;
}

const StyledBoardTitle = styled.h1`
    font-family: AbrilFatface;
    font-size: 35px;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid lightgray;
`;
