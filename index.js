const { sequelize } = require('./config/sequelize');
// Ensure models are registered before sync
require('./api/models/Url');
const app = require('./config/express');

async function start() {
  await sequelize.authenticate();

  if (process.env.NODE_ENV === 'development') {
    await sequelize.sync();
  }

  const port = parseInt(process.env.PORT, 10) || 3000;
  app.listen(port, () => {
    console.log(`The server is running at localhost:${port}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
