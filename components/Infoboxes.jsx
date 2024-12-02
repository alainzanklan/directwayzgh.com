import Infobox from './Infobox';

const Infoboxes = () => {
  return (
    <>
      <section className='py-4'>
        <div className='container-xl lg:container m-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
            <Infobox
              heading='For Professionals'
              backgroundColor='bg-gray-100'
              buttonInfo={{
                text: 'Become a Pro',
                link: '/register-pro',
                backgroundColor: 'bg-black',
              }}
            >
              {' '}
              Browse our jobs, showcase your skills and boost your career today{' '}
            </Infobox>

            <Infobox
              heading='For Employers'
              backgroundColor='bg-indigo-100'
              buttonInfo={{
                text: 'Hire a Pro',
                link: '/professionals',
                backgroundColor: 'bg-indigo-600',
              }}
            >
              List your project, fixe your price and find the perfect pro for
              the role
            </Infobox>
          </div>
        </div>
      </section>
    </>
  );
};

export default Infoboxes;
