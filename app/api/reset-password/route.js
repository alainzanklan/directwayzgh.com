import User from '@/models/User';
import connectDB from '@/config/database';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json();
    const { token, password } = body;

    // Validate input
    if (!token || !password) {
      return NextResponse.json(
        {
          success: false,
          message: 'Reset token and new password are required'
        },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: 'Password must be at least 6 characters long'
        },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Hash the token to match what's stored in database
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Find user with valid reset token that hasn't expired
    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpires: { $gt: Date.now() }
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid or expired reset token'
        },
        { status: 400 }
      );
    }

    // Hash the new password
    const saltRounds = 12; // More secure than 10
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update user password and clear reset token fields
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;

    // Save updated user
    await user.save();

    console.log(`Password successfully reset for user: ${user.email}`);

    return NextResponse.json(
      {
        success: true,
        message: 'Password has been reset successfully'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Password reset error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while resetting your password. Please try again.'
      },
      { status: 500 }
    );
  }
}

// Optional: GET method to validate token without resetting password
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: 'Reset token is required'
        },
        { status: 400 }
      );
    }

    await connectDB();

    // Hash the token to match what's stored in database
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Check if token exists and hasn't expired
    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpires: { $gt: Date.now() }
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid or expired reset token'
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Valid reset token',
        email: user.email // Optionally return email for UI
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Token validation error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while validating the token'
      },
      { status: 500 }
    );
  }
}