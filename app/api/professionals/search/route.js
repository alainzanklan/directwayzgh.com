import connectDB from '@/config/database';
import Pro from '@/models/Pro';

export const GET = async (request) => {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    const proType = searchParams.get('proType');

    const locationPattern = new RegExp(location, 'i');

    let query = {
      $or: [
        { 'company_info.name': locationPattern },
        { introduction: locationPattern },
        { 'location.street': locationPattern },
        { 'location.city': locationPattern },
        { 'location.state': locationPattern },
        { 'location.zipcode': locationPattern },
      ],
    };

    // Only check for pro type if is not 'All'

    if (proType !== 'All') {
      const typePattern = new RegExp(proType, 'i');
      query.type = typePattern;
    }

    const pros = await Pro.find(query);

    return new Response(JSON.stringify(pros), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
