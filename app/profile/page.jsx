'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { User, Mail, Briefcase, Edit3, Trash2, Plus, MapPin } from 'lucide-react';
import profileDefault from '@/assets/images/profile.png';
import { toast } from 'react-toastify';

// Loading Spinner Component
const Spinner = ({ loading }) => {
  if (!loading) return null;
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );
};

// Job Card Component
const JobCard = ({ job, onDelete }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <Link href={`/jobs/${job._id}`} className="group">
            <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
              {job.title}
            </h3>
          </Link>
          <p className="text-gray-600 text-sm flex items-center mb-4">
            <MapPin className="w-4 h-4 mr-2" />
            {job.location}
          </p>
        </div>
      </div>
      
      <div className="flex gap-3">
        <Link
          href={`/jobs/${job._id}/edit`}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
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

const ProfilePage = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;
  const profileRole = session?.user?.role;

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

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

    if (session?.user?.id) {
      fetchJobsData(session.user.id);
    }
  }, [session]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-12 px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Profile Info */}
            <div className="lg:w-1/3">
              <div className="flex flex-col items-center lg:items-start">
                <div className="relative mb-6">
                  <Image
                    className="h-32 w-32 rounded-full object-cover shadow-lg"
                    src={profileImage || profileDefault}
                    alt="User Profile"
                    width={128}
                    height={128}
                  />
                </div>
                
                <div className="text-center lg:text-left space-y-4">
                  <div>
                    <div className="flex items-center justify-center lg:justify-start mb-2">
                      <User className="w-5 h-5 text-gray-500 mr-2" />
                      <span className="font-semibold text-gray-700">Name</span>
                    </div>
                    <p className="text-xl text-gray-900">{profileName}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-center lg:justify-start mb-2">
                      <Mail className="w-5 h-5 text-gray-500 mr-2" />
                      <span className="font-semibold text-gray-700">Email</span>
                    </div>
                    <p className="text-lg text-gray-900">{profileEmail}</p>
                  </div>

                  <div className="pt-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {profileRole === 'USER' ? 'User' : 'Admin'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Listings */}
            {profileRole === 'USER' && (
              <div className="lg:w-2/3">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                    <Briefcase className="w-6 h-6 mr-2" />
                    Your Listings
                  </h2>
                  <Link
                    href="/jobs/add"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Add Job
                  </Link>
                </div>

                {loading ? (
                  <Spinner loading={loading} />
                ) : jobs.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No job listings yet</h3>
                    <p className="text-gray-600 mb-6">Get started by creating your first job listing</p>
                    <Link
                      href="/jobs/add"
                      className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;