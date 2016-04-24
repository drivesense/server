'use strict';

import {AsyncRouter} from 'express-async-router';
import * as controller from './student.controller';
import {hasRole} from '../../auth/auth.service';

const router = new AsyncRouter();

router.get('/', hasRole('teacher'), controller.index);

export default router;
