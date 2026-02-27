import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const CreateEvent = dynamic(
  () => import("@/components/CreateEvent/CreateEvent"),
  { ssr: true },
);

export default function ProtectedCreateEventPage() {
  return (
    <main className="py-12">
      <Suspense fallback={<div>Loading...</div>}>
        <CreateEvent />
      </Suspense>
    </main>
  );
}
