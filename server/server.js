const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('@babel/register')({
  presets: ['@babel/preset-react'],
});

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 SHUTTING DOWN..');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    // console.log(conn.connections);
    console.log('DB connection successful!');
  })
  .catch((err) => console.error('Mongo error:', err));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDELED REJECTION! 💥 SHUTTING DOWN..');
  server.close(() => {
    process.exit(1);
  });
});
