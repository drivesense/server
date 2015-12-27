'use strict';

import {AsyncRouter} from 'express-async-router';
import * as controller from './user.controller';
import {isAuthenticated} from '../../auth/auth.service';

const router = new AsyncRouter();

router.get('/', controller.index);
router.post('/', controller.create);
router.get('/me', isAuthenticated(), controller.me);
router.post('/:id/addRole', isAuthenticated(), controller.addRole);
router.post('/:id/removeRole', isAuthenticated(), controller.removeRole);
router.put('/:id/password', isAuthenticated(), controller.changePassword);
router.get('/:id', isAuthenticated(), controller.show);
router.put('/:id', isAuthenticated(), controller.update);
router.delete('/:id', isAuthenticated(), controller.destroy);

export default router;
