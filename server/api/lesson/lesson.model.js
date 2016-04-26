'use strict';

import mongoose from 'mongoose';
import _ from 'lodash';
import {createSeedModel} from 'mongoose-plugin-seed';
import seed from './lesson.seed';
const Schema = mongoose.Schema;

const durations = _.times(7, i => 30 + i * 15);

const LessonSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
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
  comment: String,
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
});

export default createSeedModel('Lesson', LessonSchema, seed);