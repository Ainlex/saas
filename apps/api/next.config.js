/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@contafacil/database', '@contafacil/shared', '@contafacil/auth', '@contafacil/modules'],
}

module.exports = nextConfig 