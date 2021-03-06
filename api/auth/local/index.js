'use strict';

import {Router} from 'express';
import * as controller from './controller';

const router = new Router();

router.post('/', controller.index);

export default router;