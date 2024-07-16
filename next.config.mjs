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
    swcMinify:true
};

export default nextConfig;
