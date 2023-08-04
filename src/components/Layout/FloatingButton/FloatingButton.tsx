import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import Feedback from "../Feedback/Feedback";
import DarkModeSwitch from "@/components/commons/DarkModeSwitch/DarkModeSwitch";

export default function FloatingButton() {
    const [buttonsState, setButtonsState] = useState(false);

    const onClickSpread = () => {
        setButtonsState(!buttonsState);
    };

    useEffect(() => {
        const buttonWrapper = document.querySelector(
            ".buttonWrapper"
        ) as HTMLElement;
        if (buttonWrapper) {
            buttonWrapper.style.right = "15px";
        }
    }, []);

    return (
        <StyledFloatingButton>
            <ButtonWrapper className="buttonWrapper" onClick={onClickSpread}>
                {buttonsState ? <BiDownArrow /> : <BiUpArrow />}
            </ButtonWrapper>
            {buttonsState && (
                <>
                    <Feedback />
                    <DarkModeSwitch />
                </>
            )}
        </StyledFloatingButton>
    );
}
const StyledFloatingButton = styled.div``;

export const ButtonWrapper = styled.div`
    position: fixed;
    bottom: 15px;
    right: -150px;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 70px;
    border-radius: 100px;
    background-color: black;
    box-shadow: 0px 0px 10px grey;

    color: white;
    font-family: serif;
    font-size: 12px;

    transition: all 0.3s ease;
    z-index: 1000;
    cursor: pointer;

    :hover {
        scale: 0.9;
    }
`;
