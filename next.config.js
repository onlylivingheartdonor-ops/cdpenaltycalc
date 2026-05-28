/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'cdpenaltycalc.com' }],
        destination: 'https://www.cdpenaltycalc.com/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
