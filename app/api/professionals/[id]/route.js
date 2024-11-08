import connectDB from '@/config/database';
import Pro from '@/models/Pro';

// GET api/professionals/:id

export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const pro = await Pro.findById(params.id);

    if (!pro) return new Response('Pro Not Found', { status: 404 });

    return new Response(JSON.stringify(pro), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
