'use strict';

import fs from 'fs';
import https from 'https';

export default app => {
  const credentials = {
    key: fs.readFileSync('server/config/certs/server.key'),
    cert: fs.readFileSync('server/config/certs/server.crt')
  };

  return https.createServer(credentials, app);
};