'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { 
  User, 
  Mail, 
  Briefcase, 
  Edit3, 
  Trash2, 
  Plus, 
  MapPin, 
  Building2, 
  Upload,
  Calendar,
  Star,
  Users,
  Settings
} from 'lucide-react';
import profileDefault from '@/assets/images/profile.png';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [jobs, setJobs] = useState([]);
  const [professionalProfile, setProfessionalProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);

  const user = session?.user;
  const isClient = user?.role === 'USER';
  const isProfessional = user?.role === 'PRO';

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be less than 2MB');
      return;
    }

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

      if (res.ok) {
        toast.success('Profile picture updated!');
        // Hard refresh to show updated image
        setTimeout(() => window.location.reload(), 1000);
      } else {
        const result = await res.json();
        toast.error(result.error || 'Upload failed');
      }
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  // Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;

      try {
        // Fetch jobs for clients
        if (isClient) {
          const jobsRes = await fetch(`/api/jobs/user/${user.id}`);
          if (jobsRes.ok) {
            const jobsData = await jobsRes.json();
            setJobs(jobsData);
          }
        }

        // Fetch professional profile for professionals
        if (isProfessional) {
          const proRes = await fetch(`/api/professionals/user/${user.id}`);
          if (proRes.ok) {
            const proData = await proRes.json();
            setProfessionalProfile(proData);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchData();
    } else if (status === 'unauthenticated') {
      setLoading(false);
    }
  }, [user?.id, isClient, isProfessional, status]);

  // Delete job
  const handleDeleteJob = async (jobId) => {
    if (!confirm('Delete this job listing?')) return;

    try {
      const res = await fetch(`/api/jobs/${jobId}`, { method: 'DELETE' });
      if (res.ok) {
        setJobs(jobs.filter(job => job._id !== jobId));
        toast.success('Job deleted');
      } else {
        toast.error('Failed to delete job');
      }
    } catch (error) {
      toast.error('Failed to delete job');
    }
  };

  // Loading state
  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h2>
          <p className="text-gray-600 mb-6">You need to be signed in to view your profile.</p>
          <Link 
            href="/login" 
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Profile</h1>
          
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="relative group">
                <Image
                  className="h-24 w-24 lg:h-32 lg:w-32 rounded-full object-cover border-4 border-white shadow-lg"
                  src={user?.image || profileDefault}
                  alt="Profile"
                  width={128}
                  height={128}
                />
                
                {/* Upload overlay */}
                <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-full cursor-pointer transition-all">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    {uploadingImage ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    ) : (
                      <Upload className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                </label>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-3xl font-bold text-gray-900">{user?.name || 'User'}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isProfessional 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {isProfessional ? '⭐ Professional' : '👤 Client'}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <Mail className="w-4 h-4" />
                <span>{user?.email || 'No email'}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <Calendar className="w-4 h-4" />
                    Member since
                  </div>
                  <div className="font-semibold text-gray-900">
                    {new Date(user?.createdAt || Date.now()).getFullYear()}
                  </div>
                </div>
                
                {isClient && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                      <Briefcase className="w-4 h-4" />
                      Job listings
                    </div>
                    <div className="font-semibold text-gray-900">{jobs.length}</div>
                  </div>
                )}
                
                {isProfessional && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                      <Star className="w-4 h-4" />
                      Profile status
                    </div>
                    <div className="font-semibold text-gray-900">
                      {professionalProfile ? 'Active' : 'Pending'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            {isClient && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                      Your Job Listings
                    </h2>
                    <Link
                      href="/jobs/post"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Post Job
                    </Link>
                  </div>
                </div>
                
                <div className="p-6">
                  {jobs.length === 0 ? (
                    <div className="text-center py-8">
                      <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No job listings yet</h3>
                      <p className="text-gray-500 mb-6">Start by posting your first job to find the right professional</p>
                      <Link
                        href="/jobs/post"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Post Your First Job
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {jobs.map((job) => (
                        <div key={job._id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <Link href={`/jobs/${job._id}`} className="group">
                                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                  {job.title}
                                </h3>
                              </Link>
                              <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {job.location}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <Link
                                href={`/jobs/${job._id}edit/`}
                                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                title="Edit job"
                              >
                                <Edit3 className="w-4 h-4" />
                              </Link>
                              <button
                                onClick={() => handleDeleteJob(job._id)}
                                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                title="Delete job"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {isProfessional && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-purple-600" />
                    Professional Profile
                  </h2>
                </div>
                
                <div className="p-6">
                  {professionalProfile ? (
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start gap-4 mb-4">
                        {professionalProfile.logo?.[0] ? (
                          <img
                            src={professionalProfile.logo[0]}
                            alt="Company Logo"
                            className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Building2 className="w-8 h-8 text-purple-600" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-lg">
                            {professionalProfile.company_info?.name || 'Professional Profile'}
                          </h3>
                          <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {professionalProfile.location?.city}, {professionalProfile.location?.state}
                          </p>
                          <div className="flex gap-2 mt-2">
                            {(Array.isArray(professionalProfile.types) ? professionalProfile.types : [professionalProfile.types])
                              .filter(Boolean)
                              .slice(0, 3)
                              .map((type, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                                >
                                  {type}
                                </span>
                              ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Link
                          href={`/professionals/${professionalProfile._id}/edit`}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                          Edit Profile
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No professional profile yet</h3>
                      <p className="text-gray-500 mb-6">Create your profile to start attracting clients</p>
                      <Link
                        href="/professionals/add"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Create Profile
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/messages"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">Messages</span>
                </Link>
                
                {isClient && (
                  <Link
                    href="/professionals"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Users className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">Find Professionals</span>
                  </Link>
                )}
                
                {isProfessional && (
                  <Link
                    href="/jobs"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Briefcase className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">Browse Jobs</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Account</h3>
              <div className="space-y-3">
                <Link
                  href="/profile/settings"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors w-full text-left"
                >
                  <Settings className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">Account Settings</span>
                </Link>
                
                <Link
                  href="/profile/edit"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors w-full text-left"
                >
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">Edit Profile</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;