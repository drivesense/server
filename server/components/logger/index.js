'use strict';

import bunyan from 'bunyan';
import BunyanFormatter from './formatter';

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
      stream: new BunyanFormatter(process.stdout)
    },
    {
      level: 'error',
      stream: new BunyanFormatter(process.stderr)
    }
  ]
});