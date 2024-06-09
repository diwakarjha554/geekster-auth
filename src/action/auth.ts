"use server";

import { signIn, signOut } from "@/auth";
import { CredentialsSignin } from "next-auth";

const loginAction = async (email: string, password: string) => {
    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false,
            redirectTo: '/dashboard',
        })
    } catch (error) {
        const err = error as CredentialsSignin;
        return err.message;
    }
}

const logoutAction = async () => {
    await signOut({redirectTo: "/"});
}

export { loginAction, logoutAction };