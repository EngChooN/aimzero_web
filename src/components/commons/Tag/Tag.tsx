import { darkModeState } from "@/common/Recoil/darkModeState";
import { TagOptions } from "@/types/interfaces/common";
import styled from "@emotion/styled";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import { useRecoilState } from "recoil";

export default function Tag(props: TagOptions) {
    const [darkMode] = useRecoilState(darkModeState);
    const { tags, setTags } = props;
    const [tag, setTag] = useState<string>("");

    const addTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode == 13) {
            setTags([...tags, tag]);
            setTag("");
        }
    };

    return (
        <StyledTag>
            <TagInput
                placeholder="tag (typing and press enter)"
                onChange={(e) => {
                    setTag(e.target.value);
                }}
                onKeyDown={addTag}
                value={tag}
            />
            <TagWrapper>
                {tags.map((el, index) => (
                    <div key={index}>
                        <TagEl key={index} isDark={darkMode}>
                            #{el}
                            <MdCancel
                                style={{
                                    marginLeft: "3px",
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    const newTags = tags;
                                    newTags.splice(index, 1);
                                    console.log(newTags);
                                    setTags([...newTags]);
                                }}
                            />
                        </TagEl>
                    </div>
                ))}
            </TagWrapper>
        </StyledTag>
    );
}

const StyledTag = styled.section`
    display: flex;
    width: 100%;
`;

const TagInput = styled.input`
    background-color: #f3f3f3;
    border: none;
    width: 50%;
    height: 45px;
    padding: 10px;
    margin-right: 20px;
    font-size: 14px;
    font-family: serif;

    :focus {
        outline: none;
    }
`;

const TagWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    overflow: scroll;
    display: flex;
    flex-wrap: wrap;
    width: 50%;
    height: fit-content;
`;

const TagEl = styled.div<{ isDark: boolean }>`
    display: flex;
    align-items: center;

    height: 30px;
    border: ${(props) => (!props.isDark ? "" : "1px solid grey")};
    background-color: #f3f3f3;
    border-radius: 15px;

    padding-right: 10px;
    padding-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;

    font-family: serif;
`;