/** @type {import('next').NextConfig} */

const nextTranslate = require('next-translate-plugin')

const nextConfig = nextTranslate({
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config;
  },
  reactStrictMode: true,
});

module.exports = nextConfig
