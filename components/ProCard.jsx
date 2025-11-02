'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { FaArrowLeft, FaCalendarAlt, FaCheck, FaPhoneAlt } from 'react-icons/fa';
import { MdOutlineLocationOn, MdOutlineStarPurple500 } from 'react-icons/md';
import { TbUserCheck } from 'react-icons/tb';
import { HiOutlineUsers, HiOutlineShieldCheck } from 'react-icons/hi';
import { WiTime9 } from 'react-icons/wi';
import Link from 'next/link';
import ShareButtons from './ShareButtons'; 
import BookingCalendar from './BookingCalendar';
import ProContactForm from './ProContactForm';

const ProCard = ({ pro }) => {
    const [activeTab, setActiveTab] = useState('contact'); 
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Navigation */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <Link
          href="/professionals"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Back to Professionals
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Header Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image
                    src={pro.logo[0]}
                    alt={pro.company_info.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                
                {/* Info */}
                <div className="flex-1">
                  <p className="text-gray-500 text-sm mb-1">{pro.type}</p>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">
                      {pro.company_info.name}
                    </h1>
                    {pro.licensed && (
                      <HiOutlineShieldCheck className="w-6 h-6 text-blue-500" />
                    )}
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <span className="text-green-600 font-semibold">Exceptional 5.0</span>
                    <MdOutlineStarPurple500 className="w-4 h-4 text-yellow-500" />
                    <span className="text-gray-500">(10)</span>
                  </div>
                  
                  {/* Badges and Price */}
                  <div className="flex flex-wrap items-center gap-3">
                    {pro.licensed && (
                      <span className="bg-indigo-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        Licensed Pro
                      </span>
                    )}
                    <p className="text-gray-600">
                      <span className="font-bold text-gray-900">{pro.price}₵</span> starting price
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Introduction */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-600 leading-relaxed">{pro.introduction}</p>
            </div>

            {/* Overview & Payment */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Overview */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Overview</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-600">
                      <MdOutlineLocationOn className="w-5 h-5 text-gray-400" />
                      <span>{pro.location.street}, {pro.location.city}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-gray-600">
                      <TbUserCheck className="w-5 h-5 text-gray-400" />
                      <span>Background Checked</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-gray-600">
                      <HiOutlineUsers className="w-5 h-5 text-gray-400" />
                      <span>
                        {pro.employees} {pro.employees === 1 ? 'employee' : 'employees'}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-gray-600">
                      <WiTime9 className="w-5 h-5 text-gray-400" />
                      <span>3 years in business</span>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Accepted Payment
                  </h3>
                  <div className="space-y-2">
                    {pro.payment.map((method, index) => (
                      <div key={index} className="flex items-center gap-3 text-gray-600">
                        <FaCheck className="w-4 h-4 text-green-500" />
                        <span>{method}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <ShareButtons pro={pro} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                 {/* Tab Navigation */}
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab('contact')}
                    className={`flex-1 px-4 py-3 text-sm font-medium text-center transition-colors ${
                      activeTab === 'contact'
                        ? 'text-indigo-600 border-b-2 border-blue-600 bg-blue-50'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <FaPhoneAlt className="inline mr-2" />
                    Contact
                  </button>
                  <button
                    onClick={() => setActiveTab('booking')}
                    className={`flex-1 px-4 py-3 text-sm font-medium text-center transition-colors ${
                      activeTab === 'booking'
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <FaCalendarAlt className="inline mr-2" />
                    Book Now
                  </button>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'contact' && (
                    <>
                      <h3 className="text-xl font-semibold text-gray-900 mb-6">
                        Contact {pro.company_info.name}
                      </h3>
                      <ProContactForm pro={pro} />
                    </>
                  )}
                  
                  {activeTab === 'booking' && (
                    <>
                      <h3 className="text-xl font-semibold text-gray-900 mb-6">
                        Book an Appointment
                      </h3>
                      <BookingCalendar pro={pro} />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProCard;