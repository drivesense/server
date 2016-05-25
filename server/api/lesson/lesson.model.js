import mongoose from 'mongoose';
import _ from 'lodash';
import {createSeedModel} from 'mongoose-plugin-seed';
import seed from './lesson.seed';
const Schema = mongoose.Schema;

const durations = _.times(7, i => 30 + i * 15);

const LessonSchema = new Schema({
  participants: [{
    student: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    progress: [{
      topic: {
        type: Schema.Types.ObjectId,
        ref: 'Topic',
        required: true
      },
      grade: {
        type: Number,
        min: 1,
        max: 10,
        required: true
      }
    }]
  }],
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    enum: durations,
    required: true
  },
  comment: String
});

LessonSchema.methods.getStudents = function () {
  return _.map(this.participants, 'student');
};

LessonSchema.statics.getProgress = function (id) {
  return this.find({'participants.student': id})
    .sort('-date')
    .populate('participants.progress.topic')
    .then(lessons => {
      return _.reduce(lessons, (total, lesson) => {
        const participant = _.find(lesson.participants, p => p.student.equals(id));

        if (!participant) {
          return total;
        }

        participant.progress.forEach(p => {
          const id = p.topic._id.toString();

          total[id] = total[id] || {
              topic: p.topic,
              grade: p.grade,
              date: lesson.date
            };
        });

        return total;
      }, {});
    });
};

export default createSeedModel('Lesson', LessonSchema, seed);