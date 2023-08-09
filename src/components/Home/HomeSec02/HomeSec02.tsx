import { SkillsData } from "@/common/data/skillsData";
import * as HomeSection02 from "@/components/Home/HomeSec02/HomeSec02.styles";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { useEffect } from "react";

export default function HomeSec02() {
    const proficiency3 = SkillsData.filter((el) => {
        return el.proficiency === 3;
    });

    const proficiency2 = SkillsData.filter((el) => {
        return el.proficiency === 2;
    });

    const proficiency1 = SkillsData.filter((el) => {
        return el.proficiency === 1;
    });

    useEffect(() => {
        AOS.init(); // AOS init
    }, []);

    return (
        <HomeSection02.Section>
            <h1 data-aos="zoom-in">🙋🏻‍♂️ Introduce</h1>
            <h2 data-aos="fade-right">
                🔥 배움의 <span style={{ color: "red" }}>열정</span>이
                흘러넘치는 <span style={{ color: "yellow" }}>1년차</span> 주니어
                프론트엔드 개발자
                <span style={{ color: "green" }}> 조준영</span> 입니다!
            </h2>
            <HomeSection02.IntroWrapper data-aos="fade">
                <img src="images/resume_img.jpeg" data-aos="fade-up" />
                <HomeSection02.IntroDescWrapper data-aos="fade-left">
                    <div>
                        <span>
                            평상시 웹서비스를 이용하면서 개인이 콘텐츠를 생산해
                            양방향으로 소통하는 페이스북의 등장과, 소셜로그인과
                            같이 기존의 로그인 보다 한층 더 편해진 서비스들을
                            접하면서, 이 분야의 전망과 관심이 생겼고, 첫
                            코딩으로 국비지원 자바스프링 웹개발을 배웠습니다.
                        </span>
                        <br />
                        <br />
                        <span>
                            처음으로 웹개발을 접하면서, 내가 어떻게 코드를
                            작성하는지에 따라 사용자에게 직접적인 경험을 주고,
                            개발을 하면서 입력한 코드가 시각적으로 피드백이 오는
                            것에 재미를 느껴, 프론트엔드 개발자의 길을 선택하게
                            되었습니다.
                        </span>
                        <ul>
                            <li>Email: aimzero9303@gmail.com</li>
                            <li>
                                GitHub:{" "}
                                <a
                                    href="https://github.com/EngChooN"
                                    target="_blank"
                                >
                                    https://github.com/EngChooN
                                </a>
                            </li>
                            <li>
                                Velog:{" "}
                                <a
                                    href="https://velog.io/@aimzero9303"
                                    target="_blank"
                                >
                                    https://velog.io/@aimzero9303
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <Link href="/resume">
                            <HomeSection02.MoreButton>
                                이력서 보기..
                            </HomeSection02.MoreButton>
                        </Link>
                        <Link href="/project">
                            <HomeSection02.MoreButton>
                                프로젝트 보기..
                            </HomeSection02.MoreButton>
                        </Link>
                    </div>
                </HomeSection02.IntroDescWrapper>
            </HomeSection02.IntroWrapper>
            <h1 data-aos="zoom-in">🛠️ Skills</h1>
            <HomeSection02.SkillsWrapper>
                <h2 data-aos="fade-right">🥇 Proficient</h2>
                <h3 data-aos="fade-right">
                    특별한 도움 없이, 업무 수행이 가능한 기술
                </h3>
                <HomeSection02.SkillsGrid>
                    {proficiency3.map((el, index) => (
                        <HomeSection02.SkillBox key={index} data-aos="fade-up">
                            <HomeSection02.ImgWrapper>
                                <img src={el.img} style={el.imgStyle} />
                            </HomeSection02.ImgWrapper>
                            <HomeSection02.DescWrapper>
                                <h1>{el.name}</h1>
                                <span>{el.desc}</span>
                            </HomeSection02.DescWrapper>
                        </HomeSection02.SkillBox>
                    ))}
                </HomeSection02.SkillsGrid>
                <h2 data-aos="fade-right">🥈 Demonstrating</h2>
                <h3 data-aos="fade-right">
                    능숙하진 않으나, 기본적인 업무 수행이 가능한 기술
                </h3>
                <HomeSection02.SkillsGrid>
                    {proficiency2.map((el, index) => (
                        <HomeSection02.SkillBox key={index} data-aos="fade-up">
                            <HomeSection02.ImgWrapper>
                                <img src={el.img} style={el.imgStyle} />
                            </HomeSection02.ImgWrapper>
                            <HomeSection02.DescWrapper>
                                <h1>{el.name}</h1>
                                <span>{el.desc}</span>
                            </HomeSection02.DescWrapper>
                        </HomeSection02.SkillBox>
                    ))}
                </HomeSection02.SkillsGrid>
                <h2 data-aos="fade-right">🥉 ETC</h2>
                <h3 data-aos="fade-right">
                    개발 관련 프로그램이나, 사용 경험이 있는 기술 및 서비스
                </h3>
                <HomeSection02.SkillsGrid>
                    {proficiency1.map((el, index) => (
                        <HomeSection02.SkillBox key={index} data-aos="fade-up">
                            <HomeSection02.ImgWrapper>
                                <img src={el.img} style={el.imgStyle} />
                            </HomeSection02.ImgWrapper>
                            <HomeSection02.DescWrapper>
                                <h1>{el.name}</h1>
                                <span>{el.desc}</span>
                            </HomeSection02.DescWrapper>
                        </HomeSection02.SkillBox>
                    ))}
                </HomeSection02.SkillsGrid>
            </HomeSection02.SkillsWrapper>
        </HomeSection02.Section>
    );
}
