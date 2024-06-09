// 'use client';

import dbConnect from "@/db/dbConfig";
import UserModel from "@/models/user-model";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import Link from "next/link";

const Signup = () => {

  const signUp = async (formData:FormData) => {
    "use server";
    const name = formData.get("name") as string | undefined;
    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;
    if(!email || !password || !name){
      throw new Error("Please provide all fields");
    }
    await dbConnect();
    const user = await UserModel.findOne({email});
    if(user) {
      throw new Error("User already exist");
    }
    const hashedPassword = await hash(password, 10);
    await UserModel.create({
      name,
      email,
      password:hashedPassword,
    });
    redirect("/");
  };

  return (
    <div className="shadow-md border-[1px] max-w-[600px] w-full rounded p-5">
      <h1 className="text-2xl font-[500]">SignUp</h1>
      <form 
      action={signUp} 
      className="flex flex-col gap-3 mt-5">
        <input type="text" className="bg-transparent border-[1px] px-1 py-1 rounded" placeholder="Name" name="name"/>
        <input type="email" className="bg-transparent border-[1px] px-1 py-1 rounded" placeholder="Email Id" name="email"/>
        <input type="password" className="bg-transparent border-[1px] px-1 py-1 rounded" placeholder="Password" name="password"/>
        <button type="submit" className="bg-primary text-white dark:text-gray-900 hover:bg-primary/70 py-1 rounded cursor-pointer font-[500]">SignUp</button>
        <p className="text-xs">Don't have an account? <Link href="/" className="text-primary font-[500] cursor-pointer">login</Link></p>
      </form>
    </div>
  )
}

export default Signup;
