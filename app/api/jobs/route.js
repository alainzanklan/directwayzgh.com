import connectDB from '@/config/database';
import Job from '@/models/Job';
import { getSessionUser } from '@/utils/getSessionUser';

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

export const POST = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User Id is required', { status: 401 });
    }

    const { userId } = sessionUser;

    const formData = await request.formData();

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

    const newJob = new Job(jobData);
    await newJob.save();

    return Response.redirect(`${process.env.NEXTAUTH_URL}/jobs/${newJob._id}`);

    // return new Response(JSON.stringify({ message: 'success' }), {
    //   status: 200,
    // });
  } catch (error) {
    console.error(error);
    return new Response('failed to add Job', { status: 500 });
  }
};
