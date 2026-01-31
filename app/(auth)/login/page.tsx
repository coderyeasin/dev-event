import Login from "@/components/Login/Login";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <Suspense fallback={<p>loading...</p>}>
      <Login />
    </Suspense>
  );
}
