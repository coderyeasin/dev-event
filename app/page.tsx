import ExploreBtn from "@/components/exploreBtn";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database/event.model";
import { cacheLife } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Page = async () => {
  "use cache";
  cacheLife("hours");

  const response = await fetch(`${BASE_URL}/api/events`);
  const { events } = await response.json();

  return (
    <section className="w-full px-2 sm:px-0">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-center text-3xl sm:text-5xl">
          The Hub for Every Dev <br /> Event You Cannot Miss
        </h1>
        <p className="text-center mt-5 text-base sm:text-lg">
          Hackathons, Meetups and Conferences, All in One Place
        </p>
      </div>
      <ExploreBtn />
      {/* check event card-designs on UI */}
      <div className="mt-20 space-y-7 events-section w-full">
        <h2 className="text-xl sm:text-2xl sm:text-center">Featured Events</h2>
        <ul className="events-cards flex flex-col sm:flex-row flex-wrap items-center gap-x-6 gap-y-14 w-full">
          {events &&
            events.length > 0 &&
            events.map((event: IEvent) => (
              <li
                key={event.title}
                className="w-full sm:w-auto flex justify-center sm:mx-auto"
              >
                <EventCard {...event} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};
export default Page;
