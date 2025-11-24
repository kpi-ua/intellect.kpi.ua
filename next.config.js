/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            { hostname: 'api.campus.kpi.ua' },
            { hostname: 'dlo9mnni15sun.cloudfront.net' },
            { hostname: 'do4rt9wur3t6m.cloudfront.net' },
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
