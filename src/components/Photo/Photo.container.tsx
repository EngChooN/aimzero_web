import PhotoUI from "./Photo.presenter";
//recoil
// recoil
import { useRecoilState } from "recoil";
import { userInfoState } from "../../common/Recoil/userInfoState";

export default function Photo() {
  const [userInfo, serUserInfo] = useRecoilState(userInfoState);
  console.log(userInfo);
  return <PhotoUI userInfo={userInfo} />;
}
