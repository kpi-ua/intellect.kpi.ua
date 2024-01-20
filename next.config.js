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
    redirects: async () => {
        return [
            {
                source: '/api/:route*',
                destination: '/:route*',
                permanent: true,
            },
        ];
    },
    rewrites: async () => {
        return [
            {
                source: '/intellect/v2/sitemap',
                destination: 'https://api.campus.kpi.ua/intellect/v2/sitemap',
            },
        ];
    }
};

module.exports = nextConfig;
