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
    introduction = introduction.substring(0, 60);
  }
  return (
    <div className='bg-white relative border-b py- lg:px-4 '>
      <div className='grid grid-cols-5 lg:grid-cols-6 gap-4 p-10'>
        <div className='relative w-24 h-24 py-4 px-4 col-span-1 justify-self-end'>
          <Image
            src={pros.logo[0]}
            fill
            alt='profile'
            className='mt-6 rounded-full px-2 '
            sizes='24'
            priority={true}
          />
        </div>
        <div className='p-4 col-span-4'>
          <div className='text-gray-600 my-2'> {pros.type}</div>
          <div className='mb-2'>
            <h3 className='text-xl font-bold'>{pros.company_info.name} </h3>
          </div>
          <div className='mb-2 flex items-center'>
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
          <div className='flex mb-2 gap-1'>
            <MdOutlineLocationOn height={18} width={18} className='mt-1' />{' '}
            <span>{pros.location.city}</span>
          </div>

          <div className='lg:mb-5 bg-indigo-50 px-4 py-2 text-indigo-900'>
            {introduction.length < 90 ? (
              introduction
            ) : (
              <div>
                {' '}
                {introduction}
                <button
                  onClick={() =>
                    setShowFullIntroduction((prevState) => !prevState)
                  }
                  className='text-indigo-500 mb-5 hover:text-indigo-600'
                >
                  {showFullIntroduction && !introduction.length < 60 ? (
                    <span> &nbsp; Less</span>
                  ) : (
                    '...More'
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-row col-span-full lg:col-span-1 lg:flex-col justify-between py-6'>
          <div className='flex gap-2 lg:flex-col'>
            <h3 className='text-indigo-600'>₵{pros.price}</h3>
            <p>starting price</p>
          </div>
          <div>
            <Link
              href={`/professionals/${pros._id}`}
              className='h-[36px] bg-indigo-500 hover:bg-indigo-600 text-indigo-50 px-4 py-2 rounded-lg text-center text-sm'
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCard;
