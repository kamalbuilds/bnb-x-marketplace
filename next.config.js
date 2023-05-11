module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'bafybeieizgygxn3cntvweblnsuooughosdqsk7rz34izx33nupsltstezu.ipfs.dweb.link',
          port: '',
          pathname: '/king.png',
        },
      ],      
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
  