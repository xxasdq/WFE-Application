/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: '/booking', destination: '/', permanent: false }];
  },
};

export default nextConfig;
