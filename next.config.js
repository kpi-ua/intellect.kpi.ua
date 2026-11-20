const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            { hostname: 'api.campus.kpi.ua' },
            { hostname: 'cdn.cloud.kpi.ua' },
        ],
    },
};

module.exports = withNextIntl(nextConfig);
