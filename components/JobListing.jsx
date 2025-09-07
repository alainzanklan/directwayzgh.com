'use client';

import { useState } from 'react';
import { MapPin, Banknote, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const JobListing = ({ job }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  let description = job.description;

  if (!showFullDescription) {
    description = description?.substring(0, 90) + '...'; 
  }

const formatRelativeDate = (createdAt) => {
  const now = new Date();
  const postDate = new Date(createdAt);
  const diffInMs = now - postDate;
  
  // Convert milliseconds to different time units
  const msInMinute = 60 * 1000;
  const msInHour = 60 * msInMinute;
  const msInDay = 24 * msInHour;
  const msInWeek = 7 * msInDay;
  const msInMonth = 30 * msInDay; // Approximate
  const msInYear = 365 * msInDay; // Approximate
  
  // Calculate time differences
  const diffInMinutes = Math.floor(diffInMs / msInMinute);
  const diffInHours = Math.floor(diffInMs / msInHour);
  const diffInDays = Math.floor(diffInMs / msInDay);
  const diffInWeeks = Math.floor(diffInMs / msInWeek);
  const diffInMonths = Math.floor(diffInMs / msInMonth);
  const diffInYears = Math.floor(diffInMs / msInYear);
  
  // Return appropriate format based on time elapsed
  if (diffInMinutes < 1) {
    return 'Just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
  } else if (diffInDays < 30) {
    return `${diffInWeeks} week${diffInWeeks === 1 ? '' : 's'} ago`;
  } else if (diffInDays < 365) {
    return `${diffInMonths} month${diffInMonths === 1 ? '' : 's'} ago`;
  } else {
    return `${diffInYears} year${diffInYears === 1 ? '' : 's'} ago`;
  }
};

 
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 group">
      <div className="p-6">
        {/* Header Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {job.type}
            </span>
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="w-3 h-3 mr-1" />
              <span>{formatRelativeDate(job.createdAt)}</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {job.title}
          </h3>
        </div>

        {/* Description Section */}
        <div className="mb-4">
          <p className="text-gray-600 text-sm leading-relaxed">
            {description}
          </p>
          {job.description && job.description.length > 90 && (
            <button
              onClick={() => setShowFullDescription((prevState) => !prevState)}
              className="text-blue-600 text-sm font-medium hover:text-blue-700 mt-2 transition-colors"
            >
              {showFullDescription ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        {/* Price Section */}
        <div className="mb-4">
          <div className="flex items-center text-green-600 font-semibold">
            <Banknote className="w-4 h-4 mr-1" />
            <span>{job.price}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-4"></div>

        {/* Footer Section */}
        <div className="flex items-center justify-between">
          {/* Location */}
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            <span className="truncate">{job.location.length < 9 ? job.location : job.location.substring(0,9) + '...'}</span>
          </div>

          {/* Action Button */}
          <Link
            href={`/leads/${job._id}`}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors group/btn"
          >
            View Details
            <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobListing;