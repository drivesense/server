'use strict';

import config from '../config';
import {createCertificate} from 'pem';
import file from 'gulp-file';
import {merge} from 'event-stream';
import _ from 'lodash';

export default gulp => {
  gulp.task('generate-certs', cb => {
    createCertificate({
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

      const streams = _.map(certs, cert => file(cert.name, cert.data, {src: true}));

      merge(streams)
        .pipe(gulp.dest(config.certs))
        .on('end', cb);
    });
  });
};