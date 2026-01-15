import type { NextConfig } from "next";

export const cacheLife = (profile: string) => {
  const profiles: Record<string, { stale: number; revalidate: number; expire: number }> = {
    hours: { stale: 60 * 60, revalidate: 60 * 60, expire: 3 * 60 * 60 },
  };
  return profiles[profile];
};

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  //This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
