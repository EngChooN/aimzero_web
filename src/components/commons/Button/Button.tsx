import styled from "@emotion/styled";

export default function Button(props: {
    label: string;
    backgroundColor: string | "black";
    primary: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
    const { label, backgroundColor, primary, onClick } = props;
    return (
        <Wrapper
            backgroundColor={backgroundColor}
            primary={primary}
            onClick={onClick}
        >
            {label}
        </Wrapper>
    );
}

const Wrapper = styled.button<{ backgroundColor: string; primary: boolean }>`
    height: 40px;
    background: unset;
    background-color: ${(props) => props.backgroundColor};
    border: unset;
    border: 1px solid black;
    border-radius: 20px;
    padding: 25px;
    padding-top: 15px;
    padding-bottom: 15px;
    margin-top: 40px;
    margin-bottom: 10px;
    margin-right: 10px;
    font-family: serif;
    color: white;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    ${(props) => props.primary && "opacity: 0.6; cursor: not-allowed;"}

    :hover {
        background-color: #2f2f2f;
    }
`;
