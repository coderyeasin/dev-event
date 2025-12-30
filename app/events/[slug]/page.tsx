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
  <div className="flex flex-row gap-2 items-center">
    <Image src={icon} alt={alt} width={17} height={17} className="bg-white" />
    <p>{label}</p>
  </div>
);

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
  <div className="agenda space-y-2 my-5">
    <h2 className="">Agenda</h2>
    <ul className="space-y-2">
      {agendaItems.map((item) => (
        <li key={item} className="agenda-item list-disc list-inside">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row gap-1.5 flex-wrap my-5">
    {tags.map((tag) => (
      <div className="bg-slate-700 px-3 py-2 rounded-full" key={tag}>
        {tag}
      </div>
    ))}
  </div>
);

const EventDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  let event;
  try {
    const req = await fetch(`${BASE_URL}/api/events/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!req.ok) {
      if (req.status === 404) {
        return notFound();
      }
      throw new Error(`Failed to fetch event data: ${req.statusText}`);
    }

    const response = await req.json();
    event = response.event;
    if (!event) {
      return notFound();
    }
  } catch (error) {
    console.error("Error fetching event data:", error);
    return notFound();
  }

  const {
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
    tags,
    organizer,
  } = event;

  if (!description) return notFound();

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p className="m-2">{description}</p>
      </div>
      <div className="details flex flex-col lg:flex-row gap-10 w-full">
        {/* Event Content - Left SIde*/}
        <div className="content flex-1">
          <Image
            src={image}
            alt={title}
            width={800}
            height={800}
            className="banner"
          />
          <section className="flex flex-col gap-2 my-5">
            <p className="text-xl font-bold">Overview:</p>
            <p className="text-lg">
              {overview} {overview}
            </p>
          </section>

          <section className="flex flex-col gap-2 my-5">
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

          <EventAgenda agendaItems={JSON.parse(agenda[0])} />

          <section className="flex flex-col gap-2 my-7">
            <h2>About the Organizer</h2>
            <p className="text-lg font-semibold">
              {organizer} <br /> {overview}
            </p>
          </section>

          <EventTags tags={JSON.parse(tags[0])} />
        </div>

        {/* Booking Form - Right Side */}
        <aside className="booking w-1/3">
          <p className="text-lg font-semibold">Book Event</p>
          <form className="flex flex-col gap-4 my-5">
            <input
              type="text"
              placeholder="Full Name"
              className="p-3 border border-gray-300 rounded"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              className="p-3 border border-gray-300 rounded"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="p-3 border border-gray-300 rounded"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        </aside>
      </div>
    </section>
  );
};

export default EventDetailPage;
