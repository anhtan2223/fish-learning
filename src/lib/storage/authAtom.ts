import { atomWithStorage } from "jotai/utils";

export const authAtom = atomWithStorage('token' , null)
export const isLoginAtom = atomWithStorage('isLogin' , false)