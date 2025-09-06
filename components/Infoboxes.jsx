import Infobox from './Infobox';

const Infoboxes = () => {
  const infoData = [
    {
      heading: 'For Professionals',
      description: 'Browse jobs, showcase your skills and boost your career today',
      backgroundColor: 'bg-gray-50',
      button: {
        text: 'Become a Pro',
        link: '/register-pro',
        backgroundColor: 'bg-gray-900',
      }
    },
    {
      heading: 'For Employers', 
      description: 'List your project, set your price and find the perfect pro',
      backgroundColor: 'bg-blue-50',
      button: {
        text: 'Hire a Pro',
        link: '/professionals',
        backgroundColor: 'bg-blue-600',
      }
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {infoData.map((info, index) => (
            <Infobox
              key={index}
              heading={info.heading}
              backgroundColor={info.backgroundColor}
              buttonInfo={info.button}
            >
              {info.description}
            </Infobox>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Infoboxes;