/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        api: "http://localhost:5000",
    },
    images: {
        domains: ["cdn.discordapp.com"],
    },
};

module.exports = nextConfig;
