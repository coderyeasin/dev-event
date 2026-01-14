import BookingHome from "@/components/Booking/Booking";
import { cacheLife } from "next/cache";
import React, { Suspense } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const BookingPage = async () => {
  "use cache";
  cacheLife("hours");
  const res = await fetch(`${BASE_URL}/api/booking`);
  const { booking } = await res.json();
  return (
    <main>
      <Suspense fallback={<div>loading...</div>}>
        <BookingHome booking={booking} />
      </Suspense>
    </main>
  );
};

export default BookingPage;
