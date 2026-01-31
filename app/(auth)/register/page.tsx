import RegisterPage from "@/components/Register/Register";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function RegisterContent() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return <RegisterPage />;
}

export default function Register() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
