import connectDB from '@/config/database';
import Job from '@/models/Job';
import { getSessionUser } from '@/utils/getSessionUser';
import cloudinary from '@/config/cloudinary';

const dynamic = 'force-dynamic';

// GET api/jobs/:id

export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const job = await Job.findById(params.id);

    if (!job) return new Response('Pro Not Found', { status: 404 });

    return new Response(JSON.stringify(job), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};

// DELETE /api/jobs/:id

export const DELETE = async (request, { params }) => {
  try {
    const jobId = params.id;

    const sessionUser = await getSessionUser();

    // Check for session
    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 404 });
    }

    const { userId } = sessionUser;

    await connectDB();

    const job = await Job.findById(jobId);

    if (!job) return new Response('Pro Not Found', { status: 404 });

    // Verify Ownership

    if (job.owner.toString() !== userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    await job.deleteOne();

    return new Response('Job Deleted', {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};

// PUT /api/jobs/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User Id is required', { status: 401 });
    }

    const { id } = params;
    const { userId } = sessionUser;

    const formData = await request.formData();
    const jobData = JSON.parse(formData.get('jobData'));

    // Get job to update

    const existingJob = await Job.findById(id);

    if (!existingJob) {
      return new Response('Job does not exist', { status: 404 });
    }

    // Verifiy ownership

    if (existingJob.owner.toString() !== userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Handle image uploads
        const newImageUrls = [];
        const newImages = formData.getAll('images');
    
                for (const image of newImages) {
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
              newImageUrls.push(result.secure_url);
        
                   }

                   // Combine existing images with new ones
    const allImages = [...(existingJob.images || []), ...newImageUrls];
    

    // Create profileData for Database

   const updatedJob = {
      type: jobData.type,
      title: jobData.title,
      description: jobData.description,
      images: allImages,
      price: jobData.price,
      location: jobData.location,
      company: jobData.company,
      contactEmail: jobData.contactEmail,
      contactPhone: jobData.contactPhone,
    };

    await Job.findByIdAndUpdate(id, updatedJob);

   return new Response(JSON.stringify({ success: true, jobId: id }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response('failed to add Job', { status: 500 });
  }
};
