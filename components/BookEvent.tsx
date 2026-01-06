"use client";
import { createBooking } from "@/lib/actions/booking.actions";
import posthog from "posthog-js";

import React, { useState } from "react";

const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { success } = await createBooking({ eventId, slug, email });

    if (success) {
      setSubmitted(true);
      posthog.capture("event_booked", {
        event_id: eventId,
        slug: slug,
        email: email,
      });
    } else {
      console.error("Booking failed");
      posthog.capture("booking_failed", { event_id: eventId, slug, email });
    }
  };

  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-green-500 text-sm my-5">
          Thank you for booking! We have received your request.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-none outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="button-submit bg-teal-500 p-2 rounded-lg text-black hover:text-white w-full font-semibold cursor-pointer hover:bg-teal-600"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
