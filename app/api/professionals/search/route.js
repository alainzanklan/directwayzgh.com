import connectDB from '@/config/database';
import Pro from '@/models/Pro';

// Add this to fix the deployment error
export const dynamic = 'force-dynamic';

export const GET = async (request) => {
  try {
    await connectDB();
    
    // Fixed: Use request.nextUrl instead of new URL(request.url)
    const { searchParams } = request.nextUrl;
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
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ error: 'Something went wrong' }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};