import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Section from "./ui/Section";
import Container from "./ui/Container";
import { logoutAction } from "@/action/auth";


const Dashboard = async () => {

  const session = await auth();
  if(!session?.user) redirect('/');

  return (
    <Section className="mt-20">
      <Container>
        <h1 className="text-4xl font-[500]">Dashboard</h1>
        <form action={logoutAction} className="mt-5">
          <button
            type="submit"
            className="bg-primary p-2 rounded text-white dark:text-gray-900"
          >
            Logout
          </button>
        </form>
      </Container>
    </Section>
  )
}

export default Dashboard;
