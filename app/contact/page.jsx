'use client';

import Link from 'next/link';
import React from 'react';
import { RiCustomerServiceFill } from 'react-icons/ri';
import { MdOutlineAlternateEmail } from 'react-icons/md';

const ContactPage = () => {
  const handleSubmit = () => {};
  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto py-24 max-w-6xl'>
        <div className='bg-indigo-50 px-6 py-8 mb-4  m-4 md:m-0'>
          <div className='text-indigo-700 text-4xl md:text-5xl py-6 font-bold'>
            <h1 className='mb-6'> Contact us</h1>
            <h2 className='text-indigo-900 text-3xl m:text-3xl font-semibold'>
              Reach out anytime
            </h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 justify-center'>
            <div className=''>
              <div className='max-w-xl mb-4 bg-white border rounded-md shadow-md'>
                <div className=' px-4 py-4 rounded-md grid grid-cols-4'>
                  <div className='col-span-3'>
                    <h3 className='text-2xl font-semibold text-indigo-800 mb-6'>
                      Customer Support
                    </h3>
                    <Link className='text-blue-600 text-xl' href='/faq'>
                      +233 245 222 0000
                    </Link>
                  </div>
                  <div className='col-span-1 hidden md:flex text-5xl items-center'>
                    <RiCustomerServiceFill
                      height={20}
                      width={20}
                      className=' text-indigo-800'
                    />
                  </div>
                </div>
              </div>
              <div className='max-w-xl mb-4 bg-white  border rounded-md shadow-md'>
                <div className='px-4 py-4 rounded-md grid grid-cols-4'>
                  <div className='col-span-3'>
                    <h3 className='text-2xl font-semibold text-indigo-800 mb-6'>
                      General Inquiries
                    </h3>
                    <Link
                      className='text-blue-600 underline text-xl'
                      href='/faq'
                    >
                      info@directwayzgh.com
                    </Link>
                  </div>
                  <div className='col-span-1 hidden md:flex text-5xl items-center'>
                    <MdOutlineAlternateEmail
                      height={20}
                      width={20}
                      className=' text-indigo-800'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='container m-auto max-w-xl'>
              <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border md:m-0'>
                <h2 className='text-2xl text-indigo-800 text-center font-semibold mb-6'>
                  Contact Form
                </h2>

                <form onSubmit={handleSubmit}>
                  {/* <!-- First Name --> */}
                  <div className='mb-4'>
                    <label
                      htlmfor='Name'
                      className='block text-indigo-800 font-bold mb-2'
                    >
                      Name
                    </label>
                    <input
                      type='text'
                      id='Name'
                      name='Name'
                      className='border rounded w-full py-2 px-3 mb-2'
                      placeholder='Full Name'
                      // value={name}
                      // onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  {/* <!-- Username --> */}
                  <div className='mb-4'>
                    <label
                      htlmfor='email'
                      className='block text-indigo-800 font-bold mb-2'
                    >
                      Email
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      className='border rounded w-full py-2 px-3 mb-2'
                      placeholder='Email address'
                      // value={email}
                      // onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {/* <!-- Text Area--> */}
                  <div className='mb-4'>
                    <label
                      htlmfor='Message'
                      className='block text-indigo-800 font-bold mb-2'
                    >
                      Message
                    </label>
                    <textarea
                      type='text'
                      id='Message'
                      name='Message'
                      className='border rounded w-full py-2 px-3 mb-2'
                      placeholder='Full Name'
                      // value={name}
                      // onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  {/* 
                        {/* <!-- Submit Button --> */}
                  <div>
                    <button
                      className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                      type='submit'
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
