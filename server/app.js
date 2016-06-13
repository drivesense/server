import 'dotenv/config';
import mongoose from 'mongoose';
import mongooseConfig from './config/mongoose';
import express from 'express';
import expressConfig from './config/express';
import logger from './components/logger';
import {test} from './components/alg';

const app = express();

expressConfig(app);

mongooseConfig(mongoose)
  .then(() => {
    app.listen(process.env.PORT, () => {
      logger.info('Express listening on port %s', process.env.PORT);
    });

    if (process.env.USE_TEST === 'true') {
      test()
        .catch(err => {
          logger.error({err});
        });
    }
  });

mongoose.connect(process.env.MONGO_URI);

export default app;
