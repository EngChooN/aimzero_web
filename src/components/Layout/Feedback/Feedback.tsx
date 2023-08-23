import Button from "@/components/commons/Button/Button";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import { ButtonWrapper } from "../FloatingButton/FloatingButton";

export default function Feedback() {
    const [modalState, setModalState] = useState(false);
    const [feedbackContent, setFeedbackContent] = useState("");

    const onClickFeedback = () => {
        setModalState(!modalState);
    };

    const closeModal = () => {
        setModalState(false);
    };

    const sendEmail = async () => {
        const templateParams = {
            feedback: feedbackContent,
        };

        emailjs
            .send(
                "service_v3rhrfx",
                "template_mfo11nt",
                templateParams,
                "Gs-3owh7O5wBJ3qkR"
            )
            .then(() => {
                alert("접수되었습니다!");
                setModalState(false);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        const buttonWrapper = document.querySelector(
            ".feedback"
        ) as HTMLElement;
        if (buttonWrapper) {
            buttonWrapper.style.bottom = "100px";
        }
    }, []);
    return (
        <StyledFeedback>
            <ButtonWrapper
                className="feedback"
                onClick={onClickFeedback}
                style={{ right: "15px" }}
            >
                Feedback
            </ButtonWrapper>
            {/* modal */}
            {modalState && (
                <ModalWrapper>
                    <h1>Feedback mailing</h1>
                    <span>
                        🔥 문제점이나 개선점을 부담없이 제보해주세요!! 🔥
                    </span>
                    <textarea
                        onChange={(event) => {
                            setFeedbackContent(event?.target.value);
                        }}
                    />
                    <div>
                        <Button
                            label="cancle"
                            backgroundColor="black"
                            primary={false}
                            onClick={closeModal}
                        />
                        <Button
                            label="submit"
                            backgroundColor="black"
                            primary={feedbackContent === ""}
                            onClick={() => {
                                if (feedbackContent !== "") {
                                    sendEmail();
                                }
                            }}
                        />
                    </div>
                </ModalWrapper>
            )}
        </StyledFeedback>
    );
}

const StyledFeedback = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1000;
`;

const ModalWrapper = styled.section`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    padding: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 450px;
    height: 550px;
    border-radius: 25px;
    background: white;
    box-shadow: 0px 0px 10px grey;

    font-family: serif;
    z-index: 999;

    > h1 {
        font-size: 23px;
        margin-bottom: 10px;
    }

    > span {
        font-size: 13px;
        margin-bottom: 10px;
    }

    > textarea {
        width: 100%;
        height: 100%;
        max-height: 300px;
        resize: none;
        font-size: 15px;
        padding: 10px;
        outline: unset;
    }

    > div {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
