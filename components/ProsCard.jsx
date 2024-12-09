'use client';
import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineLocationOn } from 'react-icons/md';
import { MdOutlineStarPurple500 } from 'react-icons/md';
import { FaMapMarker } from 'react-icons/fa';

import { useState } from 'react';

const ProfessionalCard = ({ pros }) => {
  const [showFullIntroduction, setShowFullIntroduction] = useState(false);

  let introduction = pros.introduction;

  if (!showFullIntroduction) {
    introduction = introduction.substring(0, 90);
  }
  return (
    // <Link href={`/professionals/${pros._id}`}>
    //   <div className='bg-white relative border py-2 px-4 lg:px-4 shadow-md rounded-md overflow-hidden'>
    //     {/* <div className='text-indigo-500 text-[0.5em] px-2 py-1 bg-indigo-50 uppercase inline-block font-semibold md:px-4 md:py-2 md:text-[.7em]'>
    //       {' '}
    //       {pros.type}
    //     </div> */}

    //     <div className='grid grid-cols-5  md:grid-cols-6'>
    //       <div className='relative h-16 w-16 col-span-1 justify-self-end md:h-20 md:w-20'>
    //         <Image
    //           src={pros.logo[0]}
    //           fill
    //           sizes=''
    //           alt='profile'
    //           className='mt-2 rounded-full absolute top-24 right-8'
    //           priority={true}
    //         />
    //       </div>
    //       <div className=' ml-4 mx-auto py-2 px-4 col-span-4 md:col-span-5'>
    //         <div className=''>
    //           <h3 className='text-[1em] text-slate-700 font-bold mb-2'>
    //             {pros.company_info.name}{' '}
    //           </h3>
    //         </div>
    //         <div className='flex text-[0.8em] md:text-xs items-center mb-2'>
    //           <p className='text-green-500 font-semibold flex flex-row'>
    //             Exceptional 5.0{' '}
    //             <MdOutlineStarPurple500
    //               height={15}
    //               width={15}
    //               className='text-yellow-500'
    //             />
    //             (10){' '}
    //           </p>
    //         </div>
    //         <div className='flex flex-col gap-1'>
    //           <div className='flex text-[0.8em] md:text-[.9em] text-slate-700'>
    //             <MdOutlineLocationOn
    //               height={12}
    //               width={12}
    //               className='mt-1 mr-1'
    //             />{' '}
    //             {pros.location.city}, {pros.location.state}
    //           </div>
    //           <div>
    //             <p className='text-[.8em] md:text-[.9em] text-slate-700'>
    //               <strong>{pros.price}₵</strong> starting price
    //             </p>
    //           </div>
    //         </div>

    //         {/* <div className='lg:mb-5 bg-indigo-50 px-4 py-2 text-indigo-900'>
    //           {introduction}
    //         </div> */}
    //       </div>
    //     </div>
    //     {/* <div className='lg:mb-5 bg-indigo-50 px-4 py-2 text-indigo-900'>
    //       {introduction}
    //     </div> */}
    //   </div>
    // </Link>
    <div className='bg-white border rounded-xl shadow-md relative'>
      <div className='p-4'>
        <div className='mb-6'>
          <div className='text-gray-600 my-2'>{pros.type}</div>
          <h3 className='text-xl text-slate-700 font-bold'>
            {pros.company_info.name}
          </h3>
        </div>
        {/* <div className='absolute top-8 right-8 rounded-full'>
          <Image
            className='h-16 w-16 rounded-full'
            src={pros.logo[0]}
            alt=''
            width={14}
            height={14}
            priority={true}
          />
        </div> */}

        <div className='mb-5 text-slate-700 '>
          {introduction}
          {introduction.length > 90 ? (
            <button
              onClick={() => setShowFullIntroduction((prevState) => !prevState)}
              className='text-indigo-500 mb-5 hover:text-indigo-600'
            >
              {showFullIntroduction ? 'Less' : '...More'}
            </button>
          ) : (
            ''
          )}
        </div>

        <h3 className='text-indigo-500 mb-2'>
          <strong>{pros.price}₵</strong> starting price
        </h3>

        <div className='border border-gray-100 mb-5'></div>

        <div className='flex flex-col lg:flex-row justify-between mb-4'>
          <div className='text-orange-700 mb-3'>
            <FaMapMarker className='inline text-lg mb-1 mr-1' />
            {pros.location.street}, {pros.location.city}
          </div>
          <Link
            href={`/professionals/${pros._id}`}
            className='h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm'
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCard;
