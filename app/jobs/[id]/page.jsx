'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, X, Briefcase, Lock, Mail, Phone, Building2, Eye, Trash2, Edit3 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchJob } from '@/utils/request';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

// Loading Spinner
const Spinner = ({ loading }) => {
  if (!loading) return null;
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-blue-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

// Simple Employer Info Component
const EmployerInfo = ({ job, isPremium, isOwner }) => {
  if (isPremium || isOwner) {
    // Show full employer info for premium users and job owners
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Building2 className="w-5 h-5 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-900">Employer Info</h3>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">{job.company}</h4>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-700">Contact Email</p>
                <a href={`mailto:${job.contactEmail}`} className="text-blue-600 font-medium hover:text-blue-700">
                  {job.contactEmail}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Phone className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-700">Contact Phone</p>
                <a href={`tel:${job.contactPhone}`} className="text-blue-600 font-medium hover:text-blue-700">
                  {job.contactPhone}
                </a>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <a
              href={`mailto:${job.contactEmail}`}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              <Mail className="w-4 h-4" />
              Contact Employer
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Show limited info for non-premium users
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Building2 className="w-5 h-5 text-blue-600" />
        <h3 className="text-xl font-semibold text-gray-900">Employer Info</h3>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-4">{job.company}</h4>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <Lock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Contact Details</h4>
          <p className="text-gray-600 text-sm mb-4">
            Upgrade to Premium to access employer contact information
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Upgrade to Premium
          </Link>
        </div>
      </div>
    </div>
  );
};

const JobPage = () => {
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const { data: session } = useSession();

  const { id } = useParams();
  const user = session?.user;
  const isPremium = user?.isPremium || user?.subscription === 'premium' || user?.role === 'PREMIUM';
  const isOwner = user?.id === job?.owner;

  useEffect(() => {
    const fetchJobData = async () => {
      if (!id) return;
      try {
        const jobData = await fetchJob(id);
        setJob(jobData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [id]);

  const handleDeleteJob = async () => {
    const confirm = window.confirm('Are you sure you want to delete this job?');
    if (!confirm) return;

    try {
      const res = await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
      if (res.status === 200) {
        toast.success('Job Deleted');
        router.push('/profile');
      } else {
        toast.error('Failed to delete job');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete job');
    }
  };

  if (loading) {
    return <Spinner loading={loading} />;
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
          <Link href="/jobs" className="text-blue-600 hover:text-blue-700">
            Back to Job Listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Job Listings
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Job Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {job.type}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>
              
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="text-blue-600 font-medium">{job.location}</span>
              </div>
            </div>

            {/* Image Gallery */}
            {job.images && job.images.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Eye className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Photos</h3>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {job.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(image)}
                      className="relative h-24 rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                    >
                      <Image
                        src={image}
                        alt={`${job.title} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Job Description */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Job Description</h3>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  {job.description}
                </p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Budget</h4>
                <span className="text-2xl font-bold text-green-600">{job.price}</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Employer Info */}
            <EmployerInfo job={job} isPremium={isPremium} isOwner={isOwner} />

            {/* Job Owner Management */}
            {isOwner && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Manage Job</h3>
                <div className="space-y-3">
                  <Link
                    href={`/jobs/edit/${job._id}`}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Job
                  </Link>
                  <button
                    onClick={handleDeleteJob}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Job
                  </button>
                </div>
              </div>
            )}

            {/* Apply Section for Non-Owners */}
            {!isOwner && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Interested in this job?</h3>
                {isPremium ? (
                  <p className="text-gray-600 text-sm mb-4">
                    Contact the employer directly using the information above.
                  </p>
                ) : (
                  <div>
                    <p className="text-gray-600 text-sm mb-4">
                      Upgrade to Premium to access employer contact information and apply for this job.
                    </p>
                    <Link
                      href="/pricing"
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                      View Pricing
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 p-2"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative w-full max-w-4xl h-[80vh]">
            <Image
              src={selectedImage}
              alt="Selected image"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPage;