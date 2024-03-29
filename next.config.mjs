/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
          },
        ],
      },
};

export default nextConfig;
