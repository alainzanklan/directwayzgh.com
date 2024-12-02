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
    // Access all values from Payment and Image

    const payment = formData.getAll('payment');
    const images = formData.getAll('logo').filter((image) => image.name !== '');

    // Create profileData for Database

    const profileData = {
      type: formData.get('type'),
      introduction: formData.get('introduction'),
      location: {
        street: formData.get('location.street'),
        city: formData.get('location.city'),
        state: formData.get('location.state'),
        zipcode: formData.get('location.zipcode'),
      },
      employees: formData.get('employees'),
      year_in_business: formData.get('year_in_business'),
      price: formData.get('price'),
      payment,
      company_info: {
        name: formData.get('company_info.name'),
        email: formData.get('company_info.email'),
        phone: formData.get('company_info.phone'),
      },
      owner: userId,
    };

    // Upload image to Cloudinary

    const imageUploadPromises = [];

    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      // Convert image Data to base64
      const imageBase64 = imageData.toString('base64');

      // Make request to upload to cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        { folder: 'directwayzgh' }
      );
      imageUploadPromises.push(result.secure_url);

      // Wait for image to upload
      const uploadedImages = await Promise.all(imageUploadPromises);
      //Add uploaded images tothe profileData object
      profileData.logo = uploadedImages;
    }

    const newPro = new Pro(profileData);
    await newPro.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/professionals/${newPro._id}`
    );

    // return new Response(JSON.stringify({ message: 'success' }), {
    //   status: 200,
    // });
  } catch (error) {
    console.error(error);
    return new Response('failed to add profile', { status: 500 });
  }
};
