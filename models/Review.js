import { Schema, models, model } from 'mongoose';

const ReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  Pro: {
    type: Schema.Types.ObjectId,
    ref: 'Pro',
    required: true,
  },

  rating: {
    type: Number,
  },

  comment: {
    type: String,
  },
});

const Review = models.Review || model('Review', ReviewSchema);

export default Review;
