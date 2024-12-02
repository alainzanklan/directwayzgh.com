import { Schema, model, models } from 'mongoose';
import User from '@/models/User';

const MessageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    pro: {
      type: Schema.Types.ObjectId,
      ref: 'Pro',
      required: true,
    },

    name: {
      type: String,
      required: [true, 'name is required'],
    },
    email: {
      type: String,
      required: [true, 'email is required'],
    },
    phone: {
      type: String,
      required: [true, 'phone is required'],
    },
    body: {
      type: String,
      required: [true, 'body is required'],
    },

    read: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

const Message = models.Message || model('Message', MessageSchema);

export default Message;
