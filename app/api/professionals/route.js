import connectDB from '@/config/database';
import Pro from '@/models/Pro';
import { getSessionUser } from '@/utils/getSessionUser';
import cloudinary from '@/config/cloudinary';

const dynamic = 'force-dynamic'

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

export const POST = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User Id is required', { status: 401 });
    }

    const { userId } = sessionUser;

    const formData = await request.formData();
    const profileData = JSON.parse(formData.get('profileData'));
    // Access all values from Payment and Image

    let logoUrl = [];
    const logo = formData.get('logo');
   if (logo) {
      const imageBuffer = await logo.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      // Convert image Data to base64
      const imageBase64 = imageData.toString('base64');

      // Make request to upload to cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        { folder: 'directwayzgh' }
      );
     logoUrl.push(result.secure_url);

     }

   // Create profileData for Database

       const professionalData = {
      types: profileData.types,
      introduction: profileData.introduction,
      location: profileData.location,
      employees: profileData.employees,
      year_in_business: profileData.year_in_business,
      price: profileData.price,
      payment: profileData.payment,
      company_info: profileData.company_info,
      logo: logoUrl,
      owner: userId,
    };

    console.log('Professional data:', professionalData);

    const newPro = new Pro(professionalData);
    await newPro.save();

return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Professional profile created successfully',
        professionalId: newPro._id.toString(),
      }),
      { 
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      }
    );
    // return Response.redirect(
    //   `${process.env.NEXTAUTH_URL}/professionals/${newPro._id}`
    // );

    // return new Response(JSON.stringify({ message: 'success' }), {
    //   status: 200,
    // });
  } catch (error) {
    console.error(error);
    return new Response('failed to add profile', { status: 500 });
  }
};
