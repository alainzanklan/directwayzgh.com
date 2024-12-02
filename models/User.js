import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    role: {
      type: String,
    },
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

    resetToken: {
      type: String,
      required: false,
    },
    resetTokenExpires: {
      type: Date,
      required: false,
    },
  },
  { timestamp: true }
);

const User = models.User || model('User', UserSchema);

export default User;
