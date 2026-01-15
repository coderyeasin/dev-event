import BookingHome from "@/components/Booking/Booking";
import { cacheLife } from "next/cache";
import React, { Suspense } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const BookingPage = async () => {
  "use cache";
  cacheLife("hours");
  let booking = [];
  let fetchError = null;
  try {
    const res = await fetch(`${BASE_URL}/api/booking`);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to fetch bookings: ${res.status} ${text}`);
    }
    try {
      const data = await res.json();
      booking = data.booking || [];
    } catch (jsonErr) {
      const text = await res.text();
      throw new Error(`Failed to parse bookings response: ${text}`);
    }
  } catch (err: any) {
    fetchError = err.message || "Unknown error";
  }
  return (
    <main>
      <Suspense fallback={<div>loading...</div>}>
        {fetchError ? (
          <div className="text-red-600 text-center py-4">{fetchError}</div>
        ) : (
          <BookingHome booking={booking} />
        )}
      </Suspense>
    </main>
  );
};

export default BookingPage;
