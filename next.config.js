/** @type {import('next').NextConfig} */
const dedicatedEndPoint = 'https://mintify.infura-ipfs.io';
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['mintify.infura-ipfs.io', 'ipfs.infura.io'],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

module.exports = nextConfig;