import SearchForm from './SearchForm';

const Hero = () => {
  return (
    <section className={`bg-gray-900 py-24 bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-blend-overlay`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white md:text-6xl mb-6">
            Hire The Perfect Pro
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Find the right professional to meet your needs
          </p>
          <SearchForm />
        </div>
      </div>
    </section>
  );
};

export default Hero;