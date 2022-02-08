import mongoose from 'mongoose'
import { CollectionNames } from '../../common/common.model';

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, unique: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, collection: CollectionNames.USERS }
);

export const User = mongoose.model(CollectionNames.USERS, UserSchema);