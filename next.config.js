const nextTranslate = require('next-translate');
require('next-pwa');

module.exports = nextTranslate({
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
});
