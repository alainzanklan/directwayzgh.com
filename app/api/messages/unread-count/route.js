import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

// GET /api/messages/unread-count
export async function GET(request) {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser?.user) {
      return new Response(
        JSON.stringify({ count: 0 }), 
        { 
          status: 200, // Return 200 with 0 count instead of 401 for better UX
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
          }
        }
      );
    }

    const { userId } = sessionUser;

    // If you have the new conversationId field, use this:
    try {
      const unreadConversations = await Message.distinct('conversationId', {
        recipient: userId,
        read: false
      });
      
      const count = unreadConversations.length;
      
      return new Response(
        JSON.stringify({ count }), 
        { 
          status: 200,
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
          }
        }
      );
    } catch (dbError) {
      // Fallback for old schema without conversationId
      console.log('Using fallback method for unread count');
      
      const unreadMessages = await Message.find({
        recipient: userId,
        read: false
      }).populate('sender', '_id');

      // Group by sender to count conversations
      const conversationPartners = new Set();
      unreadMessages.forEach(message => {
        conversationPartners.add(message.sender._id.toString());
      });

      const count = conversationPartners.size;
      
      return new Response(
        JSON.stringify({ count }), 
        { 
          status: 200,
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
          }
        }
      );
    }

  } catch (error) {
    console.error('Error getting unread count:', error);
    
    // Return 0 count instead of error for better UX
    return new Response(
      JSON.stringify({ count: 0 }), 
      { 
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store'
        }
      }
    );
  }
}