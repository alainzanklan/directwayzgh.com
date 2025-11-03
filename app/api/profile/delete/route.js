import connectDB from '@/config/database';
import User from '@/models/User';
import Pro from '@/models/Pro';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

// DELETE /api/profile/delete
export async function DELETE(request) {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser?.user) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { userId } = sessionUser;

    // Find the user first to verify they exist
    const user = await User.findById(userId);
    if (!user) {
      return Response.json({ message: 'User not found' }, { status: 404 });
    }

    // Delete all related data
    try {
      // Delete professional profile if exists
      await Pro.deleteMany({ owner: userId });

      // Delete all messages (sent and received)
      await Message.deleteMany({
        $or: [
          { sender: userId },
          { recipient: userId }
        ]
      });

      // Finally, delete the user account
      await User.findByIdAndDelete(userId);

      return Response.json({
        message: 'Account deleted successfully'
      });

    } catch (deleteError) {
      console.error('Error during account deletion:', deleteError);
      return Response.json(
        { message: 'Failed to delete account data' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error deleting account:', error);
    return Response.json(
      { message: 'Failed to delete account' },
      { status: 500 }
    );
  }
}