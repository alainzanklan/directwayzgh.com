'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, X, Briefcase, Star, Lock, Mail, Phone, Building2, Eye, Trash2, Edit3 } from 'lucide-react';
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

// Premium Upgrade Banner
const PremiumBanner = () => (
  <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6 mb-6">
    <div className="flex items-center justify-between">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-amber-100 rounded-lg">
          <Star className="w-6 h-6 text-amber-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-amber-900 mb-1">
            Unlock Employer Contact Details
          </h3>
          <p className="text-amber-700 text-sm mb-3">
            Get direct access to employer information and apply for this job
          </p>
          <ul className="text-xs text-amber-600 space-y-1">
            <li>✓ Direct email and phone contact</li>
            <li>✓ Company information</li>
            <li>✓ Priority application status</li>
            <li>✓ Access to all job details</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Link
          href="/pricing"
          className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors text-center"
        >
          Unlock Now
        </Link>
        <span className="text-xs text-amber-600 text-center">From GH₵ 99/mo</span>
      </div>
    </div>
  </div>
);

// Employer Info Component
const EmployerInfo = ({ job, isPremium, isOwner }) => {
  if (isPremium || isOwner) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Building2 className="w-5 h-5 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-900">Employer Info</h3>
          <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full ml-auto">
            <Star className="w-3 h-3" />
            Premium Access
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">{job.company}</h4>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Contact Email</p>
                  <p className="text-blue-600 font-medium">{job.contactEmail}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Phone className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Contact Phone</p>
                  <p className="text-blue-600 font-medium">{job.contactPhone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
              <Mail className="w-4 h-4" />
              Contact Employer
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Non-premium view
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative">
      <div className="flex items-center gap-2 mb-6">
        <Building2 className="w-5 h-5 text-gray-400" />
        <h3 className="text-xl font-semibold text-gray-900">Employer Info</h3>
        <div className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full ml-auto">
          <Lock className="w-3 h-3" />
          Premium
        </div>
      </div>

      {/* Blurred content */}
      <div className="space-y-4 relative">
        <div className="filter blur-sm pointer-events-none select-none">
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">Premium Company Ltd.</h4>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Contact Email</p>
                  <p className="text-gray-600">contact@company.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Contact Phone</p>
                  <p className="text-gray-600">+233 XX XXX XXXX</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90">
          <div className="text-center p-6">
            <Lock className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Unlock Employer Details</h4>
            <p className="text-gray-600 text-sm mb-4">Get direct contact information to apply for this job</p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors"
            >
              <Star className="w-4 h-4" />
              Go Premium
            </Link>
          </div>
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
              <div className="flex items-start justify-between mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {job.type}
                </span>
                {isPremium && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    <Star className="w-3 h-3" />
                    Premium Access
                  </div>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>
              
              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <MapPin className="w-5 h-5 text-orange-600" />
                <span className="text-orange-600 font-medium">
                  {isPremium || isOwner ? job.location : job.location.split(',').slice(-1)[0].trim()}
                </span>
                {!isPremium && !isOwner && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Lock className="w-3 h-3" />
                    <span>Full address with Premium</span>
                  </div>
                )}
              </div>
            </div>

            {/* Premium Banner for Non-Premium Users */}
            {!isPremium && !isOwner && <PremiumBanner />}

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
                  {isPremium || isOwner 
                    ? job.description 
                    : job.description.length > 200 
                      ? job.description.substring(0, 200) + '...' 
                      : job.description
                  }
                </p>
                
                {!isPremium && !isOwner && job.description.length > 200 && (
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-amber-600" />
                        <span className="text-sm text-amber-800 font-medium">Full description available with Premium</span>
                      </div>
                      <Link
                        href="/pricing"
                        className="text-xs bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded-full transition-colors"
                      >
                        Upgrade
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-6 mt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Target Price</h4>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-green-600">
                    {isPremium || isOwner ? job.price : 'Contact for pricing'}
                  </span>
                  {!isPremium && !isOwner && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Lock className="w-3 h-3" />
                      <span>Premium</span>
                    </div>
                  )}
                </div>
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

            {/* Quick Actions for Non-Owners */}
            {!isOwner && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  {isPremium ? (
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors">
                      <Mail className="w-4 h-4" />
                      Apply Now
                    </button>
                  ) : (
                    <Link
                      href="/pricing"
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors"
                    >
                      <Star className="w-4 h-4" />
                      Upgrade to Apply
                    </Link>
                  )}
                </div>
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