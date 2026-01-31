import RegisterPage from "@/components/Register/Register";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Register() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return <RegisterPage />;
}
