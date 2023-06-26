/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
          {
            source: '/(.*)',
            headers: [
              {
                key: 'Cross-Origin-Opener-Policy',
                value: 'same-origin-allow-popups',
              },
            ],
          },
        ];
      },

      webpack: (config) => {
        config.resolve.fallback = {
          fs: false,
          child_process: false,
          net: false,
          tls: false,
        };
    
        return config;
      },
}

module.exports = nextConfig
