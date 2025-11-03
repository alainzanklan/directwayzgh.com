'use client';

import { useState, useEffect } from 'react';
import ProfessionalCard from './ProsCard';
import { fetchPros } from '@/utils/request'; // Fixed import path
import Link from 'next/link';

const HomeJobs = () => {
  const [pros, setPros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfessionals = async () => {
      try {
        const data = await fetchPros();
        setPros(data || []);
      } catch (error) {
        console.error('Error loading professionals:', error);
        setPros([]);
      } finally {
        setLoading(false);
      }
    };

    loadProfessionals();
  }, []);

  // Get random 3 professionals
  const recentPros = pros
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  if (loading) {
    return (
      <section className="mb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Recent Professionals
          </h2>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading professionals...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Recent Professionals
        </h2>
        
        {recentPros.length === 0 ? (
          <p className="text-center text-gray-600">No professionals found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {recentPros.map((pro) => (
              <ProfessionalCard key={pro._id} pros={pro} />
            ))}
          </div>
        )}

        <div className="text-center">
          <Link
            href="/professionals"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            View All Professionals
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeJobs;