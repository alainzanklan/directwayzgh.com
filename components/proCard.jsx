import Image from 'next/image';
import React from 'react';
import Profile from '@/assets/images/profile.png';
import { FaArrowLeft } from 'react-icons/fa';
import { MdOutlineLocationOn } from 'react-icons/md';
import { TbUserCheck } from 'react-icons/tb';
import { HiOutlineUsers } from 'react-icons/hi';
import { WiTime9 } from 'react-icons/wi';
import Link from 'next/link';

const Procard = ({ pro }) => {
  return (
    <>
      <section>
        <div className='lg:w-4/5 m-auto py-6 px-6'>
          <Link
            href='/professionals'
            className='text-indigo-500 hover:text-indigo-600 flex items-center'
          >
            <FaArrowLeft className='fas fa-arrow-left mr-2' /> Back to Pros
          </Link>
        </div>
      </section>

      {/* <!-- Property Info --> */}
      <section className='bg-indigo-50 lg:w-4/5 mx-auto'>
        <div className=' m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-60/40 w-full gap-6 relative'>
            <main>
              <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left'>
                <div className='text-gray-500 mb-4'>House Cleaning</div>
                <div className='grid grid-cols-3 lg:grid-cols-4 gap-2 text-start'>
                  <div className='h-32 w-32 rounded-full col-span-1 justify-self-end p-2 relative'>
                    <Image
                      src={pro.profile_image}
                      fill
                      alt='profile'
                      className='rounded-full'
                    />
                  </div>
                  <div className='col-span-2 lg:grid-cols-3'>
                    <h1 className=' text-2xl md:text-3xl font-bold mb-4 '>
                      {pro.company_info.name}
                    </h1>
                    <div className='flex gap-1 justify-center justify-items-center'>
                      <p className='text-green-500 text-xs md:text-sm font-semibold md:mb-6'>
                        Exceptional 5.0 ⭐⭐⭐⭐⭐ (16)
                      </p>
                      <button className='md:border-2 border-gray-300 md:py-2 md:px-6 text-gray-500 font-semibold'>
                        &uarr; <span className='hidden'>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                <h3 className='text-lg font-bold mb-2 md:mb-4'>Introduction</h3>
                <p className='text-gray-500 mb-4'>{pro.introduction}</p>
              </div>

              <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <h3 className='text-lg font-bold mb-2 md:mb-4'>Overview</h3>
                    <div className='flex flex-col gap-2 text-gray-500 justify-center justify-items-center'>
                      <ul className='flex flex-col justify-center justify-items-center gap-1'>
                        <li className='flex gap-2 items-center'>
                          <MdOutlineLocationOn height={15} width={15} />{' '}
                          {pro.location.street}, {pro.location.city}
                        </li>
                        <li className='flex gap-2 items-center'>
                          <TbUserCheck height={15} width={15} />
                          Background Checked
                        </li>
                        <li className='flex gap-2 items-center'>
                          <HiOutlineUsers height={15} width={15} /> 1 employee
                        </li>
                        <li className='flex gap-2 items-center'>
                          <WiTime9 height={15} width={15} />3 years in business
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div>
                        <h3 className='text-lg font-bold mb-2 md:mb-4'>
                          Scheduling Policy
                        </h3>
                        <p className='text-gray-500'>
                          You can reserve this pro up to 28 days in advance.
                          They'll need at least 1 day's notice to prepare for
                          the job.
                        </p>
                      </div>
                      <div>
                        <h3 className='text-lg font-bold mb-2 md:mb-4 mt-6'>
                          Payment Methods
                        </h3>
                        <p className='text-gray-500'>
                          This pro accepts payments via Cash, Mobile Money and
                          Cheque.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                <div id='map'></div>
              </div>
            </main>

            {/* <!-- Sidebar --> */}
            <aside className='space-y-4'>
              <div className='sticky top-4 space-y-4'>
                {/*
          <!-- Contact Form --> */}
                <div className='bg-white p-6 rounded-lg shadow-md'>
                  <h3 className='text-xl font-bold mb-6'>
                    {`Contact ${pro.company_info.name}`}
                  </h3>
                  <form>
                    <div className='mb-4'>
                      <label
                        className='block text-gray-700 text-sm font-bold mb-2'
                        htmlFor='name'
                      >
                        Name:
                      </label>
                      <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='name'
                        type='text'
                        placeholder='Enter your name'
                        required
                      />
                    </div>
                    <div className='mb-4'>
                      <label
                        className='block text-gray-700 text-sm font-bold mb-2'
                        htmlFor='email'
                      >
                        Email:
                      </label>
                      <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='email'
                        type='email'
                        placeholder='Enter your email'
                        required
                      />
                    </div>
                    <div className='mb-4'>
                      <label
                        className='block text-gray-700 text-sm font-bold mb-2'
                        htmlFor='phone'
                      >
                        Phone:
                      </label>
                      <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='phone'
                        type='text'
                        placeholder='Enter your phone number'
                      />
                    </div>
                    <div className='mb-4'>
                      <label
                        className='block text-gray-700 text-sm font-bold mb-2'
                        htmlFor='message'
                      >
                        Message:
                      </label>
                      <textarea
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline'
                        id='message'
                        placeholder='Enter your message'
                      ></textarea>
                    </div>
                    <div>
                      <button
                        className='bg-indigo-500 hover:bg-indigo-600 text-indigo-50 font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center'
                        type='submit'
                      >
                        <i className='fas fa-paper-plane mr-2'></i> Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default Procard;
