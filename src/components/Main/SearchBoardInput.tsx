import styled from "@emotion/styled";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBoardInput(props: {
    setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { setSearchKeyword } = props;
    return (
        <StyledSearchBoardInput>
            <div>
                <AiOutlineSearch />
            </div>
            <Input
                onChange={(event) => {
                    setSearchKeyword(event.target.value);
                }}
                placeholder="Search by title"
            ></Input>
        </StyledSearchBoardInput>
    );
}

const StyledSearchBoardInput = styled.div`
    margin-left: 10px;
    display: flex;
    align-items: center;

    > div {
        position: absolute;
        left: 25px;
        /* top: 11px; */
        top: 26px;
    }
`;

const Input = styled.input`
    padding-left: 35px;
    padding-right: 20px;
    max-width: 145px;
    width: 100%;
    height: 40px;
    border: unset;
    background: unset;
    outline: unset;
    border: 1px solid lightgrey;
    transition: 0.3s all ease;
    border-radius: 100px;

    :hover {
        border-color: darkgrey;
    }
    :focus {
        max-width: 265px;
        border-color: darkgrey;
    }
`;
