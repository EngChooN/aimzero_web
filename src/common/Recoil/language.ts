import { atom } from "recoil";

export const currentLangState = atom({
  key: "currentLangState",
  default: "en",
});
