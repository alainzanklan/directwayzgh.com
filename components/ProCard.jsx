import Image from 'next/image';
import React from 'react';
import { FaArrowLeft, FaCheck, FaPaperPlane, FaPhoneAlt } from 'react-icons/fa';
import { MdOutlineLocationOn, MdOutlineStarPurple500 } from 'react-icons/md';
import { TbUserCheck } from 'react-icons/tb';
import { HiOutlineUsers, HiOutlineShieldCheck } from 'react-icons/hi';
import { WiTime9 } from 'react-icons/wi';
import { FaCediSign } from 'react-icons/fa6';
import Link from 'next/link';
import ShareButtons from './ShareButtons';
import ProContactForm from './ProContactForm';

const ProCard = ({ pro }) => {
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

      {/* <!-- Professional Info --> */}
      <section className='bg-indigo-50 lg:w-4/5 mx-auto'>
        <div className=' m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-60/40 w-full gap-6 relative'>
            <main>
              <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left'>
                <div className='grid grid-cols-3 lg:grid-cols-4 gap-2 text-center md:text-left'>
                  {/* <div className='h-16 w-16 rounded-full col-span-1 justify-self-end py-2 relative '>
                    <Image
                      src={pro.logo[0]}
                      fill
                      alt='profile'
                      className='rounded-full p-2'
                      sizes='16'
                      priority={true}
                    />
                  </div> */}
                  <div className='col-span-3 '>
                    <div className='text-gray-500 mb-2 md:text-[1em]'>
                      {pro.type}
                    </div>
                    <h1 className=' flex text-3xl text-slate-700 font-bold mb-2 items-center gap-2 justify-center md:justify-start '>
                      {pro.company_info.name}
                      {pro.licensed && (
                        <HiOutlineShieldCheck
                          height={24}
                          width={24}
                          className='text-indigo-500'
                        />
                      )}
                    </h1>
                    <div className='flex gap-1 justify-center md:justify-start'>
                      <p className='text-green-500 text-xs md:text-[1em] font-semibold mb-2 flex flex-row items-center'>
                        Exceptional 5.0{' '}
                        <MdOutlineStarPurple500
                          height={15}
                          width={15}
                          className='text-yellow-500'
                        />{' '}
                        (10)
                      </p>
                    </div>

                    <div className='flex justify-center md:justify-start'>
                      {pro.licensed && (
                        <p className='bg-gray-100 text-indigo-500 text-xs md:text-sm font-semibold px-4 py-1 mb-2'>
                          Licensed Pro
                        </p>
                      )}
                    </div>

                    <div className='flex items-center justify-center md:justify-start'>
                      <p className='text-gray-500 '>
                        <strong>{pro.price}₵</strong> starting price
                      </p>
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
                          <HiOutlineUsers height={15} width={15} />{' '}
                          {pro.employees}{' '}
                          {pro.employees < 1 ? 'employee' : 'employees'}
                        </li>
                        <li className='flex gap-2 items-center'>
                          <WiTime9 height={15} width={15} />3 years in business
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div>
                      {/* <div>
                        <h3 className='text-lg font-bold mb-2 md:mb-4'>
                          Scheduling Policy
                        </h3>
                        <p className='text-gray-500'>
                          You can reserve this pro up to 28 days in advance.
                          They'll need at least 1 day's notice to prepare for
                          the job.
                        </p>
                      </div> */}
                      <div>
                        <h3 className='text-lg font-bold mb-2 md:mb-4'>
                          Accepted Payment
                        </h3>
                        <ul className='grid grid-cols-1 list-none text-gray-500 items-center justify-center'>
                          {pro.payment.map((payment, index) => (
                            <li key={index} className='flex '>
                              {' '}
                              <FaCheck className='inline-block text-gray-500 mr-2 mt-1' />
                              {payment}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                <div>
                  <ShareButtons pro={pro} />
                </div>
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
                  <ProContactForm pro={pro} />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProCard;
