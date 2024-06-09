"use client";

import { loginAction } from "@/action/auth";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "react-hot-toast";

const LoginForm = () => {

    const router = useRouter();
    const handleSignupRedirect = useCallback(() => {
        router.push("/signup");
    }, [router]);

    return (
        <form
            action={
                async (formData) => {
                    const email = formData.get("email") as string;
                    const password = formData.get("password") as string;

                    if (!email || !password) {
                        return toast.error("Please provide all fields");
                    }
                    const toastId = toast.loading("Logging In");
                    const error = await loginAction(email, password);
                    if(!error) {
                        toast.success("Login Successful", {
                            id: toastId,
                        });
                        router.refresh();
                        
                    } else {
                        toast.error(error, {
                            id: toastId,
                        })
                    }
                }
            }
            className="flex flex-col gap-3 mt-5">
            <input type="email" name="email" className="bg-transparent border-[1px] px-1 py-1 rounded" placeholder="Email Id" />
            <input type="password" name="password" className="bg-transparent border-[1px] px-1 py-1 rounded" placeholder="Password" />
            <button type="submit" className="bg-primary hover:bg-primary/70 py-1 rounded cursor-pointer font-[500]">LogIn</button>
            <p className="text-xs">Don't have an account? <span onClick={handleSignupRedirect} className="text-primary font-[500] cursor-pointer">signup</span></p>
        </form>
    )
}

export default LoginForm;
