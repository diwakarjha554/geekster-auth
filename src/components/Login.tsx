
import { auth } from "@/auth";
import LoginForm from "./LoginForm";
import { redirect } from "next/navigation";

const Login = async () => {

  const session = await auth();
  if(session?.user) redirect('/dashboard');

  return (
    <div className="shadow-md border-[1px] max-w-[600px] w-full rounded p-5">
      <h1 className="text-2xl font-[500] text-primary">Login</h1>
      <LoginForm />
    </div>
  )
}

export default Login;
