import AuthProvider from "@/components/AuthProvider";
import Login from "@/components/Login/Login";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function LoginContent() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return <Login />;
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
