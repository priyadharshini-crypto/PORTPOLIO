import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createApp } from './server/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const PORT = process.env.PORT || 5000;
const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  console.error('\nMissing MONGODB_URI.');
  console.error(`Create a file named .env in ${__dirname} (copy .env.example) and set:`);
  console.error('MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/portfolio\n');
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI, { serverSelectionTimeoutMS: 15000 })
  .then(() => {
    console.log('MongoDB connected');
    createApp().listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('\nMongoDB connection failed:', err.message);
    console.error('Check: 1) Atlas -> Network Access allows your IP (or 0.0.0.0/0)');
    console.error('       2) the username/password in MONGODB_URI are correct');
    console.error('       3) the connection string starts with mongodb+srv:// and has no < > brackets\n');
    process.exit(1);
  });
