import RegisterPage from "@/components/Register/Register";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Register() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return (
    <Suspense fallback={<p>loading...</p>}>
      <RegisterPage />
    </Suspense>
  );
}
