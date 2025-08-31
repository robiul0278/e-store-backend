import { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';
import config from './config';

let server: Server;

async function main() {
try {
  await mongoose.connect(config.database_url);
  console.log("✅ Database connected successfully");

  server = app.listen(config.port, () => {
    console.log(`🚀 Server running on port ${config.port}`);
  });
} catch (error) {
  console.error("❌ Failed to connect to database", error);
}

}

main();


process.on('unhandledRejection', () => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});