import connectDB from '@/config/database';
import Pro from '@/models/Pro';

// GET api/professionals

export const GET = async (request) => {
  try {
    await connectDB();

    const pros = await Pro.find({});

    return new Response(JSON.stringify(pros), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
