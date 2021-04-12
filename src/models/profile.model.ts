import { Schema, model } from 'mongoose';
import { Profile } from '../interfaces/profiles.interface';

const profileSchema: Schema = new Schema({
  age: {
    type: Number,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  linkedinUrl: {
    type: String,
    required: false,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: false,
    trim: true
  }
}, {
  versionKey: false,
  timestamps: true
});

profileSchema.index({ name: 1, lastName: 1 }, { unique: true });

export default model<Profile>('Profile', profileSchema);
