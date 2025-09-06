// app/api/register/route.js
import User from '@/models/User';
import connectDB from '@/config/database';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

// Zoho email configuration
const createEmailTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_EMAIL,
      pass: process.env.ZOHO_PASSWORD, // Use app password for better security
    },
     tls: {
      rejectUnauthorized: false
    }
  });
};

// Simple welcome email template
const createWelcomeEmail = (name, email) => ({
  from: `"Directwayz GH" <${process.env.ZOHO_EMAIL}>`,
  to: email,
  subject: `Welcome ${name}! 🎉`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #333; margin: 0;">Welcome to Our Platform!</h1>
      </div>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2 style="color: #333; margin-top: 0;">Hi ${name} 👋</h2>
        <p style="color: #666; line-height: 1.6;">
          Your account has been successfully created! We're excited to have you on board.
        </p>
        <p style="color: #666;">
          <strong>Your registered email:</strong> ${email}
        </p>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.NEXT_PUBLIC_DOMAIN}/login" 
           style="background: #007bff; color: white; padding: 12px 24px; 
                  text-decoration: none; border-radius: 6px; display: inline-block;">
          Get Started
        </a>
      </div>
      
      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
      <p style="color: #999; font-size: 14px; text-align: center;">
        This is an automated message. Please don't reply to this email.
      </p>
    </div>
  `,
});

// Send welcome email (non-blocking)
const sendWelcomeEmail = async (name, email) => {
  try {
    const transporter = createEmailTransporter();
    await transporter.sendMail(createWelcomeEmail(name, email));
    console.log(`✅ Welcome email sent to: ${email}`);
  } catch (error) {
    console.error('❌ Failed to send welcome email:', error.message);
    // Don't throw - registration should succeed even if email fails
  }
};

// Validation helper
const validateInput = (name, email, password) => {
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Please provide a valid email address');
  }

  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  return errors;
};

export async function POST(req) {
  try {
    // Parse request body
    const { name, email, password, role } = await req.json();

    // Validate input
    const validationErrors = validateInput(name, email, password);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Validation failed', 
          errors: validationErrors 
        },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { 
          success: false,
          message: 'User with this email already exists' 
        },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
    });

    // Send welcome email (async, non-blocking)
    sendWelcomeEmail(name.trim(), email.toLowerCase());

    // Return success response (don't include sensitive data)
    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful! Welcome email sent.',
        data: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);

    // Handle specific MongoDB errors
    if (error.code === 11000) {
      return NextResponse.json(
        { 
          success: false,
          message: 'User with this email already exists' 
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { 
        success: false,
        message: 'Registration failed. Please try again.' 
      },
      { status: 500 }
    );
  }
}