module.exports = {
  apps: [
    {
      name: 'gymclass',
      script: './dist/server.js',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
