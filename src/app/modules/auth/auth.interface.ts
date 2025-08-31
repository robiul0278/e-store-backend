import { USER_ROLE } from "./auth.constant";

export type TRegisterUser = {
    name: string;
    email: string;
    password: string;
    photo: string;
    role?: "user" | "admin" | "superAdmin";
}

export type TLoginUser = {
    email: string;
    password: string;
}

export type TResetPassword = {
       email: string;
    newPassword: string;
}

export type TUserRole = keyof typeof USER_ROLE;