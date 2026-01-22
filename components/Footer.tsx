import Image from "next/image";

export interface ListTypes {
  items: string[];
  activeItems: string;
  className?: string;
}

const ListStyleBox: React.FC<ListTypes> = ({
  items,
  activeItems,
  className,
}) => {
  return (
    <div>
      <nav
        className={`list-none flex gap-5 font-poppins text-xl cursor-pointer ${className}`}
      >
        {items.map((item, i) => (
          <li
            key={i}
            className={item === activeItems ? "text-teal-700" : "text-slate-50"}
          >
            {item}
          </li>
        ))}
      </nav>
    </div>
  );
};

const Footer = () => {
  const navItems: string[] = ["Events", "Create Event", "Booking"];
  const langItems: string[] = ["En", "Es", "Fr", "De", "Ru"];

  return (
    <footer className="bg-teal-900/20 w-full pt-8 pb-2 mt-10">
      {/* Top Section */}
      <section className="flex flex-col lg:flex-row lg:justify-around lg:items-center gap-8 lg:gap-0 px-4 md:px-0">
        <div className="flex gap-3 items-center justify-center">
          <Image
            src="/icons/audience.svg"
            alt="logo"
            width={40}
            height={40}
            className="bg-white rounded-full"
          />
          <h3 className="text-3xl md:text-5xl font-bold text-TextPrimary">
            DevEvents
          </h3>
        </div>
        <div className="flex justify-center">
          <input
            type="email"
            name="email"
            id="email"
            className="border-0 outline-none ring-0 focus:outline-none focus:ring-0 focus:border-0 bg-teal-700 rounded-[30px] px-4 py-3 w-60 md:w-auto"
            placeholder="Enter your email address"
          />
        </div>
        <div className="flex justify-center">
          <ListStyleBox
            items={langItems}
            activeItems="En"
            className="bg-transparent text-2xl md:text-3xl"
          />
        </div>
      </section>
      {/* Bottom Section */}
      <section className="flex flex-col md:flex-row md:justify-evenly md:items-center gap-8 md:gap-0 py-8 px-4 md:px-0">
        <div className="space-y-6 md:space-y-10 flex flex-col items-center md:items-start">
          <div>
            <h3 className="font-poppins font-medium text-lg md:text-xl text-TextPrimary pb-2 md:pb-3">
              Contact Us
            </h3>
            <p className="font-poppins text-base md:text-xl text-TextPrimary">
              +1 (999) 888-77-66
            </p>
            <p className="font-poppins text-base md:text-xl text-TextPrimary">
              hello@niskalastd.com
            </p>
          </div>
          <div>
            <h3 className="font-poppins font-medium text-lg md:text-xl text-TextPrimary pb-2 md:pb-3">
              Locations
            </h3>
            <p className="font-poppins text-base md:text-xl text-TextPrimary">
              483920, Indonesia,
            </p>
            <p className="font-poppins text-base md:text-xl text-TextPrimary">
              Lampung 22/2/5, Office 4
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <ListStyleBox
            items={navItems}
            activeItems="Events"
            className="bg-transparent"
          />
        </div>
      </section>
      <div className="py-2 text-center text-xs text-TextPrimary mt-4">
        &copy; 2026 DevEvents. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
