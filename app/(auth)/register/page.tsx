import RegisterPage from "@/components/Register/Register";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Register() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return <RegisterPage />;
}
