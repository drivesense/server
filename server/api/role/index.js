'use strict';

import {AsyncRouter} from 'express-async-router';
import * as controller from './role.controller';
import {hasPermissions} from '../../auth/auth.service';

const router = new AsyncRouter();

router.get('/', hasPermissions('read_roles'), controller.index);
router.get('/:id', hasPermissions('read_roles'), controller.show);
router.post('/', hasPermissions('write_roles'), controller.create);
router.put('/:id', hasPermissions('write_roles'), controller.update);
router.delete('/:id', hasPermissions('write_roles'), controller.destroy);

export default router;