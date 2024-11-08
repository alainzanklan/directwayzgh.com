import { Schema, model, models } from 'mongoose';

const ProSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    Service: {
      type: String,
    },

    introduction: {
      type: String,
    },

    reviews: [{ type: String }],

    location: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zipcode: {
        type: String,
      },
    },

    employees: {
      type: String,
    },

    year_in_business: {
      type: String,
    },

    company_info: {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      number: {
        type: Number,
      },
    },

    featured_project: [
      {
        type: String,
      },
    ],

    profile_image: {
      type: String,
    },

    background: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Pro = models.Pro || model('Pro', ProSchema);

export default Pro;
