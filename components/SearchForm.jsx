'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Briefcase } from 'lucide-react';

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

  const serviceTypes = [
    { value: 'All', label: 'All Services' },
    { value: 'Cleaning', label: 'Cleaning Services' },
    { value: 'Electrician', label: 'Electrician' },
    { value: 'Plumbers', label: 'Plumbers' },
    { value: 'Carpenters', label: 'Carpenters' },
    { value: 'Photography', label: 'Photography & Videography' },
    { value: 'Health', label: 'Health, Beauty & Fashion' },
    { value: 'Computing', label: 'Computing & IT' },
    { value: 'Other', label: 'Other' },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className='mt-8 mx-auto max-w-4xl w-full'
    >
      <div className='bg-white rounded-2xl shadow-2xl p-3 border border-gray-100'>
        <div className='flex flex-col md:flex-row gap-3'>
          {/* Location Input */}
          <div className='flex-1 relative'>
            <label htmlFor='location' className='sr-only'>
              Location
            </label>
            <div className='relative'>
              <MapPin className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
              <input
                type='text'
                id='location'
                placeholder='Enter location or keywords...'
                className='w-full pl-12 pr-4 py-3.5 bg-gray-50 text-gray-800 rounded-xl border-2 border-transparent focus:border-indigo-500 focus:bg-white focus:outline-none transition-all'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          {/* Service Type Select */}
          <div className='md:w-64 relative'>
            <label htmlFor='job-type' className='sr-only'>
              Service Type
            </label>
            <div className='relative'>
              <Briefcase className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none' />
              <select
                id='job-type'
                className='w-full pl-12 pr-4 py-3.5 bg-gray-50 text-gray-800 rounded-xl border-2 border-transparent focus:border-indigo-500 focus:bg-white focus:outline-none transition-all appearance-none cursor-pointer'
                value={proType}
                onChange={(e) => setProType(e.target.value)}
              >
                {serviceTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <div className='absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none'>
                <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                </svg>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <button
            type='submit'
            className='md:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group'
          >
            <Search className='w-5 h-5 group-hover:scale-110 transition-transform' />
            <span className='hidden sm:inline'>Search</span>
          </button>
        </div>
      </div>

      {/* Quick filters (optional) */}
      <div className='mt-4 flex flex-wrap gap-2 justify-center'>
        {['Cleaning', 'Electrician', 'Plumbers', 'Carpenters'].map((type) => (
          <button
            key={type}
            type='button'
            onClick={() => {
              setProType(type);
              const query = `?location=${location}&proType=${type}`;
              router.push(`/professionals/search-result${query}`);
            }}
            className='px-4 py-2 bg-white hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 rounded-lg text-sm font-medium border border-gray-200 hover:border-indigo-300 transition-all'
          >
            {type}
          </button>
        ))}
      </div>
    </form>
  );
};

export default SearchForm;