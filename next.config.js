// @ts-check

/** 
 * @type {import('next').NextConfig} 
 **/

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["media.giphy.com", "lh3.googleusercontent.com", "images.unsplash.com", "s.gravatar.com"],
  },
}

module.exports = nextConfig
