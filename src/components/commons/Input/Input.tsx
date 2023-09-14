import styled from "@emotion/styled";
import { SetStateAction } from "react";

export default function Input(options: {
    placeholder?: string;
    setValue: React.Dispatch<SetStateAction<string>>;
    value: string;
}) {
    const { placeholder, value, setValue } = options;

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <StyledInput
            placeholder={placeholder}
            onChange={onChange}
            value={value}
        />
    );
}

const StyledInput = styled.input`
    background-color: #f3f3f3;
    border: unset;
    border-radius: 25px;
    width: 100%;
    height: 45px;
    padding: 10px;
    padding-left: 20px;
    font-size: 14px;
    font-family: serif;

    :focus {
        outline: none;
    }
`;
