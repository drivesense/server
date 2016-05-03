import Topic from './topic.model';

// Get list of users
export function index () {
  return Topic.find({});
}
