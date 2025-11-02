import connectDB from '@/config/database';
import Job from '@/models/Job';
import { getSessionUser } from '@/utils/getSessionUser';
import nodemailer from 'nodemailer';
import { writeFile } from 'fs/promises';
import path from 'path';
import cloudinary from '@/config/cloudinary';

const dynamic = 'force-dynamic';

export const GET = async (request) => {
  try {
    await connectDB();

    const jobs = await Job.find({});

    return new Response(JSON.stringify(jobs), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
});

const sendJobConfirmationEmail = async (jobData) => {
  const mailOptions = {
    from: process.env.ZOHO_EMAIL,
    to: jobData.contactEmail,
    subject: 'Job Posted Successfully - Confirmation',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">Job Posted Successfully! 🎉</h1>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <p style="font-size: 16px; color: #333;">Hello ${jobData.company || 'there'},</p>
          
          <p style="font-size: 16px; color: #333;">
            Your job posting has been successfully submitted and is now under review. 
            Here are the details of your submission:
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #1d4ed8; margin-top: 0;">${jobData.title}</h2>
            <p><strong>Job Type:</strong> ${jobData.type}</p>
            <p><strong>Location:</strong> ${jobData.location}</p>
            <p><strong>Price Range:</strong> ${jobData.price}</p>
            ${jobData.description ? `<p><strong>Description:</strong> ${jobData.description}</p>` : ''}
            <p><strong>Contact:</strong> ${jobData.contactEmail}</p>
            ${jobData.contactPhone ? `<p><strong>Phone:</strong> ${jobData.contactPhone}</p>` : ''}
          </div>
          
          <div style="background: #e3f2fd; padding: 15px; border-radius: 6px; border-left: 4px solid #2196f3;">
            <p style="margin: 0; color: #0e7490;">
              <strong>What's Next?</strong><br>
              Your job will be reviewed and published within 24 hours. Once approved, 
              professionals in your area will be able to see and respond to your job posting.
            </p>
          </div>
          
          <p style="font-size: 16px; color: #333; margin-top: 25px;">
            Thank you for choosing our platform to find the perfect professional for your project!
          </p>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.NEXTAUTH_URL}/jobs" 
               style="background: #1d4ed8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              View All Jobs
            </a>
          </div>
        </div>
        
        <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 14px;">
          <p style="margin: 0;">
            Need help? Contact our support team at 
            <a href="mailto:info@directwayzgh.com" style="color: #1d4ed8;">info@directwayzgh.com</a>
          </p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const POST = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User Id is required', { status: 401 });
    }

    const { userId } = sessionUser;
    const formData = await request.formData();
    const jobData = JSON.parse(formData.get('jobData'));

    // Handle image uploads
    const imageUrls = [];
    const images = formData.getAll('images');

            for (const image of images) {
          const imageBuffer = await image.arrayBuffer();
          const imageArray = Array.from(new Uint8Array(imageBuffer));
          const imageData = Buffer.from(imageArray);
    
          // Convert image Data to base64
          const imageBase64 = imageData.toString('base64');
    
          // Make request to upload to cloudinary
          const result = await cloudinary.uploader.upload(
            `data:image/png;base64,${imageBase64}`,
            { folder: 'directwayzgh' }
          );
          imageUrls.push(result.secure_url);
    
               }

   

    // Create complete job data
    const completeJobData = {
      type: jobData.type,
      title: jobData.title,
      description: jobData.description,
      images: imageUrls, // Add the uploaded image URLs
      price: jobData.price,
      location: jobData.location,
      company: jobData.company,
      contactEmail: jobData.contactEmail,
      contactPhone: jobData.contactPhone,
      owner: userId,
    };

    console.log(completeJobData);

    // Save the job to database
    const newJob = new Job(completeJobData);
    await newJob.save();

    // Send confirmation email
    try {
      await sendJobConfirmationEmail(completeJobData);
      console.log('Confirmation email sent successfully');
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Job added successfully',
        jobId: newJob._id.toString(),
        newJob: {
          id: newJob._id,
          title: newJob.title,
          type: newJob.type,
          images: newJob.images
        }
      }),
      { 
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to add job',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

