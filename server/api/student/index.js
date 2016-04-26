'use strict';

import {AsyncRouter} from 'express-async-router';
import * as controller from './student.controller';
import {hasRole, isAuthenticated} from '../../auth/auth.service';

const router = new AsyncRouter();

router.get('/', hasRole('teacher'), controller.index);
router.get('/me/topics', controller.topics);
router.get('/:id/topics', isAuthenticated(), controller.topics);

export default router;
