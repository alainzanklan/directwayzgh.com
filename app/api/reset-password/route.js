import User from '@/models/User';
import connectDB from '@/config/database';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { password, email } = await req.json();

  await connectDB();

  const existingUser = await User.findOne({ email });

  const hashedPassword = await bcrypt.hash(password, 10);
  existingUser.password = hashedPassword;

  existingUser.resetToken = undefined;
  existingUser.resetTokenExpires = undefined;

  try {
    await existingUser.save();
    return NextResponse.json(
      { message: "User's password has been updated" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occured while updating user's password" },
      { status: 500 },
      console.log(error)
    );
  }
}
