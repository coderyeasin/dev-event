import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <header>
      <nav>
        <Link href="/" className="logo">
          {/*<Image src={} alt='logo' width={24} height={24} />*/}
          <p>DevEvent</p>
        </Link>
        <ul>
          <Link href="/" className="px-3 py-1">
            Home
          </Link>
          <Link href="/" className="px-3 py-1">
            Events
          </Link>
          <Link href="/" className="px-3 py-1">
            Create Event
          </Link>
        </ul>
      </nav>
    </header>
  );
};
export default Navbar;
