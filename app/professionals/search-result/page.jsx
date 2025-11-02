'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import ProfessionalCard from '@/components/ProsCard';
import SearchForm from '@/components/SearchForm';
import Spinner from '@/components/Spinner';

const SearchResultPage = () => {
  const searcheParams = useSearchParams();

  const [pros, setPros] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = searcheParams.get('location');
  const proType = searcheParams.get('proType');

  useEffect(() => {
    const fetchSearchResult = async () => {
      try {
        const res = await fetch(
          `/api/professionals/search?location=${location}&proType=${proType}`
        );

        if (res.status === 200) {
          const data = await res.json();
          setPros(data);
        } else {
          setPros([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResult();
  }, [location, proType]);

  return (
    <>
      <section className='bg-indigo-900 py-4'>
        <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
          <SearchForm />
        </div>
      </section>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <section className='px-4 py-10'>
          <div className='md:container m-auto md:px-4 py-6 grid lg:grid-cols-4'>
            <Link
              href='/professionals'
              className='flex items-center text-indigo-500 hover:underline mb-3'
            >
              <FaArrowAltCircleLeft className='mr-2' /> Back to pros
            </Link>
            <h1 className='2xl mb-4'>Search Result</h1>
            {pros.length === 0 ? (
              <p>No search result found</p>
            ) : (
              <>
                <div className='hidden lg:block'>Filter</div>
                <div className='grid grid-cols-1 md:grid-cols-1 lg:col-span-3 gap-6'>
                  {pros.map((pros) => (
                    <ProfessionalCard key={pros._id} pros={pros} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default SearchResultPage;
