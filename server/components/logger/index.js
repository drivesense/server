'use strict';

import bunyan from 'bunyan';

export default bunyan.createLogger({
  name: 'Drivesense',
  src: true,
  serializers: {
    req: bunyan.stdSerializers.req,
    err: bunyan.stdSerializers.err
  },
  streams: [
    {
      level: 'info',
      stream: process.stdout
    },
    {
      level: 'error',
      path: 'errors.log'
    }
  ]
});