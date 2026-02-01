import CreateEvent from "@/components/CreateEvent/CreateEvent";
import React, { Suspense } from "react";

const page = () => {
  return (
    <main className="py-12">
      <Suspense fallback={<p>loading...</p>}>
        <CreateEvent />
      </Suspense>
    </main>
  );
};

export default page;
