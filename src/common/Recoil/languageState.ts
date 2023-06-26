import { atom } from "recoil";

export const currentLangState = atom<string>({
  key: "currentLangState",
  default: "en",
});
