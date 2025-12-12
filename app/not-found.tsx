"use client";
import Link from "next/link";
import React from "react";

const NotFound: React.FC = () => {
  return (
    <html>
      <body className="flex flex-col items-center justify-center min-h-screen bg-white">
        <h1 className="text-5xl font-bold text-blue-700 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="px-6 py-2 rounded bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors"
        >
          Go Home
        </Link>
      </body>
    </html>
  );
};

export default NotFound;
