import { atom } from "recoil";

export const splashScreenState = atom<boolean>({
    key: "splashScreenState",
    default: true,
});
