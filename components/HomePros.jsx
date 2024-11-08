import ProfessionalCard from './ProsCard';
import { fetchPros } from '@/utils/request';

const HomeJobs = async () => {
  const pros = await fetchPros();
  const recentPros = pros.sort(() => Math.random() - Math.random()).slice(0, 3);
  return (
    <>
      <section className='px-4 py-10'>
        <h3 className='text-indigo-500 text-center font-bold text-3xl mb-6'>
          Recent Professionals
        </h3>
        <div className='container lg:container m-auto px-4 py-6 grid lg:grid-cols-4'>
          {recentPros.length === 0 ? (
            <p>No professionals found</p>
          ) : (
            <>
              <div className='hidden lg:block'>Filter</div>
              <div className='grid grid-cols-1 md:grid-cols-1 lg:col-span-3 gap-6'>
                {recentPros.map((pros) => (
                  <ProfessionalCard key={pros._id} pros={pros} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      <section className='m-auto max-w-lg my-10 px-6'>
        <a
          href='jobs.html'
          className='block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700'
        >
          View All Jobs
        </a>
      </section>{' '}
    </>
  );
};

export default HomeJobs;