import connectDB from '@/config/database';
import Message from '@/models/Message';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';
import  { sendReplyEmail } from '@/utils/emailService.js';

export const dynamic = 'force-dynamic';

// POST /api/messages/reply
export const POST = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userId } = sessionUser;
    const { conversationId, replyText, recipientEmail } = await request.json();

    // Validate input
    if (!conversationId || !replyText?.trim() || !recipientEmail) {
      return Response.json({ 
        error: 'Conversation ID, reply text, and recipient email are required' 
      }, { status: 400 });
    }

    // Find the original conversation to get details
    const originalMessage = await Message.findOne({ 
      conversationId,
      $or: [{ sender: userId }, { recipient: userId }]
    })
    .populate('pro', 'type')
    .populate('sender', 'name username email')
    .populate('recipient', 'name username email');

    if (!originalMessage) {
      return Response.json({ error: 'Conversation not found' }, { status: 404 });
    }

    // Determine who we're replying to
    const isCurrentUserSender = originalMessage.sender._id.toString() === userId;
    const recipientId = isCurrentUserSender ? originalMessage.recipient._id : originalMessage.sender._id;
    const otherPerson = isCurrentUserSender ? originalMessage.recipient : originalMessage.sender;

    // Get current user details
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    // Create reply message
    const replyMessage = new Message({
      sender: userId,
      recipient: recipientId,
      pro: originalMessage.pro._id,
      name: currentUser.name || currentUser.username || 'Support',
      email: currentUser.email || 'noreply@example.com',
      phone: currentUser.phone || '',
      body: replyText.trim(),
      conversationId,
      messageType: 'reply',
      read: false
    });

    await replyMessage.save();

    // Send email notification
    try {
      const subject = `Re: ${originalMessage.pro?.type || 'Your Inquiry'}`;
      const senderName = currentUser.name || currentUser.username || 'Support Team';
      
      const emailResult = await sendReplyEmail(
        recipientEmail,
        otherPerson.name,
        subject,
        replyText.trim(),
        senderName
      );

      if (!emailResult.success) {
        console.warn('Email sending failed:', emailResult.error);
        // Don't fail the whole operation if email fails
      }
    } catch (emailError) {
      console.warn('Email service error:', emailError);
      // Continue anyway
    }

    return Response.json({ 
      success: true,
      message: 'Reply sent successfully',
      replyId: replyMessage._id
    });

  } catch (error) {
    console.error('Error sending reply:', error);
    return Response.json({ error: 'Failed to send reply' }, { status: 500 });
  }
};