import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import BookingHome from "@/components/Booking/Booking";
import { authOptions } from "@/lib/auth";

const BASE_URL = process.env.NEXTAUTH_URL;

export default async function ProtectedBookingPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login?callbackUrl=/booking");
  }
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
    } catch {
      const text = await res.text();
      throw new Error(`Failed to parse bookings response: ${text}`);
    }
  } catch (err) {
    fetchError = (err as Error).message || "Unknown error";
  }
  return (
    <main>
      {fetchError ? (
        <div className="text-red-600 text-center py-4">{fetchError}</div>
      ) : (
        <BookingHome booking={booking} />
      )}
    </main>
  );
}
