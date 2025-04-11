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
        serverActions: {
            bodySizeLimit: '2mb',
        },
    },
    swcMinify: true,
    compress: true,
    reactStrictMode: true,
    typescript: {
        // During deployments we want to build even with TypeScript errors 
        // to avoid blocking critical deployments
        ignoreBuildErrors: true,
    },
    eslint: {
        // During deployments we don't want eslint to block the build
        ignoreDuringBuilds: true,
    },
};

// export default nextConfig;
export default withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
})(nextConfig);
