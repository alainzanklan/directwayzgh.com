import connectDB from '@/config/database';
import Pro from '@/models/Pro';
import { getSessionUser } from '@/utils/getSessionUser';
import cloudinary from '@/config/cloudinary';

export const dynamic = 'force-dynamic';

// GET api/professionals
export const GET = async (request) => {
  try {
    await connectDB();

    const pros = await Pro.find({})
      .select('-__v') // Exclude version field
      .sort({ createdAt: -1 }); // Sort by newest first

    return new Response(JSON.stringify(pros), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching professionals:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch professionals' }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

export const POST = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }), 
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const { userId } = sessionUser;

    // Parse form data
    const formData = await request.formData();
    const profileDataRaw = formData.get('profileData');
    
    if (!profileDataRaw) {
      return new Response(
        JSON.stringify({ error: 'Profile data is required' }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    let profileData;
    try {
      profileData = JSON.parse(profileDataRaw);
    } catch (parseError) {
      return new Response(
        JSON.stringify({ error: 'Invalid profile data format' }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Handle logo upload
    let logoUrl = [];
    const logo = formData.get('logo');
    
    if (logo && logo.size > 0) {
      try {
        // Validate file size (e.g., max 5MB)
        if (logo.size > 5 * 1024 * 1024) {
          return new Response(
            JSON.stringify({ error: 'Logo file size must be less than 5MB' }), 
            { 
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        }

        const imageBuffer = await logo.arrayBuffer();
        const imageArray = Array.from(new Uint8Array(imageBuffer));
        const imageData = Buffer.from(imageArray);

        // Convert image data to base64
        const imageBase64 = imageData.toString('base64');

        // Upload to cloudinary with error handling
        const result = await cloudinary.uploader.upload(
          `data:image/png;base64,${imageBase64}`,
          { 
            folder: 'directwayzgh',
            resource_type: 'image',
            quality: 'auto',
            format: 'jpg' // Optimize format
          }
        );
        
        logoUrl.push(result.secure_url);
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        return new Response(
          JSON.stringify({ error: 'Failed to upload logo. Please try again.' }), 
          { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
    }

    // Validate required fields
    if (!profileData.types || !profileData.introduction || !profileData.location) {
      return new Response(
        JSON.stringify({ error: 'Required fields are missing' }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Create professional data for database
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

    // Save to database
    const newPro = new Pro(professionalData);
    await newPro.save();

    // Log success (but not sensitive data)
    console.log(`New professional profile created: ${newPro._id}`);

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

  } catch (error) {
    console.error('Error creating professional profile:', error);
    
    // Don't expose internal error details in production
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? error.message 
      : 'Failed to create professional profile';

    return new Response(
      JSON.stringify({ error: errorMessage }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};