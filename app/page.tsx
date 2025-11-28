import ExploreBtn from "@/components/exploreBtn";
import EventCard from "@/components/EventCard";

const events = [
    {image:'/images/event-1.png',title:'Event 1'},
    {image:'/images/event-2.png',title:'Event 2'},
    // {image:'/images/event-1.png',title:'Event 3'},
    // {image:'/images/event-1.png',title:'Event 4'},
    // {image:'/images/event-2.png',title:'Event 5'},
]

const Page = () => {
    return (
        <section>
           <div className="">
               <h1 className="text-center">The Hub for Every Dev <br /> Event You Can't Miss</h1>
               <p className="text-center mt-5">Hackathons, Meetups and Conferences, All in One Place</p>

           </div>
            <ExploreBtn />

            <div className="mt-20 space-y-7 events-section">
                <h2>Featured Events</h2>
                <ul className="events-cards ">
                    {events.map((event) => (
                        <li key={event.title}>
                            <EventCard {...event} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
export default Page
