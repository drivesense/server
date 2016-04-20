'use strict';

import mongoose from 'mongoose';
import {createSeedModel} from 'mongoose-plugin-seed';
import seed from './lesson.seed';
const Schema = mongoose.Schema;

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
  }
});

export default createSeedModel('Lesson', LessonSchema, seed);