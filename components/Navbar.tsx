"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  // { href: "#", label: "Events" },
  { href: "/create-event", label: "Create Event" },
  { href: "/booking", label: "Booking Lists" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full">
      <nav className="glass sticky top-0 z-50 flex flex-row justify-between items-center px-6 py-4">
        <Link href="/" className="logo flex items-center gap-2">
          <Image
            src="/icons/audience.svg"
            alt="logo"
            width={24}
            height={24}
            className="bg-white rounded-full"
          />
          <p className="font-bold text-lg text-TextPrimary">DevEvents</p>
        </Link>
        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="px-3 py-2 rounded hover:bg-teal-900/30 transition-colors text-TextPrimary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        {/* Hamburger Icon */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded bg-teal-900/80 text-white focus:outline-none"
          aria-label="Open menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span
            className="block w-6 h-0.5 bg-white mb-1 rounded transition-all"
            style={{
              transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none",
            }}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white mb-1 rounded transition-all ${menuOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className="block w-6 h-0.5 bg-white rounded transition-all"
            style={{
              transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none",
            }}
          ></span>
        </button>
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-16 right-4 w-48 bg-teal-900/95 rounded-lg shadow-lg flex flex-col items-start p-4 md:hidden animate-fade-in z-50">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="w-full px-3 py-2 rounded hover:bg-teal-700/60 text-white mb-1"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
