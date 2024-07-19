import withBundleAnalyzer from '@next/bundle-analyzer';
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.microlink.io',
                port: '',
                pathname: '/**',
            },
        ],
    },
    experimental: {
        serverComponentsExternalPackages: ['pdf2json'],
    },
    swcMinify: true,
    compress: true,
    reactStrictMode: true,
};

// export default nextConfig;
export default withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
})(nextConfig);
