import { Schema, model, models } from 'mongoose';

const MessageSchema = new Schema(
  {
    // Core message data
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

    // Contact information
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: '',
    },
    
    // Message content
    body: {
      type: String,
      required: true,
    },

    // Simple read status
    read: {
      type: Boolean,
      default: false,
    },

    // Threading - keep it simple
    conversationId: {
      type: String,
      required: true,
      index: true,
    },

    // Message type
    messageType: {
      type: String,
      enum: ['original', 'reply'],
      default: 'original',
    },
  },
  { 
    timestamps: true,
    // Add helpful virtual fields
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Helper method to generate conversation ID
MessageSchema.statics.generateConversationId = function(senderId, recipientId, proId) {
  const ids = [senderId, recipientId, proId].sort();
  return ids.join('-');
};

// Index for performance
MessageSchema.index({ conversationId: 1, createdAt: -1 });
MessageSchema.index({ recipient: 1, read: 1 });
MessageSchema.index({ sender: 1, createdAt: -1 });

const Message = models.Message || model('Message', MessageSchema);

export default Message;