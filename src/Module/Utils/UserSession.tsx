import { atom } from 'jotai';
export interface UserInfo {
    email: string,
    firstname: string,
    lastname: string,
    id?: string
}

export const USER = atom<UserInfo>({
    email: "",
    firstname: "",
    lastname: "",
    id: ""
});
