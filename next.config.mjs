/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.curanest.com.vn/api/v1/:path*", 
      },
    ];
  },
};

export default nextConfig;
