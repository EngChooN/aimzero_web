import SignupUI from "./Signup.presenter";
import { useState } from "react";
import { loginState } from "../../common/Recoil/loginState";
import { useRecoilState } from "recoil";
// firebase auth
import {
    firebaseAuth,
    createUserWithEmailAndPassword,
} from "../../../firebase.config";
import { useRouter } from "next/router";

export default function Signup() {
    const router = useRouter();
    const [id, setId] = useState("");
    const [pass, setPass] = useState("");
    const [rePass, setRePass] = useState("");
    const [loginStatus, setLoginStatus] = useRecoilState(loginState);

    // signUp func
    const signUp = async (id: string, pass: string) => {
        try {
            const data = await createUserWithEmailAndPassword(
                firebaseAuth,
                id,
                pass
            );
            alert("Success signUp!");
            console.log(data);
            router.push("/login");
        } catch (err: any) {
            if (err.code == "auth/email-already-in-use") {
                alert("E-mail already in use!");
            } else if (err.code == "auth/invalid-email") {
                alert("Invalid e-mail!");
            } else if (err.code == "auth/weak-password") {
                alert("Weak password!");
            }
        }
    };

    // check func
    const goToSignUp = () => {
        const reg =
            /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

        // e-mail check
        if (reg.test(id) == false || id == "") {
            alert("Plz check your e-mail");
            return;
        }
        // pass check
        if (pass.length < 6 || pass == "") {
            alert("Password must be at least 6 digits");
            return;
        }
        // confirm pass check
        if (pass !== rePass || rePass == "") {
            alert("Must be the same as the password");
            return;
        }

        console.log("All check OK!");
        signUp(id, pass);
    };
    return (
        <SignupUI
            goToSignUp={goToSignUp}
            setId={setId}
            setPass={setPass}
            setRePass={setRePass}
        />
    );
}
