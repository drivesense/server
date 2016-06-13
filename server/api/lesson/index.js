import {AsyncRouter} from 'express-async-router';
import * as controller from './lesson.controller';
import {isAuthenticated, hasRole} from '../../auth/auth.service';

const router = new AsyncRouter();

router.get('/', isAuthenticated(), controller.index);
router.put('/:id', hasRole('teacher'), controller.update);
router.post('/schedule', hasRole('teacher'), controller.schedule);

export default router;
