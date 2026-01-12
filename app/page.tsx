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
  // const res = await fetch(`${BASE_URL}/api/booking`);
  // const { booking } = await res.json();
  // console.log("booking", booking);
  return (
    <section>
      <div>
        <h1 className="text-center">
          The Hub for Every Dev <br /> Event You Cannot Miss
        </h1>
        <p className="text-center mt-5">
          Hackathons, Meetups and Conferences, All in One Place
        </p>
      </div>
      <ExploreBtn />
      {/* check event card-designs on UI */}
      <div className="mt-20 space-y-7 events-section">
        <h2>Featured Events</h2>
        <ul className="events-cards">
          {events &&
            events.length > 0 &&
            events.map((event: IEvent) => (
              <li key={event.title}>
                <EventCard {...event} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};
export default Page;
