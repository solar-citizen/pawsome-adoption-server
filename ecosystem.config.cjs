module.exports = {
  apps: [
    {
      name: 'pawsome-server',
      script: './dist/index.cjs',
      env: {
        NODE_ENV: 'production',
      },
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '1G',
      error_file: './logs/pm2-err.log',
      out_file: './logs/pm2-out.log',
      log_file: './logs/pm2-combined.log',
    },
  ],
};
