import connectDB from '@/config/database';
import Pro from '@/models/Pro';
import { getSessionUser } from '@/utils/getSessionUser';
import { writeFile } from 'fs/promises';
import path from 'path';

const dynamic = 'force-dynamic';

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


export const DELETE = async (request, { params }) => {
  try {
    // Log the raw params first
    console.log('Raw params:', params);
    
    // Await params for Next.js 15+
    const resolvedParams = await params;
    console.log('Resolved params:', resolvedParams);
    
    // Extract id - try both possible property names
    const proId = resolvedParams.id || resolvedParams.proId;
    console.log('Deleting profile ID:', proId);

    if (!proId) {
      return new Response('Profile ID is required', { status: 400 });
    }

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
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


export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const resolvedParams = await params;
    const proId = resolvedParams.id;
    const { userId } = sessionUser;

    const formData = await request.formData();
    const profileData = JSON.parse(formData.get('profileData'));

    // Get existing profile
    const existingProfile = await Pro.findById(proId);

    if (!existingProfile) {
      return new Response('Profile does not exist', { status: 404 });
    }

    // Verify ownership
    if (existingProfile.owner.toString() !== userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Handle logo upload
    let logoUrl = existingProfile.logo; // Keep existing logo by default
    const newLogo = formData.get('logo');

    if (newLogo && newLogo.size > 0) {
      const { writeFile } = require('fs/promises');
      const path = require('path');
      
      const bytes = await newLogo.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const timestamp = Date.now();
      const originalName = newLogo.name.replace(/\s/g, '-');
      const filename = `${timestamp}-${originalName}`;
      
      const filepath = path.join(process.cwd(), 'public/images/professionals', filename);
      await writeFile(filepath, buffer);
      
      logoUrl = `/images/professionals/${filename}`;
      console.log('New logo uploaded:', logoUrl);
    } else {
      console.log('No new logo, keeping existing:', logoUrl);
    }

    // Update profile data
    const updatedProfile = {
      types: profileData.types,
      introduction: profileData.introduction,
      location: profileData.location,
      employees: profileData.employees,
      year_in_business: profileData.year_in_business,
      price: profileData.price,
      payment: profileData.payment,
      company_info: profileData.company_info,
      logo: logoUrl,
    };

    await Pro.findByIdAndUpdate(proId, updatedProfile);

    return new Response(
      JSON.stringify({ success: true, professionalId: proId }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('PUT error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to update profile',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};