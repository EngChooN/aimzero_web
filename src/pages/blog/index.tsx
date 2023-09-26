import Blog from "@/components/Blog/Blog";
import AllTagsView from "@/components/commons/Tag/AllTagsView";
import styled from "@emotion/styled";

export default function BlogPage() {
    return (
        <StyledBlogPage>
            <aside>
                <AllTagsView collectionName="blog" />
            </aside>
            <section>
                <Blog menu="blog" />
            </section>
        </StyledBlogPage>
    );
}

const StyledBlogPage = styled.section`
    max-width: 1200px;
    width: 100%;
    height: fit-content;
    min-height: calc(100vh - 250px);
    display: flex;
    justify-content: flex-start;
    padding-bottom: 50px;

    @media (max-width: 1100px) {
        flex-direction: column;
        align-items: center;
        min-height: calc(100vh - 235px);
    }

    > section {
        width: 60%;

        @media (max-width: 1100px) {
            width: 100%;
        }
    }

    > aside {
        width: 20%;

        > section {
            padding-top: 30px;
            padding-bottom: 30px;
            border-bottom: unset;
        }

        @media (max-width: 1100px) {
            width: 100%;
            padding-top: 20px;
            background-color: white;
            z-index: 1;

            > section {
                padding-top: 0px;
                padding-bottom: 0px;
                border-bottom: 1px solid lightgrey;
            }
        }
    }
`;
