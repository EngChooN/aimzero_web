import Button from "@/components/commons/Button/Button";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import emailjs from "emailjs-com";

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
            ".buttonWrapper"
        ) as HTMLElement;
        if (buttonWrapper) {
            buttonWrapper.style.right = "15px";
        }
    }, []);
    return (
        <StyledFeedback>
            <ButtonWrapper className="buttonWrapper" onClick={onClickFeedback}>
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
                            onClick={sendEmail}
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
`;

const ButtonWrapper = styled.div`
    position: fixed;
    bottom: 15px;
    right: -200px;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 70px;
    border-radius: 100px;
    background-color: black;
    box-shadow: 0px 0px 20px grey;

    color: white;
    font-family: serif;
    font-size: 12px;

    transition: all 0.3s ease;
    cursor: pointer;

    :hover {
        scale: 0.9;
    }
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
    box-shadow: 0px 0px 40px grey;

    font-family: serif;
    z-index: 12;

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
    }

    > div {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
