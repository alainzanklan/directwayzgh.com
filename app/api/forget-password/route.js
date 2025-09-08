import User from '@/models/User';
import connectDB from '@/config/database';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

// ZOHO Mail transporter configuration
const createMailTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // Use TLS
    auth: {
      user: process.env.ZOHO_EMAIL, // Your ZOHO email
      pass: process.env.ZOHO_PASSWORD, // Your ZOHO password or app-specific password
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Generate secure reset token
const generateResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  return { resetToken, hashedToken };
};

// Email template for password reset
const createResetEmailTemplate = (resetUrl, userEmail) => {
  return {
    subject: 'Password Reset Request - DirectWayz GH',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px;">
            <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #2563eb;">
              <h1 style="color: #2563eb; margin: 0; font-size: 28px;">DirectWayz GH</h1>
            </div>
            
            <div style="padding: 40px 20px; text-align: center;">
              <h2 style="color: #1f2937; margin-bottom: 20px;">Password Reset Request</h2>
              
              <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                We received a request to reset your password for your DirectWayz GH account.
                If you didn't make this request, you can safely ignore this email.
              </p>
              
              <div style="margin: 30px 0;">
                <a href="${resetUrl}" 
                   style="background-color: #2563eb; color: white; padding: 15px 30px; 
                          text-decoration: none; border-radius: 8px; font-weight: 600;
                          display: inline-block; font-size: 16px;">
                  Reset Your Password
                </a>
              </div>
              
              <p style="color: #9ca3af; font-size: 14px; margin-top: 30px;">
                This link will expire in 1 hour for security reasons.
              </p>
              
              <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                  If the button doesn't work, copy and paste this link into your browser:
                </p>
                <p style="color: #2563eb; font-size: 12px; word-break: break-all; margin: 10px 0;">
                  ${resetUrl}
                </p>
              </div>
            </div>
            
            <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                Need help? Contact us at 
                <a href="mailto:support@directwayzgh.com" style="color: #2563eb;">support@directwayzgh.com</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      DirectWayz GH - Password Reset Request
      
      We received a request to reset your password for your DirectWayz GH account.
      
      Click the following link to reset your password:
      ${resetUrl}
      
      This link will expire in 1 hour for security reasons.
      
      If you didn't make this request, you can safely ignore this email.
      
      Need help? Contact us at support@directwayzgh.com
    `
  };
};

export async function POST(request) {
  try {
    // Parse and validate request
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email address is required' 
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please provide a valid email address' 
        },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    // Always return success for security (don't reveal if user exists)
    // But only send email if user actually exists
    if (user) {
      // Generate reset token
      const { resetToken, hashedToken } = generateResetToken();

      // Set reset token and expiry (1 hour from now)
      user.resetToken = hashedToken;
      user.resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour

      // Save user with reset token
      await user.save();

      // Create reset URL
      const resetUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/reset-password/${resetToken}`;

      // Create email template
      const emailTemplate = createResetEmailTemplate(resetUrl, email);

      // Create ZOHO mail transporter
      const transporter = createMailTransporter();

      // Email configuration
      const mailOptions = {
        from: {
          name: 'DirectWayz GH',
          address: process.env.ZOHO_EMAIL
        },
        to: email,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text,
      };

      // Send email
      await transporter.sendMail(mailOptions);

      console.log(`Password reset email sent to: ${email}`);
    } else {
      console.log(`Password reset requested for non-existent email: ${email}`);
    }

    // Always return success response for security
    return NextResponse.json(
      {
        success: true,
        message: 'If an account with that email exists, we have sent a password reset link.'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Password reset error:', error);

    // Check for specific error types
    if (error.code === 'EAUTH') {
      console.error('ZOHO authentication failed. Check your credentials.');
    }

    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing your request. Please try again later.'
      },
      { status: 500 }
    );
  }
}

// Optional: Add rate limiting helper
export const rateLimitCheck = (ip) => {
  // Implement rate limiting logic here if needed
  // This could use Redis, in-memory cache, or database
  return true;
};

// Environment variables needed:
// ZOHO_EMAIL=your-email@yourdomain.com
// ZOHO_PASSWORD=your-app-password
// NEXT_PUBLIC_DOMAIN=https://yourdomain.com