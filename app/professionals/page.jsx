import ProfessionalCard from '@/components/ProsCard';
import { fetchPros } from '@/utils/request';

const prosPage = async () => {
  const pros = await fetchPros();

  // sort pros by date

  pros.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return (
    <section className='px-4 py-10'>
      <div className='md:container m-auto md:px-4 py-6 grid lg:grid-cols-4'>
        {pros.length === 0 ? (
          <p>No professionals found</p>
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
  );
};

export default prosPage;
