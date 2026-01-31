"use client";
import CreateEvent from "@/components/CreateEvent/CreateEvent";
import { useSession } from "next-auth/react";

import { Suspense } from "react";

export default function Page() {
  const { data: session, status } = useSession();

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
      <Suspense fallback={<p>loading...</p>}>
        <CreateEvent />
      </Suspense>
    </main>
  );
}
