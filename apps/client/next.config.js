/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@contafacil/ui',
    '@contafacil/auth',
    '@contafacil/shared',
    '@contafacil/modules'
  ],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    
    return config
  },
}

module.exports = nextConfig 