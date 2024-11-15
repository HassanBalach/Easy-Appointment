/** @type {import('next').NextConfig} */
const nextConfig = {
    // ... existing configuration ...
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                pathname: '/**', // or you can specify a more specific path if needed
            },
        ],
    },
    // ... existing configuration ...
};

export default nextConfig;
