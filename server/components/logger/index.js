'use strict';

import bunyan from 'bunyan';
import format from 'bunyan-format';

const debug = std => {
  return std.isTTY ? format({outputMode: 'short', out: std}) : std;
};

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
      stream: debug(process.stdout)
    },
    {
      level: 'error',
      stream: debug(process.stderr)
    }
  ]
});