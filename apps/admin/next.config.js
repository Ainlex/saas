/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@contafacil/ui', '@contafacil/auth', '@contafacil/database', '@contafacil/shared'],
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3001',
    API_URL: process.env.API_URL || 'http://localhost:3002'
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_URL || 'http://localhost:3002'}/api/:path*`
      }
    ];
  }
};

module.exports = nextConfig; 