import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItems = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => (
  <div className="flex-row-gap-2 items-center">
    <Image src={icon} alt={alt} width={17} height={17} className="text-white" />
    <p>{label}</p>
  </div>
);

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
        <div className="content">
          <Image
            src={image}
            alt={title}
            width={800}
            height={800}
            className="banner"
          />
          <section className="flex-col-gap-2">
            <p className="text-lg font-bold">Overview:</p>
            <p className="text-lg">{overview}</p>
          </section>
          <section className="flex-col-gap-2">
            <h2>Event Details</h2>
            <EventDetailItems
              icon="/icons/calendar.svg"
              alt="calendar"
              label={date}
            />
            <EventDetailItems
              icon="/icons/clock.svg"
              alt="clock"
              label={time}
            />
            <EventDetailItems
              icon="/icons/location.svg"
              alt="location"
              label={location}
            />
            <EventDetailItems icon="/icons/mode.svg" alt="mode" label={mode} />
            <EventDetailItems
              icon="/icons/audience.svg"
              alt="audience"
              label={audience}
            />
          </section>
        </div>

        {/* Booking Form - Right Side */}
        <aside className="booking">
          <p className="text-lg font-semibold">Book Event</p>
        </aside>
      </div>
    </section>
  );
};

export default EventDetailPage;
