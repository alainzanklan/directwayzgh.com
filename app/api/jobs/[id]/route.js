import connectDB from '@/config/database';
import Job from '@/models/Job';
import { getSessionUser } from '@/utils/getSessionUser';

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

    return new Response('Property Deleted', {
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

    // Get job to update

    const existingJob = await Job.findById(id);

    if (!existingJob) {
      return new Response('Job does not exist', { status: 404 });
    }

    // Verifiy ownership

    if (existingJob.owner.toString() !== userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Create profileData for Database

    const jobData = {
      type: formData.get('type'),
      title: formData.get('title'),
      description: formData.get('description'),
      price: formData.get('price'),
      location: formData.get('location'),
      company: formData.get('company'),
      contactEmail: formData.get('contactEmail'),
      contactPhone: formData.get('contactPhone'),
      owner: userId,
    };

    // Update Job in database
    const updatedJob = await Job.findByIdAndUpdate(id, jobData);

    return new Response(JSON.stringify(updatedJob), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response('failed to add Job', { status: 500 });
  }
};
