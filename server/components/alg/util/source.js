import User from '../../../api/user/user.model';
import Lesson from '../../../api/lesson/lesson.model';

export function getStudents(teacher) {
  return User.find({type: 'student'})
    .then(students => {
      return Promise.all(students.map(student => {
        return Lesson.getProgress(student._id)
          .then(progress => {
            student.progress = progress;

            return student;
          })
      }))
    });
}
