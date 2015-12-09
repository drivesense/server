'use strict';

import {} from 'dotenv/config';
import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import seeder from './config/seed';
import expressConfig from './config/express';
import sslConfig from './config/ssl';
import routes from './routes';
import logger from './components/logger';

mongoose.Promise = Promise;

mongoose.connect(process.env.MONGO_URI);

if (process.env.SEED_DB) {
  seeder();
}

const app = express();
const server = process.env.USE_SSL ? sslConfig(app) : http.createServer(app);

expressConfig(app);
routes(app);

server.listen(process.env.PORT, () => {
  logger.info('Express listening on port %s', process.env.PORT);
});

export default app;
