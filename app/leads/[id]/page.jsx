'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, MapPin, Building, Mail, Phone, Lock } from 'lucide-react';
import Link from 'next/link';
import { fetchLead } from '@/utils/request';
import Spinner from '@/components/Spinner';
import { useSession } from 'next-auth/react';

const LeadPage = () => {
  const { data: session } = useSession();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const isPaidMember = session?.user?.isPaidMember;

  useEffect(() => {
    const fetchLeadData = async () => {
      if (!id) return;
      try {
        const jobData = await fetchLead(id);
        setJob(jobData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeadData();
  }, [id]);

  if (loading) return <Spinner loading={loading} />;
  if (!job) return null;

  const ContactField = ({ icon: Icon, label, value, isPremium = false }) => {
    const shouldHide = isPremium && !isPaidMember;
    
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <Icon size={16} />
          {label}
        </div>
        {shouldHide ? (
          <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3">
            <Lock size={16} className="text-blue-500" />
            <span className="text-blue-700 font-medium">Premium members only</span>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-3 font-mono text-sm">
            {value}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link
            href="/leads"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Leads
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Details - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="mb-3">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {job.type}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {job.title}
              </h1>
              
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={18} className="text-orange-500" />
                <span className="text-orange-600 font-medium">{job.location}</span>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Job Description
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {job.description}
              </p>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Target Price
                </h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <span className="text-2xl font-bold text-green-700">
                    {job.price}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Employer Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Employer Information
              </h2>
              
              <div className="space-y-6">
                {/* Company Name - Always visible */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                    <Building size={16} />
                    Employer
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    {job.company}
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* Contact Email - Premium only */}
                <ContactField
                  icon={Mail}
                  label="Contact Email"
                  value={job.contactEmail}
                  isPremium={true}
                />

                {/* Contact Phone - Premium only */}
                <ContactField
                  icon={Phone}
                  label="Contact Phone"
                  value={job.contactPhone}
                  isPremium={true}
                />
              </div>

              {/* Upgrade CTA for non-paid members */}
              {!isPaidMember && (
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white">
                  <h3 className="font-semibold mb-2">Get Full Access</h3>
                  <p className="text-sm text-blue-100 mb-3">
                    Upgrade to premium to view contact information and connect directly with employers.
                  </p>
                  <button className="w-full bg-white text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                    Upgrade Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadPage;