import Link from "next/link";
import Image from "next/image";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";

interface Props {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

const EventCard = ({ title, image, slug, location, date, time }: Props) => {
  return (
    <Link href={`/events/${slug}`} id="event-card" className="event-card">
      <Image
        src={image}
        alt={title}
        width={410}
        height={300}
        className="poster"
      />
      <div className="card-content">
        <MdOutlineLocationOn width={14} height={14} />
        <p>{location}</p>
      </div>
      <p className="truncate title">{title}</p>
      <div className="flex flex-row gap-2 justify-between">
        <div className="card-content">
          <FaRegCalendarAlt width={14} height={14} />
          <p>{date}</p>
        </div>
        <div className="card-content">
          <FaRegClock width={14} height={14} />
          <p>{time}</p>
        </div>
      </div>
    </Link>
  );
};
export default EventCard;
