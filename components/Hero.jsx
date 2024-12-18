import SearchForm from './SearchForm';

const Hero = () => {
  return (
    <>
      {/* <!-- Hero --> */}
      <section className='bg-indigo-900 py-20 mb-4'>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col`}>
          <div className='text-center'>
            <h1 className='text-5xl font-extrabold text-white md:text-6xl '>
              Hire The Perfect Pro
            </h1>
            <p className='my-4 text-xl text-white'>
              Find the right professional to meet your needs
            </p>
            <SearchForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
