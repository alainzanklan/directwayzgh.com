'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FaArrowLeft, FaMapMarker } from 'react-icons/fa';
import Link from 'next/link';
import { fetchJob } from '@/utils/request';
import Spinner from '@/components/Spinner';

const JobPage = () => {
  const [job, setJob] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchJobData = async () => {
      if (!id) return;
      try {
        const job = await fetchJob(id);
        setJob(job);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [id]);

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && job && (
        <>
          <section>
            <div className='container m-auto py-6 px-6'>
              <Link
                href='/jobs'
                className='text-indigo-500 hover:text-indigo-600 flex items-center'
              >
                <FaArrowLeft className='mr-2' /> Back to Job Listings
              </Link>
            </div>
          </section>

          <section className='bg-indigo-50'>
            <div className='container m-auto py-10 px-6'>
              <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
                <main>
                  <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left'>
                    <div className='text-gray-500 mb-4'>{job.type}</div>
                    <h1 className='text-3xl font-bold mb-4'>{job.title}</h1>
                    <div className='text-gray-500 mb-4 flex align-middle justify-center md:justify-start'>
                      <FaMapMarker className='text-orange-700 mr-1 mt-1' />
                      <p className='text-orange-700'>{job.location}</p>
                    </div>
                  </div>

                  <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                    <h3 className='text-indigo-800 text-lg font-bold mb-6'>
                      Job Description
                    </h3>

                    <p className='mb-4'>{job.description}</p>

                    <h3 className='text-indigo-800 text-lg font-bold mb-2'>
                      Target Price
                    </h3>

                    <p className='mb-4'>{job.price} </p>
                  </div>
                </main>

                {/* <!-- Sidebar --> */}
                <aside>
                  <div className='bg-white p-6 rounded-lg shadow-md'>
                    <h3 className='text-xl font-bold mb-6'>Employer Info</h3>

                    <h2 className='text-2xl'>{job.company}</h2>

                    <hr className='my-4' />

                    <h3 className='text-xl'>Contact Email:</h3>

                    <p className='my-2 bg-indigo-100 p-2 font-bold'>
                      {job.contactEmail}
                    </p>

                    <h3 className='text-xl'>Contact Phone:</h3>

                    <p className='my-2 bg-indigo-100 p-2 font-bold'>
                      {' '}
                      {job.contactPhone}
                    </p>
                  </div>

                  {/* <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                <h3 className='text-xl font-bold mb-6'>Manage Job</h3>
                <Link
                  to={`/edit-job/${job.id}`}
                  className='bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                >
                  Edit Job
                </Link>
                <button
                  onClick={() => onDeleteClick(job.id)}
                  className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                >
                  Delete Job
                </button>
              </div> */}
                </aside>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default JobPage;
