import connectDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

// PUT /api/profile/update
export async function PUT(request) {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser?.user) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { userId } = sessionUser;
    const { name, email } = await request.json();

    // Validate input
    if (!name?.trim()) {
      return Response.json({ message: 'Name is required' }, { status: 400 });
    }

    if (!email?.trim()) {
      return Response.json({ message: 'Email is required' }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ message: 'Invalid email format' }, { status: 400 });
    }

    // Check if email is already taken by another user
    const existingUser = await User.findOne({ 
      email: email.toLowerCase(),
      _id: { $ne: userId }
    });

    if (existingUser) {
      return Response.json({ message: 'Email is already taken' }, { status: 400 });
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        updatedAt: new Date()
      },
      { new: true, select: '-password' }
    );

    if (!updatedUser) {
      return Response.json({ message: 'User not found' }, { status: 404 });
    }

    return Response.json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role
      }
    });

  } catch (error) {
    console.error('Error updating profile:', error);
    return Response.json(
      { message: 'Failed to update profile' },
      { status: 500 }
    );
  }
}