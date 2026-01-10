import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <header>
      <nav>
        <Link href="/" className="logo flex items-center gap-2">
          <Image
            src="/icons/audience.svg"
            alt="logo"
            width={24}
            height={24}
            className="bg-white rounded-full"
          />
          <p>DevEvents</p>
        </Link>
        <ul>
          <Link href="/" className="px-3 py-2">
            Home
          </Link>
          <Link href="#" className="px-3 py-2">
            Events
          </Link>
          <Link href="#" className="px-3 py-2">
            Create Event
          </Link>
        </ul>
      </nav>
    </header>
  );
};
export default Navbar;
