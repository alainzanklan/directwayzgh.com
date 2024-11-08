import User from '@/models/User';
import connectDB from '@/config/database';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    await connectDB();

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: 'User registred' }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occured while registering user' },
      { status: 500 },
      console.log(error)
    );
  }
}