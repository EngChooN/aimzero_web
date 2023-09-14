import styled from "@emotion/styled";

export default function TagView(props: { tags: string[] }) {
    const { tags } = props;
    return (
        <StyledTagView>
            {tags?.map((el, index) => (
                <Tag key={index}>#{el}</Tag>
            ))}
        </StyledTagView>
    );
}

const StyledTagView = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 20px;
    border-bottom: 1px solid lightgray;
`;

const Tag = styled.div`
    display: flex;
    align-items: center;

    height: 30px;
    background-color: #f3f3f3;
    border-radius: 15px;

    padding-right: 10px;
    padding-left: 10px;
    margin-right: 10px;
    margin-bottom: 20px;

    font-family: serif;
    font-size: 12px;
`;
