import styled from "@emotion/styled";
import { SetStateAction } from "react";

export default function Textarea(props: {
    placeholder: string;
    setValue: React.Dispatch<SetStateAction<string>>;
    value?: string;
}) {
    const { placeholder, setValue, value } = props;

    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
    };

    return (
        <StyledTextarea
            maxLength={200}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
}

const StyledTextarea = styled.textarea`
    margin-bottom: 20px;
    width: 100%;
    height: 70px;
    border: unset;
    outline: unset;
    resize: none;
    background-color: #f3f3f3;

    padding: 10px;
    font-size: 14px;
    font-family: serif;
`;
