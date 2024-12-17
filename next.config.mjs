const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // domains: ['images.unsplash.com', 'media.istockphoto.com', 'plus.unsplash.com', "images.pexels.com", "i.pinimg.com", "placehold.co", "localhost"],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ]
  },
}

export default nextConfig;