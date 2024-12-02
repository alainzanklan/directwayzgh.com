'use client';
import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineLocationOn } from 'react-icons/md';
import { MdOutlineStarPurple500 } from 'react-icons/md';

import { useState } from 'react';

const ProfessionalCard = ({ pros }) => {
  const [showFullIntroduction, setShowFullIntroduction] = useState(false);

  let introduction = pros.introduction;

  if (!showFullIntroduction) {
    introduction = introduction.substring(0, 60) + '...';
  }
  return (
    <Link href={`/professionals/${pros._id}`}>
      <div className='bg-white relative border p-4 lg:px-4 shadow-md rounded-md'>
        <div className='grid grid-cols-5 md:grid-cols-6 gap-x-16'>
          <div className='relative w-24 h-24 col-span-1 justify-end'>
            <Image
              src={pros.logo[0]}
              fill
              alt='profile'
              className='mt-6 rounded-full'
              sizes='24'
              priority={true}
            />
          </div>
          <div className='ml-4 p-4 col-span-4 md:grid-cols-5'>
            <div className='text-gray-600 my-2 text-xs'> {pros.type}</div>
            <div className='mb-2'>
              <h3 className='text-xl font-bold'>{pros.company_info.name} </h3>
            </div>
            <div className='mb-2 flex text-[0.8em] md:text-xs items-center'>
              <p className='text-green-500 font-semibold flex flex-row'>
                Exceptional 5.0{' '}
                <MdOutlineStarPurple500
                  height={15}
                  width={15}
                  className='text-yellow-500'
                />
                (10){' '}
              </p>
            </div>
            <div className='flex mb-2 gap-4'>
              <div className='flex text-[0.8em] md:text-[.9em]'>
                <MdOutlineLocationOn
                  height={12}
                  width={12}
                  className='mt-1 mr-1'
                />{' '}
                {pros.location.city}
              </div>
              <div>
                <p className='text-[.8em] md:text-[.9em]'>
                  {pros.price}₵ starting price
                </p>
              </div>
            </div>

            {/* <div className='lg:mb-5 bg-indigo-50 px-4 py-2 text-indigo-900'>
              {introduction}
            </div> */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProfessionalCard;
