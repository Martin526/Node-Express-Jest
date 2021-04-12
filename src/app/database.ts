import mongoose, { ConnectionOptions } from 'mongoose';
import config from './config';

(
  async () => {
    const options: ConnectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    };

    const db = await mongoose.connect(`mongodb://${config.MONGO_DATABASE_IP}:${config.MONGO_DATABASE_IP}/${config.MONGO_DATABASE_NAME}`, options);

    console.log(`database connected to port: ${db.connection.name} `);
  }
)();
