module.exports = {
  apps: [{
      name: 'voguedecnxt',
      script: 'node_modules/next/dist/bin/next',
      args: 'start', // Set your app's working directory
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: '1G',
     env: {
  NODE_ENV: 'development',
  PORT: 3000,
  ORIGIN: "http://localhost:3000",
  BODY_SIZE_LIMIT: 0
},
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        ORIGIN: "http://morskoi-koktail.ru",
        BODY_SIZE_LIMIT: 0
      },
  }, ],
};