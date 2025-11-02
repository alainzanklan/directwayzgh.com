import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

// GET /api/messages - Fetch all conversations for current user
export const GET = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userId } = sessionUser;

    // Get all messages where user is involved
    const messages = await Message.find({
      $or: [
        { sender: userId },
        { recipient: userId }
      ]
    })
    .populate('sender', 'name username email')
    .populate('recipient', 'name username email')
    .populate('pro', 'type')
    .sort({ createdAt: -1 })
    .lean();

    // Group by conversation
    const conversationMap = new Map();

    messages.forEach(message => {
      const { conversationId } = message;
      
      if (!conversationMap.has(conversationId)) {
        // Determine who the other person is
        const isCurrentUserSender = message.sender._id.toString() === userId;
        const otherPerson = isCurrentUserSender ? message.recipient : message.sender;
        
        conversationMap.set(conversationId, {
          id: conversationId,
          otherPerson,
          pro: message.pro,
          messages: [],
          unreadCount: 0,
          lastActivity: message.createdAt
        });
      }

      const conversation = conversationMap.get(conversationId);
      
      // Add message type for UI
      message.isFromCurrentUser = message.sender._id.toString() === userId;
      
      // Count unread messages (only received messages)
      if (!message.isFromCurrentUser && !message.read) {
        conversation.unreadCount++;
      }

      conversation.messages.push(message);
      
      // Update last activity
      if (new Date(message.createdAt) > new Date(conversation.lastActivity)) {
        conversation.lastActivity = message.createdAt;
      }
    });

    // Convert to array and sort messages within each conversation
    const conversations = Array.from(conversationMap.values()).map(conv => {
      conv.messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      conv.latestMessage = conv.messages[conv.messages.length - 1];
      conv.hasUnread = conv.unreadCount > 0;
      return conv;
    });

    // Sort conversations by last activity
    conversations.sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity));

    return Response.json(conversations);

  } catch (error) {
    console.error('Error fetching messages:', error);
    return Response.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
};

// POST /api/messages - Send new message
export const POST = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { user } = sessionUser;
    const { name, email, phone = '', message, recipient, pro } = await request.json();

    // Validate required fields
    if (!name || !email || !message || !recipient || !pro) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Cannot send to self
    if (user.id === recipient) {
      return Response.json({ error: 'Cannot send message to yourself' }, { status: 400 });
    }

    // Generate conversation ID
    const conversationId = Message.generateConversationId(user.id, recipient, pro);

    const newMessage = new Message({
      sender: user.id,
      recipient,
      pro,
      name,
      email,
      phone,
      body: message,
      conversationId,
      messageType: 'original',
      read: false
    });

    await newMessage.save();

    return Response.json({ message: 'Message sent successfully' });

  } catch (error) {
    console.error('Error sending message:', error);
    return Response.json({ error: 'Failed to send message' }, { status: 500 });
  }
};