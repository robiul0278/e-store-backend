import { USER_ROLE } from "./auth.constant";

export type IRegisterUser = {
    name: string;
    email: string;
    password: string;
    photo: string;
    role?: "user" | "admin";
}

export type ILoginUser = {
    email: string;
    password: string;
}

export type IResetPassword = {
       email: string;
    newPassword: string;
}

export type TUserRole = keyof typeof USER_ROLE;