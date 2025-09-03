

// 1. MODÈLES MONGODB - models/Booking.js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  proId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pro',
    required: true
  },
  client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

  appointment: {
    date: { type: String, required: true }, // YYYY-MM-DD
    time: { type: String, required: true }, // HH:MM
    service: { type: String, required: true },
    notes: String
  },
  payment: {
    amount: { type: Number, required: true },
    currency: { type: String, default: 'GHS' },
    paystack_reference: String,
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending'
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema);