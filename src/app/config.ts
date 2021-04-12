import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 3000,
  MONGO_DATABASE_NAME: process.env.MONGO_DATABASE_NAME || 'admin',
  MONGO_DATABASE_PORT: process.env.MONGO_DATABASE_PORT || 'admin',
  MONGO_DATABASE_IP: process.env.MONGO_DATABASE_IP || '27017'
};
