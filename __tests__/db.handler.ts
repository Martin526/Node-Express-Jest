import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

const mongod = new MongoMemoryServer({ binary: { version: '4.4.4' } });

const connect = async (): Promise<void> => {
  const uri = await mongod.getUri();
  // const port = await mongod.getPort();
  // const dbPath = await mongod.getDbPath();
  // const dbName = await mongod.getDbName();

  const mongooseOpts = {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    useCreateIndex: true
  };

  await mongoose.connect(uri, mongooseOpts);
};

const closeDatabase = async (): Promise<void> => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

const clearDatabase = async (): Promise<void> => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

export default {
  connect,
  closeDatabase,
  clearDatabase
};
