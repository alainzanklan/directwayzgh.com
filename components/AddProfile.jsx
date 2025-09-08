'use client';

import { useState } from 'react';

const AddProfile = () => {
  const [fields, setFields] = useState({
    type: '',
    introduction: '',
    location: {
      street: '',
      city: '',
      state: '',
      zipcode: '',
    },
    employees: '',
    year_in_business: '',
    price: '',
    payment: [],
    company_info: {
      name: '',
      email: '',
      phone: '',
    },
    logo: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [outerKey, innerKey] = name.split('.');
      setFields((prevFields) => ({
        ...prevFields,
        [outerKey]: { ...prevFields[outerKey], [innerKey]: value },
      }));
    } else {
      setFields((prevFields) => ({ ...prevFields, [name]: value }));
    }
  };

  const handlePaymentChange = (e) => {
    const { value, checked } = e.target;
    const updatedPayment = [...fields.payment];

    if (checked) {
      updatedPayment.push(value);
    } else {
      const index = updatedPayment.indexOf(value);
      if (index !== -1) {
        updatedPayment.splice(index, 1);
      }
    }

    setFields((prevFields) => ({
      ...prevFields,
      payment: updatedPayment,
    }));
  };

  const handleImageChange = (e) => {
    const { files } = e.target;
    const updatedImages = [...fields.logo];
    for (const file of files) {
      updatedImages.push(file);
    }
    setFields((prev) => ({ ...prev, logo: updatedImages }));
  };

  const serviceTypes = [
    'Cleaning Service',
    'Electrician',
    'Plumbers',
    'Carpenters',
    'Photography & Videography',
    'Health, Beauty & Fashion',
    'Computing & IT',
    'Other'
  ];

  const paymentMethods = [
    { id: 'cash', value: 'Cash', label: 'Cash' },
    { id: 'momo', value: 'Mobile Money', label: 'Mobile Money' },
    { id: 'cheque', value: 'Cheque', label: 'Cheque' },
    { id: 'bank', value: 'BankTransfer', label: 'Bank Transfer' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your form submission logic here
    console.log('Form data:', fields);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Add Your Service</h1>
              <p className="mt-2 text-gray-600">Share your expertise with clients who need your skills</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Service Type */}
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-900 mb-2">
                  Service Type
                </label>
                <select
                  id="type"
                  name="type"
                  required
                  value={fields.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Select a service type</option>
                  {serviceTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Introduction */}
              <div>
                <label htmlFor="introduction" className="block text-sm font-medium text-gray-900 mb-2">
                  Introduction
                </label>
                <textarea
                  id="introduction"
                  name="introduction"
                  rows={4}
                  placeholder="Tell clients about your expertise and what makes you unique..."
                  value={fields.introduction}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              {/* Location */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      name="location.street"
                      placeholder="Street Address (Optional)"
                      value={fields.location.street}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <input
                    type="text"
                    name="location.city"
                    placeholder="City"
                    required
                    value={fields.location.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  <input
                    type="text"
                    name="location.state"
                    placeholder="Region"
                    required
                    value={fields.location.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  <input
                    type="text"
                    name="location.zipcode"
                    placeholder="Postal Code (Optional)"
                    value={fields.location.zipcode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Business Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="employees" className="block text-sm font-medium text-gray-900 mb-2">
                    Number of Employees
                  </label>
                  <input
                    type="number"
                    id="employees"
                    name="employees"
                    min="1"
                    required
                    value={fields.employees}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="year_in_business" className="block text-sm font-medium text-gray-900 mb-2">
                    Years in Business
                  </label>
                  <input
                    type="number"
                    id="year_in_business"
                    name="year_in_business"
                    min="0"
                    required
                    value={fields.year_in_business}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Pricing and Payment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-900 mb-2">
                    Starting Price (GH₵)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    min="0"
                    step="0.01"
                    value={fields.price}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    Accepted Payment Methods
                  </label>
                  <div className="space-y-3">
                    {paymentMethods.map(method => (
                      <label key={method.id} className="flex items-center">
                        <input
                          type="checkbox"
                          value={method.value}
                          checked={fields.payment.includes(method.value)}
                          onChange={handlePaymentChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">{method.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Company Information</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="company_info.name"
                    placeholder="Company Name"
                    value={fields.company_info.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  <input
                    type="email"
                    name="company_info.email"
                    placeholder="Company Email"
                    required
                    value={fields.company_info.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  <input
                    type="tel"
                    name="company_info.phone"
                    placeholder="Company Phone"
                    value={fields.company_info.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Logo Upload */}
              <div>
                <label htmlFor="logo" className="block text-sm font-medium text-gray-900 mb-2">
                  Company Logo
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    id="logo"
                    name="logo"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="mt-2 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Add Your Service
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProfile;