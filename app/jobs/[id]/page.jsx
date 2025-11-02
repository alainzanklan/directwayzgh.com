'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FaArrowLeft, FaMapMarker, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { fetchJob } from '@/utils/request';
import Spinner from '@/components/Spinner';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

const JobPage = () => {

  const router = useRouter();
  const [job, setJob] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const { data: session } = useSession();

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

  const handleDeleteJob = async () => {
      const confirm = window.confirm('Are you sure you want to delete this job?');
  
      if (!confirm) {
        return;
      }
  
      try {
        const res = await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
        if (res.status === 200) {
         toast.success('Job Deleted');
          router.push('/profile')
        } else {
          toast.error('Failed to delete job');
        }
      } catch (error) {
        console.log(error);
        toast.error('Failed to delete job');
      }
    };

  // Check if current user owns this job
  const isOwner = session?.user?.id === job.owner;

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

                  {/* Image Gallery Section */}
                  {job.images && job.images.length > 0 && (
                    <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                      <h3 className='text-indigo-800 text-lg font-bold mb-4'>
                        Photos
                      </h3>
                      <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3'>
                        {job.images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImage(image)}
                            className='relative h-24 rounded-lg overflow-hidden hover:opacity-90 transition-opacity'
                          >
                            <Image
                              src={image}
                              alt={`${job.title} ${index + 1}`}
                              fill
                              className='object-cover'
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

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

                  {/* Manage Job - Only show if user owns the job */}
                  {isOwner && (
                    <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                      <h3 className='text-xl font-bold mb-6'>Manage Job</h3>
                      <Link
                        href={`/jobs/${job._id}/edit`}
                        className='bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                      >
                        Edit Job
                      </Link>
                      <button
                        onClick={() => handleDeleteJob()}
                        className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                      >
                        Delete Job
                      </button>
                    </div>
                  )}
                </aside>
              </div>
            </div>
          </section>

          {/* Image Modal */}
          {selectedImage && (
            <div
              className='fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4'
              onClick={() => setSelectedImage(null)}
            >
              <button
                className='absolute top-4 right-4 text-white hover:text-gray-300'
                onClick={() => setSelectedImage(null)}
              >
                <FaTimes size={30} />
              </button>
              <div className='relative w-full max-w-4xl h-[80vh]'>
                <Image
                  src={selectedImage}
                  alt='Selected image'
                  fill
                  className='object-contain'
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default JobPage;