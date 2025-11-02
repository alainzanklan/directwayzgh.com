import connectDB from '@/config/database';
import Pro from '@/models/Pro';
import { getSessionUser } from '@/utils/getSessionUser';

export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const pro = await Pro.findOne({ owner: params.userId });
    
    if (!pro) {
      return new Response('Professional profile not found', { status: 404 });
    }

    return new Response(JSON.stringify(pro), { status: 200 });
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
};

// DELETE /api/professional/:id

export const DELETE = async (request, { params }) => {
  try {
    // const sessionUser = await getSessionUser();
 
    // if (!sessionUser || !sessionUser.userId) {
    //   return new Response('User ID is required', { status: 401 });
    // }

   const proId = await Pro.findOneAndDelete({ owner: params.userId });

    if (!proId) {
      return new Response('Profile ID is required', { status: 400 });
    }


    const { userId } = sessionUser;

    await connectDB();

    const pro = await Pro.findById(proId);

    if (!pro) {
      return new Response('Pro Not Found', { status: 404 });
    }

    // Verify Ownership
    if (pro.owner.toString() !== userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    await pro.deleteOne();

    return new Response('Profile Deleted', { status: 200 });
    
  } catch (error) {
    console.error('Delete error:', error);
    return new Response(`Something went wrong: ${error.message}`, { 
      status: 500 
    });
  }
};