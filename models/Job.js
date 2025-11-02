import { Schema, model, models } from 'mongoose';

const JobSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    title: {
      type: String,
    },
    type: {
      type: String,
    },
    description: {
      type: String,
    },
     images: [
      {
        type: String,
      },
    ],
    location: {
      type: String,
    },
    price: {
      type: String,
    },
    company: {
      type: String,
    },
    contactEmail: {
      type: String,
    },
    contactPhone: {
      type: String,
    },
  },

  { timestamps: true }
);

const Job = models.Job || model('Job', JobSchema);

export default Job;
