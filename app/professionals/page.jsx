'use client';

import { useState, useEffect } from 'react';
import ProfessionalCard from '@/components/ProsCard';
import { fetchPros } from '@/utils/request'; // Fixed import path
import SearchForm from '@/components/SearchForm';
import { Users, Filter } from 'lucide-react';
import Link from 'next/link';

const EmptyState = () => (
  <div className="text-center py-20">
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <Users className="w-8 h-8 text-gray-400" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-3">No professionals found</h3>
    <p className="text-gray-600 max-w-md mx-auto">
      Try adjusting your search criteria or check back later for new professionals.
    </p>
  </div>
);

const LoadingState = () => (
  <div className="text-center py-20">
    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto mb-6"></div>
    <h3 className="text-xl font-semibold text-gray-900 mb-3">Loading professionals...</h3>
    <p className="text-gray-600">Please wait while we fetch the latest professionals.</p>
  </div>
);

const ProsPage = () => {
  const [pros, setPros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfessionals = async () => {
      try {
        setLoading(true);
        const data = await fetchPros();
        const sortedPros = (data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPros(sortedPros);
      } catch (error) {
        console.error('Error loading professionals:', error);
        setError('Failed to load professionals');
      } finally {
        setLoading(false);
      }
    };

    loadProfessionals();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Professionals</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-900 py-16 bg-[url('/hero-pro.jpg')] bg-cover bg-center bg-blend-overlay opacity-90">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Trusted Professionals
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Connect with skilled professionals in your area
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <SearchForm />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header with Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Available Professionals
              </h2>
              <p className="text-gray-600">
                {loading ? 'Loading...' : `${pros.length} professionals ready to help`}
              </p>
            </div>
            
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm">
                <option>Newest first</option>
                <option>Best rated</option>
                <option>Most reviews</option>
              </select>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <LoadingState />
          ) : pros.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {pros.map((professional) => (
                  <div key={professional._id} className="hover:scale-105 transition-transform duration-200">
                    <ProfessionalCard pros={professional} />
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Load More
                </button>
                <p className="text-sm text-gray-500 mt-3">
                  Showing {pros.length} professionals
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Are You a Professional?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our network and connect with clients looking for your services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={'/register-pro'}>
              <button className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                Join as Professional
              </button>
            </Link>
            <Link href={'/about-us'}>
              <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProsPage;