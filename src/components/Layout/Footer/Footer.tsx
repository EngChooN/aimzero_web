import styled from "@emotion/styled";
import Link from "next/link";
import { FaBlogger, FaGithub } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";

export default function PageFooter(props: { specialFlag: boolean }) {
    const { specialFlag } = props;

    return (
        <Wrapper specialFlag={specialFlag}>
            <ContentsWrapper>
                <Logo specialFlag={specialFlag}>
                    <Link href="/">AimZero</Link>
                </Logo>
                <IconWrapper>
                    <a href="https://velog.io/@aimzero9303" target="_blank">
                        <FaBlogger
                            style={{ fontSize: "22px", cursor: "pointer" }}
                        />
                    </a>
                    <a href="https://github.com/EngChooN" target="_blank">
                        <FaGithub
                            style={{ fontSize: "22px", cursor: "pointer" }}
                        />
                    </a>
                    <a
                        href="https://www.instagram.com/j00n0__/"
                        target="_blank"
                    >
                        <FiInstagram
                            style={{ fontSize: "22px", cursor: "pointer" }}
                        />
                    </a>
                </IconWrapper>
                <Desc>Copyright(c)2023 by Joonyoung Cho</Desc>
            </ContentsWrapper>
        </Wrapper>
    );
}

const Wrapper = styled.section<{
    specialFlag: boolean;
}>`
    width: 100%;
    height: 170px;
    background-color: #ededed;
    ${(props) => props.specialFlag && "background-color: rgb(28, 5, 34);"}
    color: black;
    ${(props) => props.specialFlag && "color: white;"}

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ContentsWrapper = styled.div`
    max-width: 1200px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const IconWrapper = styled.div`
    max-width: 200px;
    width: 100%;
    margin-top: 5px;
    margin-bottom: 5px;

    display: flex;
    justify-content: space-evenly;
`;

const Desc = styled.span`
    font-family: Garamond;
`;

const Logo = styled.div<{ specialFlag: boolean }>`
    font-family: Pacifico;
    font-weight: 200;
    font-size: 32px;
    color: black;
    ${(props) => props.specialFlag && "color: white;"}

    cursor: pointer;
`;
