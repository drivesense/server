import mongoose from 'mongoose';
import {createSeedModel} from 'mongoose-plugin-seed';
import seed from './topic.seed';
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  locations: [{
    type: [Number],
    index: '2dsphere'
  }]
});

export default createSeedModel('Topic', TopicSchema, seed);