/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            { hostname: 'api.campus.kpi.ua' },
            { hostname: 'cdn.cloud.kpi.ua' },
        ],
    },
    rewrites: async () => {
        return [
            {
                source: '/sitemap',
                destination: `${process.env.NEXT_PUBLIC_API_URL}/intellect/v2/sitemap`,
            },
        ];
    },
};

module.exports = nextConfig;
