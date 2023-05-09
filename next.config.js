module.exports = {
    images: {
      loader: 'custom',
    },
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.module.rules.push({
          test: /ipfs:\/\//,
          use: [
            {
              loader: 'file-loader',
              options: {
                publicPath: '/_next',
                name: 'static/media/[name].[hash].[ext]',
              },
            },
          ],
        });
      }
      return config;
    },
  };
  