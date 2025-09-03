'use client';
import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineLocationOn } from 'react-icons/md';
import { useState } from 'react';

const ProfessionalCard = ({ pros }) => {
  const [showFullIntro, setShowFullIntro] = useState(false);
  
  const shouldTruncate = pros.introduction.length > 120;
  const displayIntro = showFullIntro || !shouldTruncate 
    ? pros.introduction 
    : `${pros.introduction.substring(0, 120)}...`;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Header with avatar */}
      <div className="flex items-start justify-between p-6 pb-4">
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-1">{pros.type}</p>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {pros.company_info.name}
          </h3>
        </div>
      
        <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
          <Image
            src={pros.logo[0]}
            alt={pros.company_info.name}
            width={56}
            height={56}
            className="w-full h-full object-cover"
            priority
          />
        </div>
        
      </div>

      {/* Introduction */}
      <div className="px-6 pb-4">
        <p className="text-gray-600 text-sm leading-relaxed">
          {displayIntro}
          {shouldTruncate && (
            <button
              onClick={() => setShowFullIntro(!showFullIntro)}
              className="ml-1 text-indigo-600 hover:text-indigo-800 font-medium"
            >
              {showFullIntro ? 'Show less' : 'Read more'}
            </button>
          )}
        </p>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-lg">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center text-gray-500 text-sm">
              <MdOutlineLocationOn className="w-4 h-4 mr-1" />
              {pros.location.city}, {pros.location.state}
            </div>
            <p className="text-sm">
              <span className="font-semibold text-gray-900">{pros.price}₵</span>
              <span className="text-gray-500"> starting price</span>
            </p>
          </div>
          
          <Link
            href={`/professionals/${pros._id}`}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors duration-200"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCard;