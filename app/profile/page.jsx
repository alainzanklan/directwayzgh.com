'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { User, Mail, Briefcase, Edit3, Trash2, Plus, MapPin, Sparkles, Building2, Upload } from 'lucide-react';
import profileDefault from '@/assets/images/profile.png';
import { toast } from 'react-toastify';

// Loading Spinner Component
const Spinner = ({ loading }) => {
  if (!loading) return null;
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  );
};

// Job Card Component
const JobCard = ({ job, onDelete }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <Link href={`/jobs/${job._id}`} className="group">
            <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-indigo-600 transition-colors">
              {job.title}
            </h3>
          </Link>
          <p className="text-gray-600 text-sm flex items-center mb-4">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            {job.location}
          </p>
        </div>
      </div>
      
      <div className="flex gap-3">
        <Link
          href={`/jobs/${job._id}/edit`}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
        >
          <Edit3 className="w-4 h-4" />
          Edit
        </Link>
        <button
          onClick={() => onDelete(job._id)}
          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
          type="button"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
};

// Professional Profile Card Component
const ProfessionalCard = ({ profile, onEdit }) => {
  if (!profile) return null;
  
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start gap-4 mb-4">
        {profile.logo ? (
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-white shadow-sm flex-shrink-0">
            <img
              src={profile.logo}
              alt={profile.company_info?.name || 'Company Logo'}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-16 h-16 bg-indigo-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <Building2 className="w-8 h-8 text-indigo-600" />
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg mb-1">
            {profile.company_info?.name || 'Professional Profile'}
          </h3>
          <div className="flex flex-wrap gap-2 mb-2">
            {(profile.types || []).slice(0, 3).map((type, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full font-medium"
              >
                {type}
              </span>
            ))}
            {(profile.types || []).length > 3 && (
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
                +{profile.types.length - 3} more
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm flex items-center">
            <MapPin className="w-4 h-4 mr-1 text-gray-400" />
            {profile.location?.city || 'N/A'}, {profile.location?.state || 'N/A'}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onEdit}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
        >
          <Edit3 className="w-4 h-4" />
          Edit Profile
        </button>
      </div>
    </div>
  );
};

const ProfilePage = () => {
    const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;
  const profileRole = session?.user?.role;

  const [jobs, setJobs] = useState([]);
  const [professionalProfile, setProfessionalProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [proLoading, setProLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageUpload = async (e) => {
    console.log(session)
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be less than 2MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const res = await fetch('/api/profile/upload-image', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        toast.success('Profile picture updated successfully!');
        // Force hard refresh to clear all caches
        setTimeout(() => {
          window.location.href = window.location.href;
        }, 1000);
      } else {
        toast.error(result.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  useEffect(() => {
    const fetchJobsData = async (userId) => {
      if (!userId) {
        return;
      }

      try {
        const res = await fetch(`/api/jobs/user/${userId}`);

        if (res.status === 200) {
          const data = await res.json();
          setJobs(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id && profileRole === 'USER') {
      fetchJobsData(session.user.id);
    } else {
      setLoading(false);
    }
  }, [session, profileRole]);

  useEffect(() => {
    console.log(session)
    const fetchProfessionalProfile = async (userId) => {
      if (!userId) {
        return;
      }

      try {
        const res = await fetch(`/api/professionals/user/${userId}`);

        if (res.status === 200) {
          const data = await res.json();
          setProfessionalProfile(data);
        } else { 
          setProfessionalProfile(null)
        }
      } catch (error) {
        console.log(error);
      } finally {
        setProLoading(false);
      }
    };

    if (session?.user?.id && profileRole === 'PRO') {
      fetchProfessionalProfile(session.user.id);
    } else {
      setProLoading(false);
    }
  }, [session, profileRole]);

  const handleDeleteJob = async (jobId) => {
    const confirm = window.confirm('Are you sure you want to delete this job?');

    if (!confirm) {
      return;
    }

    try {
      const res = await fetch(`/api/jobs/${jobId}`, { method: 'DELETE' });
      if (res.status === 200) {
        const updatedJobs = jobs.filter((job) => job._id !== jobId);
        setJobs(updatedJobs);
        toast.success('Job Deleted');
      } else {
        toast.error('Failed to delete job');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete job');
    }
  };

  const handleDeleteProfile = async () => {
    // Add validation
    if (!professionalProfile || !professionalProfile._id) {
      toast.error('Profile ID not found');
      console.error('Profile data:', professionalProfile);
      return;
    }

    const confirm = window.confirm('Are you sure you want to delete your professional profile? This action cannot be undone.');

    if (!confirm) {
      return;
    }

    try {
      console.log('Deleting profile with ID:', professionalProfile._id);
      
      const res = await fetch(`/api/professionals/${professionalProfile._id}`, { 
        method: 'DELETE' 
      });
      
      if (res.status === 200) {
        setProfessionalProfile(null);
        toast.success('Professional profile deleted successfully');
      } else {
        const errorText = await res.text();
        console.error('Delete failed:', errorText);
        toast.error('Failed to delete profile');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete profile');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto py-12 px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Profile Info */}
            <div className="lg:w-1/3">
              <div className="flex flex-col items-center lg:items-start">
                <div className="relative mb-6">
                  <Image
                    className="h-32 w-32 rounded-full object-cover shadow-lg ring-4 ring-white"
                    src={profileImage || profileDefault}
                    alt="User Profile"
                    width={128}
                    height={128}
                  />
                  {profileRole === 'PRO' && (
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full p-2 shadow-lg">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                  )}
                  {/* Upload button overlay */}
  <label 
    htmlFor="profile-image-upload" 
    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-full cursor-pointer transition-all duration-200"
  >
    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
      {uploadingImage ? (
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      ) : (
        <Upload className="w-8 h-8 text-white" />
      )}
    </div>
  </label>
  <input
    id="profile-image-upload"
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    className="hidden"
    disabled={uploadingImage}
  />
                </div>
                
                <div className="text-center lg:text-left space-y-4 w-full">
                  <div>
                    <div className="flex items-center justify-center lg:justify-start mb-2">
                      <User className="w-5 h-5 text-indigo-600 mr-2" />
                      <span className="font-semibold text-gray-700">Name</span>
                    </div>
                    <p className="text-xl text-gray-900 font-medium">{profileName}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-center lg:justify-start mb-2">
                      <Mail className="w-5 h-5 text-indigo-600 mr-2" />
                      <span className="font-semibold text-gray-700">Email</span>
                    </div>
                    <p className="text-lg text-gray-900 break-all">{profileEmail}</p>
                  </div>

                  <div className="pt-2">
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                      profileRole === 'PRO' 
                        ? 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {profileRole === 'USER' ? '👤 Client' : '⭐ Professional'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area - USER or PRO*/}
            <div className="lg:w-2/3">
              {/* USER - Job Listings */}
              {profileRole === 'USER' && (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                      <Briefcase className="w-6 h-6 mr-2 text-indigo-600" />
                      Your Job Listings
                    </h2>
                    <Link
                      href="/jobs/post"
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium shadow-md"
                    >
                      <Plus className="w-4 h-4" />
                      Add Job
                    </Link>
                  </div>

                  {loading ? (
                    <Spinner loading={loading} />
                  ) : jobs.length === 0 ? (
                    <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-indigo-50 rounded-xl border-2 border-dashed border-gray-300">
                      <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No job listings yet</h3>
                      <p className="text-gray-600 mb-6">Get started by creating your first job listing</p>
                      <Link
                        href="/jobs/post"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                      >
                        <Plus className="w-4 h-4" />
                        Create Your First Job
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {jobs.map((job) => (
                        <JobCard
                          key={job._id}
                          job={job}
                          onDelete={handleDeleteJob}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* PRO - Professional Profile */}
              {profileRole === 'PRO' && (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                      <Building2 className="w-6 h-6 mr-2 text-indigo-600" />
                      Professional Profile
                    </h2>
                  </div>

                  {proLoading ? (
                    <Spinner loading={proLoading} />
                  ) : professionalProfile ? (
                    <ProfessionalCard 
                      profile={professionalProfile}
                      onEdit={() => window.location.href = `/professionals/${professionalProfile._id}/edit`}
                      onDelete={handleDeleteProfile}
                    />
                  ) : (
                    <div className="text-center py-12 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border-2 border-dashed border-indigo-300">
                      <Building2 className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No professional profile yet</h3>
                      <p className="text-gray-600 mb-6">Create your professional profile to start receiving clients</p>
                      <Link
                        href="/professionals/add"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors shadow-lg"
                      >
                        <Plus className="w-4 h-4" />
                        Create Professional Profile
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;