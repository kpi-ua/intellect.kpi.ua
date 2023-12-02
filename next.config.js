/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                hostname: 'api.campus.kpi.ua',
            },
        ],
    },
};

module.exports = nextConfig;
