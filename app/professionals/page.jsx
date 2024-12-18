import ProfessionalCard from '@/components/ProsCard';
import { fetchPros } from '@/utils/request';
import SearchForm from '@/components/SearchForm';

const prosPage = async () => {
  const pros = await fetchPros();

  // sort pros by date

  pros.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      <section className='bg-indigo-900 py-4'>
        <div className=' max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
          <SearchForm />
        </div>
      </section>

      <section className='px-2 py-1'>
        <div className='py-6 mb-4'>
          <h2 className='text-3xl font-bold  text-center text-indigo-500'>
            Recent Professionals
          </h2>
        </div>
        <div className='md:container m-auto md:px-4'>
          {pros.length === 0 ? (
            <p>No professionals found</p>
          ) : (
            <>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {pros.map((pros) => (
                  <ProfessionalCard key={pros._id} pros={pros} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default prosPage;
