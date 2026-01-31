import Login from "@/components/Login/Login";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

// "Skip the static build check for this specific page.
// Just render it fresh on the server whenever a user visits."
// "Uncached data" error because Next.js stops trying to cache the result of getServerSession during the build.
export const dynamic = "force-dynamic";

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
