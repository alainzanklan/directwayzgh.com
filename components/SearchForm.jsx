'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchForm = () => {
  const [location, setLocation] = useState('');
  const [proType, setProType] = useState('All');

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location === '' && proType === 'All') {
      router.push('/professionals');
    } else {
      const query = `?location=${location}&proType=${proType}`;
      router.push(`/professionals/search-result${query}`);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className='mt-6 mx-auto max-w-2xl w-full flex flex-col md:flex-row'
    >
      <div className='w-full rounded-lg md:w-3/5 md:pr-2 mb-4 md:mb-0 '>
        <label htmlFor='location' className='sr-only'>
          Location
        </label>
        <input
          type='text'
          id='location'
          placeholder='Enter Keywords or Location'
          className='w-full px-4 py-3  bg-white text-gray-800 focus:outline-none rounded-lg'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className='w-full mr-2 md:w-2/5 md:pl-2'>
        <label htmlFor='job-type' className='sr-only'>
          Job Type
        </label>
        <select
          id='job-type'
          className='w-full px-4 py-3 bg-white text-gray-800 focus:outline-none rounded-lg'
          value={proType}
          onChange={(e) => setProType(e.target.value)}
        >
          <option value='All'>All</option>
          <option value='Cleaning'>Cleaning Services</option>
          <option value='Electrician'>Electrician</option>
          <option value='Plumbers'>Plumbers</option>
          <option value='Carpenters'>Carpenters</option>
          <option value='Photography'>Photography & Videography</option>
          <option value='Health'>Health, Beauty and Fashion</option>
          <option value='Computing'>Computing & IT</option>
          <option value='Other'>Other</option>
        </select>
      </div>
      <button
        type='submit'
        className='mt-4  md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg  bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-500'
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
