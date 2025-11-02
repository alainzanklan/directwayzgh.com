import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

// PUT /api/messages/[id] - Toggle read status
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userId } = sessionUser;
    const { id } = params;

    const message = await Message.findById(id);
    if (!message) {
      return Response.json({ error: 'Message not found' }, { status: 404 });
    }

    // Only recipient can mark messages as read/unread
    if (message.recipient.toString() !== userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Toggle read status
    message.read = !message.read;
    await message.save();

    return Response.json({ 
      success: true, 
      read: message.read,
      messageId: message._id 
    });

  } catch (error) {
    console.error('Error updating message:', error);
    return Response.json({ error: 'Failed to update message' }, { status: 500 });
  }
};

// DELETE /api/messages/[id] - Delete message
export const DELETE = async (request, { params }) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userId } = sessionUser;
    const { id } = params;

    const message = await Message.findById(id);
    if (!message) {
      return Response.json({ error: 'Message not found' }, { status: 404 });
    }

    // Users can only delete messages they sent or received
    const isSender = message.sender.toString() === userId;
    const isRecipient = message.recipient.toString() === userId;
    
    if (!isSender && !isRecipient) {
      return Response.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await Message.findByIdAndDelete(id);

    return Response.json({ success: true, messageId: id });

  } catch (error) {
    console.error('Error deleting message:', error);
    return Response.json({ error: 'Failed to delete message' }, { status: 500 });
  }
};