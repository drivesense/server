'use strict';

import {AsyncRouter} from 'express-async-router';
import * as controller from './lesson.controller';
import {isAuthenticated, hasRole} from '../../auth/auth.service';

const router = new AsyncRouter();

router.get('/', isAuthenticated(), controller.index);
router.post('/', hasRole('teacher'), controller.create);

export default router;
