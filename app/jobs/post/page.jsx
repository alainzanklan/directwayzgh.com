'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

const JobsAddPage = () => {
  const [fields, setFields] = useState({
    type: 'Carpenters',
    title: 'need a carpenter',
    description: 'Need a good carpenter to fix my door',
    price: '1000₵ - 1500₵',
    location: 'Ashongman ',
    company: 'Madiba',
    contactPhone: '056 989 0090',
    contactEmail: 'madiba@gmail.com',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form action='/api/jobs' method='POST'>
            <h2 className='text-3xl text-center font-semibold mb-6'>
              Post Job
            </h2>

            <div className='mb-4'>
              <label
                htmlFor='type'
                className='block text-gray-700 font-bold mb-2'
              >
                Job Type
              </label>
              <select
                id='type'
                name='type'
                className='border rounded w-full py-2 px-3'
                required
                value={fields.type}
                onChange={handleChange}
              >
                <option value='Cleaning'>Cleaning</option>
                <option value='Electrician'>Electrician</option>
                <option value='Plumbers'>Plumbers</option>
                <option value='Carpenters'>Carpenters</option>
                <option value='Photography & Videography'>
                  Photography & Videography
                </option>
                <option value='Health, Beauty & Fashion'>
                  Health, Beauty & Fashion
                </option>
                <option value='Computing & IT'>Computing & IT</option>
                <option value='Other'>Other</option>
              </select>
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Job Listing Name
              </label>
              <input
                type='text'
                id='title'
                name='title'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='eg. Need a carpenter in East Legon'
                required
                value={fields.title}
                onChange={handleChange}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='description'
                className='block text-gray-700 font-bold mb-2'
              >
                Description
              </label>
              <textarea
                id='description'
                name='description'
                className='border rounded w-full py-2 px-3'
                rows='4'
                placeholder='Add any job duties, expectations, requirements, etc'
                value={fields.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className='mb-4'>
              <label
                htmlFor='type'
                className='block text-gray-700 font-bold mb-2'
              >
                Target Price
              </label>
              <select
                id='price'
                name='price'
                className='border rounded w-full py-2 px-3'
                required
                value={fields.price}
                onChange={handleChange}
              >
                <option value='Under 100₵'>Under 100₵</option>
                <option value='100₵ - 250₵'>100₵ - 250₵</option>
                <option value='250₵ - 500₵'>250₵ - 500₵</option>
                <option value='500₵ - 750₵'>500₵ - 750₵</option>
                <option value='750₵ - 1000₵'>750₵ - 1000₵</option>
                <option value='1000₵ - 1500₵'>1000₵ - 1500₵</option>
                <option value='1500₵ - 2000₵'>1500₵ - 2000₵</option>
                <option value='2000₵ - 2500₵'>2000₵ - 2500₵</option>
                <option value='2500₵ - 3000₵'>2500₵ - 3000₵</option>
                <option value='3000₵ - 3500₵'>3000₵ - 3500₵</option>
                <option value='Over 3500₵'>Over 3500₵</option>
              </select>
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Location
              </label>
              <input
                type='text'
                id='location'
                name='location'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Your Location'
                required
                value={fields.location}
                onChange={handleChange}
              />
            </div>

            <h3 className='text-2xl mb-5'>Your Info</h3>

            <div className='mb-4'>
              <label
                htmlFor='company'
                className='block text-gray-700 font-bold mb-2'
              >
                Name
              </label>
              <input
                type='text'
                id='company'
                name='company'
                className='border rounded w-full py-2 px-3'
                placeholder='Your Name'
                value={fields.company}
                onChange={handleChange}
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='contact_email'
                className='block text-gray-700 font-bold mb-2'
              >
                Contact Email
              </label>
              <input
                type='email'
                id='contactEmail'
                name='contactEmail'
                className='border rounded w-full py-2 px-3'
                placeholder='Email address for applicants'
                required
                value={fields.contactEmail}
                onChange={handleChange}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='contact_phone'
                className='block text-gray-700 font-bold mb-2'
              >
                Contact Phone
              </label>
              <input
                type='tel'
                id='contactPhone'
                name='contactPhone'
                className='border rounded w-full py-2 px-3'
                placeholder='Optional phone for applicants'
                value={fields.contactPhone}
                onChange={handleChange}
              />
            </div>

            <div>
              <button
                className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Add Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default JobsAddPage;
