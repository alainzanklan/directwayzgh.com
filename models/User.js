import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: [true, 'Email already exist'],
      // required: [true, 'Email is required'],
    },

    password: {
      type: String,
    },

    profile: {
      firstName: {
        type: String,
        trim: true,
      },
      lastName: {
        type: String,
        trim: true,
      },
    },
  },
  { timestamp: true }
);

const User = models.User || model('User', UserSchema);

export default User;
