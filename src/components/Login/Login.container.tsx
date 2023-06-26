import LoginUI from "./Login.presenter";
import { useState } from "react";
// firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../../firebase.config";
// login google
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// recoil
import { loginState } from "../../common/Recoil/loginState";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../common/Recoil/userInfoState";
import { useRouter } from "next/router";

export default function Login() {
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [, setLoginStatus] = useRecoilState(loginState);
  const [, setUserInfo] = useRecoilState(userInfoState);
  const router = useRouter();

  // logIn func (email & pass 6 length up)
  const login = async () => {
    try {
      const curUserInfo = await signInWithEmailAndPassword(
        firebaseAuth,
        id,
        pass
      );
      // init global user info
      setUserInfo(curUserInfo.user);
      console.log(curUserInfo.user);
      // change global login status
      setLoginStatus(true);
      router.push("/");
    } catch (err: any) {
      setLoginStatus(false);
      if ((err.code = "auth/user-not-found")) {
        alert("User not found!");
      } else if (err.code == "auth/wrong-password") {
        alert("Wrong password!");
      }
    }
  };

  // google login func
  const loginGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(firebaseAuth, googleProvider)
      .then((res) => {
        setLoginStatus(true);
        setUserInfo(res.user);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <LoginUI
      setId={setId}
      setPass={setPass}
      login={login}
      loginGoogle={loginGoogle}
    />
  );
}
