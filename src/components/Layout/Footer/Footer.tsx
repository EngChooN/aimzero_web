import { darkModeState } from "@/common/Recoil/darkModeState";
import styled from "@emotion/styled";
import Link from "next/link";
import { FaBlogger, FaGithub } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { useRecoilState } from "recoil";

export default function PageFooter(props: { specialColor?: string }) {
    const { specialColor } = props;
    const [darkMode] = useRecoilState(darkModeState);

    return (
        <Wrapper isDark={darkMode} specialColor={specialColor}>
            <ContentsWrapper>
                <Logo specialColor={specialColor}>
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
    isDark: boolean;
    specialColor: string | undefined;
}>`
    width: 100%;
    height: 170px;
    border-top: ${(props) => (!props.isDark ? "" : "1px solid grey")};
    background-color: #ededed;
    ${(props) => props.specialColor && "background-color: rgb(28, 5, 34);"}
    color: black;
    ${(props) => props.specialColor && "color: white;"}

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
    margin-top: 10px;
    margin-bottom: 15px;

    display: flex;
    justify-content: space-evenly;
`;

const Desc = styled.span`
    font-family: Garamond;
`;

const Logo = styled.div<{ specialColor: string | undefined }>`
    font-family: Pacifico;
    font-weight: 200;
    font-size: 30px;
    color: black;
    ${(props) => props.specialColor && "color: white;"}

    cursor: pointer;
`;
