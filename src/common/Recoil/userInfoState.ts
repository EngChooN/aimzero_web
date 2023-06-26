import { atom } from "recoil";

// get firebase user information to state
export const userInfoState = atom<any>({
  key: "userInfoState",
  default: null,
});
