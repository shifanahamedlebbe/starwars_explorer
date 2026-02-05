module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            store: './src/store',
            services: './src/services',
          },
        },
      ],
    ],
  };
};
