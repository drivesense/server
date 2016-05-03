import mongoose from 'mongoose';
import {createSeedModel} from 'mongoose-plugin-seed';
import seed from './topic.seed';
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  priority: {
    type: Number,
    min: 1,
    max: 10,
    required: true
  }
});

export default createSeedModel('Topic', TopicSchema, seed);