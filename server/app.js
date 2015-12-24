'use strict';

import {} from 'dotenv/config';
import mongoose from 'mongoose';
import mongooseConfig from './config/mongoose';
import http from 'http';
import express from 'express';
import expressConfig from './config/express';
import sslConfig from './config/ssl';
import logger from './components/logger';

mongooseConfig(mongoose);
mongoose.connect(process.env.MONGO_URI);

const app = express();
const server = process.env.USE_SSL ? sslConfig(app) : http.createServer(app);

expressConfig(app);

server.listen(process.env.PORT, () => {
  logger.info('Express listening on port %s', process.env.PORT);
});

export default app;
