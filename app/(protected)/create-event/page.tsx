"use client";
import CreateEvent from "@/components/CreateEvent/CreateEvent";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <main className="py-12 flex justify-center items-center min-h-[40vh]">
        <span className="text-lg text-teal-700 animate-pulse">Loading...</span>
      </main>
    );
  }

  if (!session?.user) return null;

  return (
    <main className="py-12">
      <React.Suspense fallback={<p>loading...</p>}>
        <CreateEvent />
      </React.Suspense>
    </main>
  );
}
