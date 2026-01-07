"use client";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black/20 px-5 border-4 border-slate-900 rounded-br-4xl">
      <h1 className="text-5xl font-bold text-blue-700 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-white mb-2">Page Not Found</h2>
      <p className="mb-6 text-white">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-2 rounded bg-teal-600 text-white font-semibold hover:bg-teal-800 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
