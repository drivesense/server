'use strict';

import {AsyncRouter} from 'express-async-router';
import * as controller from './school.controller';
import {isAdmin} from '../../auth/auth.service';

const router = new AsyncRouter();

router.get('/', isAdmin(), controller.index);
router.post('/', isAdmin(), controller.create);
router.put('/:id', isAdmin(), controller.update);

export default router;
