import connectDB from '@/config/database';
import Job from '@/models/Job';

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
