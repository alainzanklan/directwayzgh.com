import connectDB from '@/config/database';
import Job from '@/models/Job';

// GET /api/jobs/user/:userId

export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const userId = params.userId;

    if (!userId) {
      return new Response('User ID is required', { status: 400 });
    }

    const jobs = await Job.find({ owner: userId });

    return new Response(JSON.stringify(jobs), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
