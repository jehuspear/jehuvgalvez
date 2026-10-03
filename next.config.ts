import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  async headers() {
    return [
      ...["/projects/:path*", "/recognition/:path*", "/about/:path*", "/icons/:path*"].map(source => ({
        source,
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, s-maxage=86400" }],
      })),
      {
        // The directory hash changes whenever any encoded Hero frame changes.
        source: "/hero/jehu-hero-sequence-web-:version([a-f0-9]{12})/:variant(sequence|sequence-mobile)/:file",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/resume/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=300, s-maxage=3600" }],
      },
    ];
  },
};

export default nextConfig;
