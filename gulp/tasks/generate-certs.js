'use strict';

import config from '../config';
import pem from 'pem';
import file from 'gulp-file';
import es from 'event-stream';
import _ from 'lodash';

export default gulp => {
  gulp.task('generate-certs', cb => {
    pem.createCertificate({
      days: 3650,
      selfSigned: true
    }, (err, keys) => {
      if (err) {
        return cb(err);
      }

      const certs = [
        {
          name: 'server.key',
          data: keys.serviceKey
        }, {
          name: 'server.crt',
          data: keys.certificate
        }, {
          name: 'server.csr',
          data: keys.csr
        }
      ];

      const streams = _.map(certs, cert => {
        return file(cert.name, cert.data, {src: true});
      });

      es.merge(streams)
        .pipe(gulp.dest(config.certs))
        .on('end', cb);
    });
  });
};