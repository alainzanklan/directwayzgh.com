import User from '@/models/User';
import connectDB from '@/config/database';
import NextResponse from 'next/server';
import crypto from 'crypto';
import { MailtrapClient } from 'mailtrap';

export async function POST(req) {
  try {
    const { email } = await req.json();

    await connectDB();

    const existingUser = await User.findOne({ email });

    // if (!existingUser) {
    //   return NextResponse.json(
    //     { message: 'User does not Exist' },
    //     { status: 400 }
    //   );
    // }
    const resetToken = crypto.randomBytes(20).toString('hex');
    const passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const passwordResetExpires = Date.now() + 3600000;
    existingUser.resetToken = passwordResetToken;
    existingUser.resetTokenExpires = passwordResetExpires;

    const resetUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/reset-password/${resetToken}`;

    const { MailtrapClient } = require('mailtrap');

    const TOKEN = '6cade27a305cebb632846ca6db1ff838';
    const client = new MailtrapClient({ token: TOKEN });

    const sender = {
      email: 'hello@demomailtrap.com',
      name: 'Directwayz GH',
    };

    const recipients = [
      {
        email: 'directwayzgh@gmail.com',
      },
    ];

    client
      .send({
        from: sender,
        to: recipients,
        subject: 'Your reset password token!',
        text: 'Click on the following link to reset your password: ' + resetUrl,
        category: 'Integration test',
      })
      .then(console.log, console.error);
    await existingUser.save();
    return new Response('Reset password email sent', { status: 200 });
  } catch (error) {
    return new Response('An error occured while sending mail', { status: 500 });
  }
}
