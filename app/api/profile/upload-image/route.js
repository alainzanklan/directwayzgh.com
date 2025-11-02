import { getSessionUser } from '@/utils/getSessionUser';
import { writeFile } from 'fs/promises';
import path from 'path';
import User from '@/models/User';
import connectDB from '@/config/database';

export const POST = async (request) => {
  try {
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }), 
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { userId } = sessionUser;
    const formData = await request.formData();
    const image = formData.get('profileImage');

    if (!image) {
      return new Response(
        JSON.stringify({ error: 'No image provided' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate file size (2MB)
    if (image.size > 2 * 1024 * 1024) {
      return new Response(
        JSON.stringify({ error: 'Image too large (max 2MB)' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = image.name.replace(/\s/g, '-');
    const filename = `${timestamp}-${originalName}`;
    
    // Save to public/images/profiles folder
    const filepath = path.join(process.cwd(), 'public/images/profiles', filename);
    await writeFile(filepath, buffer);
    
    const imageUrl = `/images/profiles/${filename}`;

    // Update user in database
    await connectDB();
    await User.findByIdAndUpdate(userId, { image: imageUrl });

    console.log('Profile image updated:', imageUrl);

    return new Response(
      JSON.stringify({ success: true, imageUrl }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to upload image', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};