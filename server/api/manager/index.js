import {AsyncRouter} from 'express-async-router';
import * as controller from './manager.controller';
import {hasRole} from '../../auth/auth.service';

const router = new AsyncRouter();

router.get('/', hasRole('admin'), controller.index);

export default router;
