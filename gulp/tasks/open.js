'use strict';

import open from 'open';

export default gulp => {
  gulp.task('open', () => {
    open(`${process.env.USE_SSL ? 'https' : 'http'}://localhost:${process.env.PORT}`);
  });
};