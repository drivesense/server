'use strict';

import {AsyncRouter} from 'express-async-router';
import * as controller from './lesson.controller';
import {isAuthenticated} from '../../auth/auth.service';

const router = new AsyncRouter();

router.get('/', isAuthenticated(), controller.index);
router.post('/', isAuthenticated(), controller.create);

export default router;
