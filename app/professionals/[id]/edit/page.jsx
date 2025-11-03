import ProEditForm from '@/components/ProEditForm';

const ProEditPage = () => {
  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-2 py-6 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <ProEditForm />
        </div>
      </div>
    </section>
  );
};

export default ProEditPage;
