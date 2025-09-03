'use client';

import { useState, useEffect } from 'react';
import JobListing from '@/components/JobListing';
import { Search, Filter, Briefcase, MapPin, Clock } from 'lucide-react';

// Modern Spinner Component
const ModernSpinner = ({ loading }) => {
  if (!loading) return null;
  return (
    <div className="flex items-center justify-center py-16">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-blue-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

// Empty State Component
const EmptyState = ({ isLeads }) => (
  <div className="text-center py-16">
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <Briefcase className="w-8 h-8 text-gray-400" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">
      No {isLeads === 'Leads' ? 'leads' : 'jobs'} available
    </h3>
    <p className="text-gray-600 mb-6">
      {isLeads === 'Leads' 
        ? 'Check back later for new leads or adjust your search criteria.' 
        : 'Be the first to post a job or check back later for new opportunities.'
      }
    </p>
    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
      {isLeads === 'Leads' ? 'Post a Lead' : 'Post a Job'}
    </button>
  </div>
);

// Stats Bar Component
const StatsBar = ({ jobCount, isLeads }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-gray-900">
            {jobCount} {isLeads === 'Leads' ? 'Leads' : 'Jobs'} Available
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>Updated recently</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline">Search</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
          <Filter className="w-4 h-4" />
          <span className="hidden sm:inline">Filter</span>
        </button>
      </div>
    </div>
  </div>
);

const JobListings = ({ isLeads }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const apiUrl = '/api/jobs';
      try {
        const res = await fetch(apiUrl, { cache: 'no-store' });
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.log('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Sort jobs by creation date (newest first)
  jobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {isLeads === 'Leads' ? 'Browse Available Leads' : 'Discover Your Next Opportunity'}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {isLeads === 'Leads' 
              ? 'Connect with clients looking for your services and grow your business'
              : 'Find the perfect job that matches your skills and career goals'
            }
          </p>
        </div>

        {/* Loading State */}
        {loading && <ModernSpinner loading={loading} />}

        {/* Content */}
        {!loading && (
          <>
            {jobs.length === 0 ? (
              <EmptyState isLeads={isLeads} />
            ) : (
              <>
                {/* Stats and Controls */}
                <StatsBar jobCount={jobs.length} isLeads={isLeads} />

                {/* Job Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {jobs.map((job) => (
                    <div key={job._id} className="transform hover:scale-105 transition-transform duration-200">
                      <JobListing job={job} />
                    </div>
                  ))}
                </div>

                {/* Load More Section */}
                {jobs.length > 0 && (
                  <div className="text-center mt-12">
                    <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                      Load More {isLeads === 'Leads' ? 'Leads' : 'Jobs'}
                    </button>
                    <p className="text-sm text-gray-500 mt-3">
                      Showing {jobs.length} of {jobs.length} results
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default JobListings;