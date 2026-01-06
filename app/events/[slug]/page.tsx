import BookEvent from "@/components/BookEvent";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database/event.model";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import { cacheLife } from "next/cache";
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
  "use cache";
  cacheLife("hours");

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
  console.log("Event Data:", event);
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

  const bookings = 10;
  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

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

          <EventAgenda agendaItems={JSON.parse(agenda)} />

          <section className="flex flex-col gap-2 my-7">
            <h2>About the Organizer</h2>
            <p className="text-lg font-semibold">
              {organizer} <br /> {overview}
            </p>
          </section>

          <EventTags tags={JSON.parse(tags)} />
        </div>

        {/* Booking Form - Right Side */}
        <aside className="booking w-1/3">
          <div className="signup-card bg-slate-900 p-5 rounded-lg sticky top-20">
            <h2 className="my-3">Book Your Spot</h2>
            {bookings > 0 ? (
              <p className="text-sm">
                Join {bookings} people who have already booked their spot!
              </p>
            ) : (
              <p className="text-sm">Be the first to book your spot!</p>
            )}
            <BookEvent eventId={event._id} slug={slug} />
          </div>
        </aside>
      </div>
      {/* check event card-designs on UI */}
      <div className="flex w-full flex-col gap-4 pt-20">
        <h2 className="text-2xl font-bold">Similar Events You May Like:</h2>
        <div className="events">
          {similarEvents.length > 0 &&
            similarEvents.map((similarEvents: IEvent) => (
              <EventCard key={similarEvents.title} {...similarEvents} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default EventDetailPage;
