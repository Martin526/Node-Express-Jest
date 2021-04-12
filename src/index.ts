import app from './app/app';
import './app/database';
import config from './app/config';

app.listen(config.PORT, () => {
  console.log(`server listen port ${config.PORT}`);
});
