'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import profileDefault from '@/assets/images/profile.png';
import Image from 'next/image';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';

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
        // Remove job from state
        const updatedJobs = jobs.filter((job) => job._id !== jobId);

        setJobs(updatedJobs);

        toast.success(' Job Deleted');
      } else {
        toast.error('Failed to delete job');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete job');
    }
  };

  return (
    <>
      <section className='bg-blue-50'>
        <div className='container m-auto py-24'>
          <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
            <h1 className='text-3xl font-bold mb-4'>Your Profile</h1>
            <div className='flex flex-col md:flex-row'>
              <div className='md:w-1/4 mx-20 mt-10'>
                <div className='mb-4'>
                  <Image
                    className='h-24 w-24 md:h-32 md:w-32 rounded-full mx-auto md:mx-0'
                    src={profileDefault || profileImage}
                    alt='User'
                    width={200}
                    height={200}
                  />
                </div>
                <h2 className='text-2xl mb-4'>
                  <span className='font-bold block'>Name: </span> {profileName}
                </h2>
                <h2 className='text-2xl'>
                  <span className='font-bold block'>Email: </span>{' '}
                  {profileEmail}
                </h2>
              </div>
              {profileRole === 'USER' && (
                <div className='mt-8 md:w-3/4 md:pl-4'>
                  <h2 className='text-xl font-semibold mb-4'>Your Listings</h2>
                  {!loading && jobs.length === 0 && (
                    <p>You have no job listings</p>
                  )}
                  {loading ? (
                    <Spinner loading={loading} />
                  ) : (
                    jobs.map((job) => (
                      <div key={job._id} className='mb-10'>
                        <div className='mt-2'>
                          <Link href={`/jobs/${job._id}`}>
                            <h3 className='text-lg font-semibold'>
                              {job.title}
                            </h3>
                          </Link>
                          <p className='text-gray-600'>{job.location}</p>
                        </div>
                        <div className='mt-2'>
                          <Link
                            href={`/jobs/${job._id}/edit`}
                            className='bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600'
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteJob(job._id)}
                            className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
                            type='button'
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
