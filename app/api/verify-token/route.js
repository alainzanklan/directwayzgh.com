import User from '@/models/User';
import connectDB from '@/config/database';
import NextResponse from 'next/server';
import crypto from 'crypto';

const dynamic = 'force-dynamic';
export async function POST(req) {
  const { token } = await req.json();

  await connectDB();

  const hashToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    resetToken: hashToken,
    resetTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    return new Response('Invalid Token or Expired', {
      status: 400,
    });
  }

  return new Response(JSON.stringify(user), { status: 200 });
}
