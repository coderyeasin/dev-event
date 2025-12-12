"use client";
import React from "react";

// TypeScript props for Next.js global error boundary
type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const GlobalError: React.FC<GlobalErrorProps> = ({ error, reset }) => {
  return (
    <html>
      <body className="flex flex-col items-center justify-center min-h-screen bg-white">
        <h2 className="text-2xl font-bold text-red-700 mb-4">
          Something went wrong!
        </h2>
        <pre className="text-gray-800 bg-gray-100 p-4 rounded-lg max-w-xl break-words mb-4">
          {error.message}
        </pre>
        <button
          onClick={reset}
          className="mt-2 px-6 py-2 rounded bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors"
        >
          Try again
        </button>
      </body>
    </html>
  );
};

export default GlobalError;
