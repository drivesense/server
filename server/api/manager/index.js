'use strict';

import {AsyncRouter} from 'express-async-router';
import * as controller from './manager.controller';
import {isAuthenticated} from '../../auth/auth.service';

const router = new AsyncRouter();

router.get('/', isAuthenticated(), controller.index);

export default router;
