import {AsyncRouter} from 'express-async-router';
import * as controller from './teacher.controller';
import {isAuthenticated} from '../../auth/auth.service';

const router = new AsyncRouter();

router.get('/', isAuthenticated(), controller.index);

export default router;
