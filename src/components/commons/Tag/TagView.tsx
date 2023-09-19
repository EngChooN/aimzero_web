import styled from "@emotion/styled";
import { useRouter } from "next/router";

export default function TagView(props: { tags: string[]; path?: string }) {
    const { tags, path } = props;
    const router = useRouter();
    return (
        <StyledTagView>
            {tags?.map((el, index) => (
                <Tag
                    key={index}
                    onClick={() => {
                        if (path) router.push(`/${path}?tag=${el}`);
                    }}
                >
                    #{el}
                </Tag>
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

    transition: all 0.3s ease;
    cursor: pointer;

    :hover {
        background-color: #d1d1d1;
    }
`;
