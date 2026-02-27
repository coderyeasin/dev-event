"use client";
import React, { useEffect, useState } from "react";
import BookingHome from "./Booking";

const BASE_URL = process.env.NEXTAUTH_URL || "";

export default function BookingClient() {
  const [booking, setBooking] = useState<any[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch(`${BASE_URL}/api/booking`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Failed to fetch bookings: ${res.status} ${text}`);
        }
        const data = await res.json();
        setBooking(data.booking || []);
      } catch (err: any) {
        setFetchError(err.message || "Unknown error");
      }
    }
    fetchBookings();
  }, []);

  if (fetchError) {
    return <div className="text-red-600 text-center py-4">{fetchError}</div>;
  }
  return <BookingHome booking={booking} />;
}