import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import Image from "next/image";

const EditorRead = dynamic(
    async () => await import("@/components/commons/Editor/EditorRead"),
    { ssr: false }
);

export default function AboutPage() {
    const markDownText = `<h1>📍Want to be</h1><p><strong>현재상태에 만족하지 않는 개발자가 되고 싶습니다.</strong></p><blockquote><p>개인적 학습 내용을 블로그에 작성하는 것을 습관화하고 있습니다. 새로운 기술과 트렌드를 익히는 것에 관심이있고 열정적이며, 팀 내부에서 커뮤니케이션을 통해 기존보다 개선하려는 노력을 하고 있습니다.</p></blockquote><blockquote><p>현재 입사 후에도 꾸준히 개인프로젝트와 블로그를 소홀히 하지 않았으며, 비전공자로서 CS지식에 아쉬움을 느끼고 올해 3월부터는 방송통신대학 컴퓨터과학과에 3학년으로 편입해 수업을 듣는 중입니다.</p></blockquote><p><strong>어떠한 문제가 있더라도 포기보다는 계속 맞서보는 개발자가 되고 싶습니다.</strong></p><blockquote><p>입사 후, 첫 업무로 마이크로사이트 개발 전 기획을 들었을 땐, 내가 과연 기획대로 구현을 할 수 있을까 하는 걱정이 많았고 물론 지금도 그렇지만, 끝까지 붙잡고 하다보니 결국 해내는 저의 모습을 볼 수 있었습니다. 그 뒤로 개발 요청이 들어오면 그때처럼 깊은 걱정보다는 앞전의 있었던 사례들을 생각함으로써 ‘끝까지 포기하지 않는다면, 언젠가는 될거야’라는 생각의 근거가 되면서, 오히려 자신감이 더욱 상승했습니다.</p></blockquote><blockquote><p>그 외에도 팀원을 꾸려 진행하는 사이드 프로젝트를 진행하면서, 요즘 유행중인 기술들을 사용할지 회의를 했습니다. ‘과연 내가 처음 사용해보고 잘 모르는데 할 수 있을까’라는 생각보단, ‘일단 부딪혀보자 계속해서 알아보고 공부하다보면 끝이 보이고, 나에게 도움이 분명히 될거야’라고 스스로 주문을 겁니다. ‘실력은 고통의 총합’이라는 말을 개인적으로 굉장히 좋아하고 실제로도 저의 마음가짐에 적용하고 있습니다.</p></blockquote><p><strong>매번 내가 짯던 코드에 대해서 왜?(Why)라는 의문을 가진 상태로 더 나은 코드로 발전 시킬 수 있는 개발자가 되고 싶습니다.</strong></p><blockquote><p>사용자 경험을 중요시하려는 부분과, 협업에 용이하고 유지보수가 쉽게 코드를 작성하는 능력을 키우고 싶습니다. 새로운것에 대해 도전의식과 호기심을 잃지 않고, 동료들의 신뢰를 얻을 수 있는 태도로 함께 일하고 싶은 동료가 되고 싶습니다. 마지막 코드리뷰는 부트캠프에서 한 경험이 전부이지만, 혼자 공부를 하면서 한계를 느끼고 깨달은 점은, 내가 알고 있는 울타리에서 벗어나는 지식을 습득하려면 다른 사람의 울타리를 넘어봐야 한다는 것 입니다. 따라서 동료와 다양한 생각을 공유 할 수 있는 동료로 성장하고 싶습니다.</p></blockquote><h1>📍Career &amp; Education</h1><h3><span style="color: #0d7cff">👇 2023 ~</span></h3><h2><strong>방송통신대학교 컴퓨터과학과 (2023.03 ~ …)</strong></h2><p><code data-backticks="1">Education</code></p><p>비전공자로서의 아쉬움과 CS지식의 갈망을 느껴서 컴퓨터과학과에 3학년으로 편입</p><h2><strong>Vertigo Games Company (2022.07.25 ~ …)</strong></h2><p><code data-backticks="1">Company</code></p><p><a href="http://Vertigogames.com">Vertigogames.com</a> 회사 홈페이지 유지보수</p><p><br></p><p>글로벌 서비스 게임 플랫폼 Papaya Play, 백오피스 유지보수 및 마이크로 사이트(이벤트 페이지) 개발</p><ul><li><p>PapayaPlay Platform 홈페이지 (https://www.papayaplay.com/portal.do)</p></li><li><p>JSP프레임워크(tiles2) 기반의 Vue.js를 사용</p></li></ul><p>Papaya Play 어드민 페이지 유지보수</p><p><br></p><p>TOS(Tree of Savior 런칭 예정.. / 플랫 폼 내, 웹사이트 개발 및 백오피스 연동)</p><ul><li><p>TOS 홈페이지 (<a href="https://tos.papayaplay.com/tos.do?tp=home">https://tos.papayaplay.com/tos.do?tp=home</a>)</p></li></ul><div contenteditable="false"><hr></div><h3><span style="color: #0d7cff">👇 2022 ~ 2023</span></h3><h2><strong>Vertigo Games Company (2022.07.25 ~ …)</strong></h2><p><code data-backticks="1">Company</code></p><p><a href="http://Vertigogames.com">Vertigogames.com</a> 회사 홈페이지 유지보수</p><p><br></p><p>글로벌 서비스 게임 플랫폼 Papaya Play(https://www.papayaplay.com/portal.do) 유지보수 및 마이크로 사이트(이벤트 페이지) 개발</p><ul><li><p>JSP프레임워크(tiles2) 기반의 Vue.js를 사용</p></li></ul><p>Papaya Play 어드민 페이지 유지보수</p><p><br></p><p>EOS(Echo of Souls 런칭 / 플랫폼 내, 웹사이트 개발 및 백오피스 연동)</p><ul><li><p>EOS 홈페이지 (<a href="https://eos.papayaplay.com/eos.do?tp=home">https://eos.papayaplay.com/eos.do?tp=home</a>)</p></li></ul><h2><strong>code.camp FE 06 (2022.03.14 ~ 2022.06.03)</strong></h2><p><code data-backticks="1">Education</code></p><p><code data-backticks="1">03.14 ~ 06.03</code></p><p>Software Engineering Bootcamp, 120% Front-end Program 06th</p><ul><li><p>코드캠프 프론트엔드 6기 수료</p></li><li><p>Next.JS, React Hooks 기반 프론트엔드 과정 학습</p></li><li><p>코드 리뷰, 알고리즘 토이 과제 해결, 일일 과제 해결</p></li><li><p>상시 페어 프로그래밍 (PF 리뷰)</p></li><li><p>개인 프로젝트 2회 진행</p></li><li><p>팀 프로젝트 1회 진행</p></li></ul><div contenteditable="false"><hr></div><h3><span style="color: #0d7cff">👇 2020~ 2022</span></h3><h2>Nomad Coders (2021)</h2><p><code data-backticks="1">Education</code></p><p>카카오톡 클론 코딩, 바닐라 JS로 크롬 앱(toDoList) 만들기</p><ul><li><p>카카오톡 클론 코딩 수료</p></li><li><p>바닐라js To Do List 수료</p></li><li><p>Javasciprt 기반 프론트엔드 과정 학습</p></li><li><p>변수(Variables), 함수(Functions), 데이터 타입(Data Types), 배열과 객체(Arrays, Objects), DOM, 이벤트(Events), 조건문과 반복문(if / else / for) 개념 학습</p></li><li><p>Local Storage, 브라우저 저장소를 활용한 데이터 활용</p></li></ul><h2>웹개발 국비지원 과정 (2020.04.20 ~ 2020.09.28)</h2><p><code data-backticks="1">Education</code></p><p>JSP 웹개발 국비지원 과정 (6개월 과정)</p><ul><li><p>JSP 스프링 프레임워크를 이용한 웹개발</p></li><li><p>mySQL WorkBench를 활용한 DB설계와 myBatis를 이용한 쿼리 연결</p></li></ul><h2>유한대학교 전자공학과 (2016.03 ~ 2022.02)</h2><p><code data-backticks="1">Education</code></p><div contenteditable="false"><hr></div><h3><span style="color: #0d7cff">👇 ~ 2019 (ETC)</span></h3><h2>일본어 능력 자격증 N4 (2019)</h2><p><code data-backticks="1">Education</code></p>`;
    return (
        <StyledAboutPage>
            <ProfileBox>
                <h1>
                    🔥 배움의 <span style={{ color: "red" }}>열정</span>이
                    흘러넘치는 <span style={{ color: "#ced500" }}>1년차</span>{" "}
                    주니어 프론트엔드 개발자{" "}
                    <span style={{ color: "#0fae00" }}>조준영</span> 입니다!
                </h1>
                <MainSec>
                    <LeftSec>
                        <Image
                            alt="profile"
                            fill
                            src="/images/resume_img.jpeg"
                        />
                    </LeftSec>
                    <RightSec>
                        <p>
                            평상시 웹서비스를 이용하면서 개인이 콘텐츠를 생산해
                            양방향으로 소통하는 페이스북의 등장과, 소셜로그인과
                            같이 기존의 로그인 보다 한층 더 편해진 서비스들을
                            접하면서, 이 분야의 전망과 관심이 생겼고, 첫
                            코딩으로 국비지원 자바스프링 웹개발을 배웠습니다.
                        </p>
                        <p>
                            처음으로 웹개발을 접하면서, 내가 어떻게 코드를
                            작성하는지에 따라 사용자에게 직접적인 경험을 주고,
                            개발을 하면서 입력한 코드가 시각적으로 피드백이 오는
                            것에 재미를 느껴, 프론트엔드 개발자의 길을 선택하게
                            되었습니다.
                        </p>
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
                    </RightSec>
                </MainSec>
            </ProfileBox>
            <EditorRead initialValue={markDownText} />
        </StyledAboutPage>
    );
}

const StyledAboutPage = styled.section`
    max-width: 800px;
    width: 100%;
    padding: 20px;
    padding-top: 0px;
    padding-bottom: 100px;
`;

const ProfileBox = styled.div`
    width: 100%;

    > h1 {
        font-size: 24px;
    }

    @media (max-width: 485px) {
        > h1 {
            font-size: 20px;
        }
    }
`;

const MainSec = styled.div`
    width: 100%;
    display: flex;

    @media (max-width: 485px) {
        flex-direction: column;
    }
`;

const LeftSec = styled.div`
    width: 40%;
    display: flex;
    flex-direction: column;

    > img {
        position: static !important;
        width: 100% !important;
        border-radius: 15px;
    }

    @media (max-width: 485px) {
        width: 100%;

        > img {
            object-fit: cover;
            height: 300px;
        }
    }
`;

const RightSec = styled.div`
    width: 60%;
    padding: 20px;

    > p {
        font-size: 15px;
        margin-top: 0px;
    }

    > ul {
        background-color: #fffbc2;
        font-size: 14px;
        margin: 0px;
        padding: 10px 20px 10px 20px;
        border-radius: 10px;
        > li {
            margin-top: 5px;
            margin-bottom: 5px;
        }
    }

    @media (max-width: 485px) {
        width: 100%;
        padding: 0px;
        padding-top: 20px;
    }
`;
