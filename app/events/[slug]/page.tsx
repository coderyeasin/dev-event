import { notFound } from "next/navigation";
import React from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const req = await fetch(`${BASE_URL}/api/events/${slug}`);
  const {
    event: {
      description,
      image,
      overview,
      date,
      title,
      time,
      location,
      mode,
      agenda,
      audience,
    },
  } = await req.json();

  if (!description) return notFound();

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p className="m-2">{description}</p>
      </div>
      <div className="details">
        {/* Event Content - Left SIde*/}
        {/* Booking Form - Right Side */}
      </div>
    </section>
  );
};

export default EventDetailPage;
