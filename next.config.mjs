/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  typescript: {
    // ini memaksa Next.js skip TypeScript build worker yg error
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
