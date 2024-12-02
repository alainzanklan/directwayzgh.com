'use client';
import { useState, useEffect } from 'react';
import JobListing from '@/components/JobListing';
import Spinner from '@/components/Spinner';

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

  jobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <section className='bg-blue-50 px-4 py-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
          {isLeads === 'Leads' ? 'Browse Leads' : 'Browse Jobs'}
        </h2>
        {loading && <Spinner loading={loading} />}
        {!loading && jobs.length === 0 ? (
          <p>No jobs found</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {jobs.map((job) => (
              <JobListing key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default JobListings;
