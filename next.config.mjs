const nextConfig = {
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname:'cdn.sanity.io',
        port: "",
      },
    ],
  },
};

export default nextConfig;
