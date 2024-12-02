'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams, useRouter } from 'next/navigation';
import { fetchJob } from '@/utils/request';

const JobEditForm = () => {
  const { id } = useParams();
  const router = useRouter();

  const [fields, setFields] = useState({
    type: '',
    title: '',
    description: '',
    price: '',
    location: '',
    company: '',
    contactPhone: '',
    contactEmail: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Job data form
    const fetchJobData = async () => {
      try {
        const jobData = await fetchJob(id);
        setFields(jobData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);

      const res = await fetch(`/api/jobs/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (res.status === 200) {
        toast.success('Job updated');
        router.push(`/jobs/${id}`);
      } else if (res.status === 401 || res.status === 403) {
        toast.error('Permission denied');
      } else {
        toast.error('Something went wrong');
      }

      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    !loading && (
      <form onSubmit={handleSubmit}>
        <h2 className='text-3xl text-center font-semibold mb-6'>Edit Job</h2>

        <div className='mb-4'>
          <label htmlFor='type' className='block text-gray-700 font-bold mb-2'>
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
          <label htmlFor='type' className='block text-gray-700 font-bold mb-2'>
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
          <label className='block text-gray-700 font-bold mb-2'>Location</label>
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
            Update Job
          </button>
        </div>
      </form>
    )
  );
};

export default JobEditForm;
