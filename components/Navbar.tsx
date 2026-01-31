"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/create-event", label: "Create Event" },
  { href: "/booking", label: "Booking Lists" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();

  // Dropdown close on blur
  const handleDropdownBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDropdownOpen(false);
    }
  };
  const profileSrc =
    session?.user?.profileImg ?? session?.user?.image ?? "/icons/audience.svg";

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
        <ul className="hidden md:flex gap-2 items-center">
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
          {/* Show spinner */}
          {status === "loading" ? (
            <li>
              <div className="flex items-center justify-center w-12 h-12">
                <span
                  className="inline-block w-7 h-7 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"
                  aria-label="Loading"
                ></span>
              </div>
            </li>
          ) : !session?.user ? (
            <li>
              <Link
                href="/login"
                className="px-3 py-2 rounded bg-teal-700 text-white hover:bg-teal-800 transition-colors"
              >
                Login
              </Link>
            </li>
          ) : (
            <li className="relative">
              <div className="relative">
                <button
                  className={
                    "flex items-center focus:outline-none transition-shadow cursor-pointer w-12 h-12 rounded-full "
                  }
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  aria-label="User menu"
                  type="button"
                  tabIndex={0}
                >
                  <Image
                    src={profileSrc}
                    alt="profile"
                    width={40}
                    height={40}
                    priority
                    className="rounded-full ring-2 ring-teal-500 object-cover"
                  />
                </button>
                <div
                  ref={dropdownRef}
                  className={`absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-teal-100 z-50 transition-all duration-200 ease-in-out ${
                    dropdownOpen
                      ? "opacity-100 scale-100 pointer-events-auto"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                  tabIndex={-1}
                  aria-hidden={!dropdownOpen}
                  onBlur={handleDropdownBlur}
                >
                  <div className="flex flex-col items-center p-4 border-b border-teal-100">
                    <Image
                      src={profileSrc}
                      alt="profile"
                      width={48}
                      height={48}
                      priority
                      className="rounded-full border border-teal-700 mb-2 object-cover"
                    />
                    <span className="font-semibold text-teal-900 text-base">
                      {session?.user?.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {session?.user?.email}
                    </span>
                  </div>
                  <button
                    className="w-full py-2 cursor-pointer text-center text-red-600 hover:bg-teal-50 rounded-b-lg transition-colors font-semibold"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </li>
          )}
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
            {/* Mobile: login/profile */}
            {!session?.user ? (
              <Link
                href="/login"
                className="w-full px-3 py-2 rounded bg-teal-700 text-white hover:bg-teal-800 transition-colors mt-2"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            ) : (
              <div className="w-full mt-2">
                <button
                  className="flex items-center gap-2 w-full px-3 py-2 rounded bg-white text-teal-900 border border-teal-700 hover:bg-teal-50"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                >
                  <Image
                    src={session.user.profileImg || "/icons/audience.svg"}
                    alt="profile"
                    width={28}
                    height={28}
                    className="rounded-full border border-teal-700"
                  />
                  <span>{session.user.name}</span>
                </button>
                {dropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="mt-2 w-full bg-white rounded-lg shadow-lg border border-teal-100 z-50 animate-fade-in"
                  >
                    <div className="flex flex-col items-center p-4 border-b border-teal-100">
                      <Image
                        src={session.user.profileImg || "/icons/audience.svg"}
                        alt="profile"
                        width={40}
                        height={40}
                        className="rounded-full border border-teal-700 mb-2"
                      />
                      <span className="font-semibold text-teal-900 text-base">
                        {session.user.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {session.user.email}
                      </span>
                    </div>
                    <button
                      className="w-full py-2 text-center text-red-600 hover:bg-teal-50 rounded-b-lg transition-colors font-semibold"
                      onClick={() => signOut({ callbackUrl: "/" })}
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
