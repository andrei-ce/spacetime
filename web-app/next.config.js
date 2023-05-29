/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', '192.168.0.2'],
    // remotePatterns: [
    //   {
    //     protocol: 'http',
    //     hostname: 'avatars.githubusercontent.com',
    //     port: '',
    //     pathname: '/u/**',
    //   },
    // ],
  },
}

module.exports = nextConfig
