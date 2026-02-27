import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const BookingClient = dynamic(
  () => import("@/components/Booking/BookingClient"),
  { ssr: true },
);

export default function ProtectedBookingPage() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <BookingClient />
      </Suspense>
    </main>
  );
}
