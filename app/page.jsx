'use client'
import Hero from '@/components/Hero';
import HomePros from '@/components/HomePros';
import Infoboxes from '@/components/Infoboxes';

const Homepage = async () => {
  return (
    <>
      <Hero />
      <Infoboxes />
      <HomePros />
    </>
  );
};

export default Homepage;
