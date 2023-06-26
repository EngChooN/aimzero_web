import { SignUpType } from "@/types/interfaces/common";
import * as SignUp from "./Signup.styles";

export default function SignupUI(props: SignUpType) {
    const { goToSignUp, setId, setPass, setRePass } = props;
    return (
        <SignUp.Wrapper>
            <SignUp.LoginBox>
                <SignUp.TitleBox>
                    <SignUp.Title>Sign Up</SignUp.Title>
                </SignUp.TitleBox>
                <SignUp.InputBox>
                    <SignUp.Input
                        placeholder="email"
                        onChange={(e) => {
                            setId(e.target.value);
                        }}
                    />
                    {/* input underline */}
                    <div></div>
                </SignUp.InputBox>
                <SignUp.InputBox>
                    <SignUp.Input
                        placeholder="password"
                        type={"password"}
                        onChange={(e) => {
                            setPass(e.target.value);
                        }}
                    />
                    {/* input underline */}
                    <div></div>
                </SignUp.InputBox>
                <SignUp.InputBox>
                    <SignUp.Input
                        placeholder="confirm password"
                        type={"password"}
                        onChange={(e) => {
                            setRePass(e.target.value);
                        }}
                    />
                    {/* input underline */}
                    <div></div>
                </SignUp.InputBox>
                <SignUp.BottomSection>
                    <SignUp.Btn onClick={goToSignUp}>OK</SignUp.Btn>
                </SignUp.BottomSection>
            </SignUp.LoginBox>
        </SignUp.Wrapper>
    );
}
