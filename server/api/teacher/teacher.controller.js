import moment from 'moment';
import User from '../user/user.model';
import {getLessons} from '../../components/alg';

export function index() {
  return User.find({type: 'teacher'}).populate('school');
}

export function schedule(req) {
  return getLessons(moment(req.body.date), req.user);
}
