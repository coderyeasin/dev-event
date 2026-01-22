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
    <Link
      href={`/events/${slug}`}
      id="event-card"
      className="event-card max-w-[410px] w-full sm:w-[340px] md:w-[370px] lg:w-[410px]"
    >
      <Image
        src={image}
        alt={title}
        width={410}
        height={300}
        className="poster w-full h-44 sm:h-48 md:h-60 object-cover"
      />
      <div className="card-content px-3 pt-3">
        <MdOutlineLocationOn width={14} height={14} />
        <p className="truncate max-w-[140px] md:max-w-full">{location}</p>
      </div>
      <p className="truncate title px-3">{title}</p>
      <div className="flex flex-col sm:flex-row gap-2 justify-between px-3 pb-4">
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
