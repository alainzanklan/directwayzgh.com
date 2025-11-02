'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Briefcase, MapPin, DollarSign, User, Mail, Phone, Upload, X } from 'lucide-react';

const AddProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isLoading, setIsLoading] = useState(false);
  const [checkingProfile, setCheckingProfile] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);
  const [fields, setFields] = useState({
    types: [], // Changed to array for multiple selections
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
    logo: null,
  });

  const [logoPreview, setLogoPreview] = useState(null);

  // Check if user already has a professional profile
  useEffect(() => {
    const checkExistingProfile = async () => {
      if (!userId) return;

      try {
        const res = await fetch(`/api/professionals/user/${userId}`);
        
        if (res.status === 200) {
          const data = await res.json();
          if (data && data._id) {
            setHasProfile(true);
            toast.info('You already have a professional profile');
            setTimeout(() => {
              router.push('/profile');
            }, 2000);
          }
        }
      } catch (error) {
        console.log('No existing profile found');
      } finally {
        setCheckingProfile(false);
      }
    };

    checkExistingProfile();
  }, [userId, router]);

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

  const handleServiceTypeToggle = (type) => {
    setFields((prev) => {
      const currentTypes = prev.types || []; // Safety check
      const isSelected = currentTypes.includes(type);
      if (isSelected) {
        return { ...prev, types: currentTypes.filter((t) => t !== type) };
      } else {
        return { ...prev, types: [...currentTypes, type] };
      }
    });
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
    const file = e.target.files[0];
    if (file) {
      setFields((prev) => ({ ...prev, logo: file }));
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const removeLogo = () => {
    setFields((prev) => ({ ...prev, logo: null }));
    setLogoPreview(null);
  };

  const serviceTypes = [
    'Animation',
    'Appliance Repair',
    'Carpenters',
    'Catering',
    'Cleaning',
    'Coaching',
    'Computing & IT',
    'Data Entry',
    'Decorators',
    'Editing',
    'Electrician',
    'Fitness',
    'Graphic/Web Design',
    'Health, Beauty & Fashion',
    'Installation',
    'Landscaping',
    'Lawn Care',
    'Logo Design',
    'Makeup Artist',
    'Mechanic',
    'Painting',
    'Personal Training',
    'Photography & Videography',
    'Plumbers',
    'Renovation',
    'Repair',
    'Roofing & Flooring',
    'Software Engineering',
    'Tech Support',
    'Transcription',
    'Translation',
    'Tutoring',
    'Wellness',
    'Writing',
    'Other'
  ];

  const paymentMethods = [
    { id: 'cash', value: 'Cash', label: 'Cash' },
    { id: 'momo', value: 'Mobile Money', label: 'Mobile Money' },
    { id: 'cheque', value: 'Cheque', label: 'Cheque' },
    { id: 'bank', value: 'BankTransfer', label: 'Bank Transfer' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate at least one service type selected
    if (fields.types.length === 0) {
      toast.error('Please select at least one service category');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();

    // Prepare profile data
    const profileData = {
      types: fields.types,
      introduction: fields.introduction,
      location: fields.location,
      employees: fields.employees,
      year_in_business: fields.year_in_business,
      price: fields.price,
      payment: fields.payment,
      company_info: fields.company_info,
      owner: userId,
    };

    formData.append('profileData', JSON.stringify(profileData));

    // Append logo if exists
    if (fields.logo) {
      formData.append('logo', fields.logo);
    }

    try {
      const response = await fetch('/api/professionals', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success('Professional profile created successfully!');
        
        // Reset form - ensure all nested objects are properly initialized
        setFields({
          types: [],
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
          logo: null,
        });
        setLogoPreview(null);

        // Redirect to profile page
        setTimeout(() => {
          router.push(`/professionals/${result.professionalId}`);
        }, 2000);
      } else {
        toast.error(`Error: ${result.error || 'Failed to create profile'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {checkingProfile ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Checking existing profile...</p>
            </div>
          </div>
        ) : hasProfile ? (
          <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100 p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6">
              <Briefcase className="text-yellow-600" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Profile Already Exists</h2>
            <p className="text-gray-600 mb-6">You already have a professional profile. Redirecting to your profile page...</p>
          </div>
        ) : (
          <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
              <Briefcase className="text-indigo-600" size={28} />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Join as a Professional</h1>
            <p className="text-indigo-100 text-lg">Showcase your expertise and connect with clients</p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-10 space-y-10">
            
            {/* Service Types - Multi-select */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                <Briefcase size={18} className="text-indigo-600" />
                Service Categories
              </label>
              <p className="text-sm text-gray-600 mb-4">Select all services you offer to help clients find you</p>
              
              {/* Selected Services Display */}
              {fields.types && fields.types.length > 0 && (
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-indigo-900">
                      Selected Services ({fields.types.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => setFields(prev => ({ ...prev, types: [] }))}
                      className="text-xs text-red-600 hover:text-red-700 font-medium"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {fields.types.map((type) => (
                      <span
                        key={type}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-indigo-300 text-indigo-700 rounded-lg text-sm font-medium shadow-sm"
                      >
                        {type}
                        <button
                          type="button"
                          onClick={() => handleServiceTypeToggle(type)}
                          className="hover:bg-indigo-100 rounded-full p-0.5 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Service Selection Grid */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {serviceTypes.map((type) => {
                    const isSelected = (fields.types || []).includes(type);
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleServiceTypeToggle(type)}
                        className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isSelected
                            ? 'bg-indigo-600 text-white shadow-lg scale-[1.02] ring-2 ring-indigo-300'
                            : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow-md border border-gray-200'
                        }`}
                      >
                        <span className="flex items-center justify-center gap-1.5">
                          {isSelected && (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                          {type}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {fields.types && fields.types.length === 0 && (
                <p className="mt-3 text-sm text-amber-600 font-medium flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Please select at least one service category
                </p>
              )}
            </div>

            {/* Introduction */}
            <div>
              <label htmlFor="introduction" className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
                <User size={18} className="text-indigo-600" />
                Professional Introduction
              </label>
              <textarea
                id="introduction"
                name="introduction"
                rows={5}
                placeholder="Tell clients about your expertise, experience, and what makes you stand out..."
                value={fields.introduction}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
              />
            </div>

            {/* Location */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-5">
                <MapPin size={20} className="text-indigo-600" />
                Service Location
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <input
                    type="text"
                    name="location.street"
                    placeholder="Street Address (Optional)"
                    value={fields.location?.street || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
                  />
                </div>
                <input
                  type="text"
                  name="location.city"
                  placeholder="City *"
                  required
                  value={fields.location?.city || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
                />
                <input
                  type="text"
                  name="location.state"
                  placeholder="Region *"
                  required
                  value={fields.location?.state || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
                />
              </div>
            </div>

            {/* Business Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="employees" className="block text-sm font-semibold text-gray-900 mb-3">
                  Team Size
                </label>
                <input
                  type="number"
                  id="employees"
                  name="employees"
                  min="1"
                  required
                  value={fields.employees}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>
              <div>
                <label htmlFor="year_in_business" className="block text-sm font-semibold text-gray-900 mb-3">
                  Years of Experience
                </label>
                <input
                  type="number"
                  id="year_in_business"
                  name="year_in_business"
                  min="0"
                  required
                  value={fields.year_in_business}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            {/* Pricing and Payment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="price" className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
                  <DollarSign size={18} className="text-indigo-600" />
                  Starting Price (GH₵)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={fields.price}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Payment Methods Accepted
                </label>
                <div className="space-y-3">
                  {paymentMethods.map(method => (
                    <label key={method.id} className="flex items-center group cursor-pointer">
                      <input
                        type="checkbox"
                        value={method.value}
                        checked={fields.payment.includes(method.value)}
                        onChange={handlePaymentChange}
                        className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 font-medium">
                        {method.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Company Information */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-5">Company Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <User size={16} />
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company_info.name"
                    placeholder="Your Company Name"
                    value={fields.company_info?.name || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Mail size={16} />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="company_info.email"
                    placeholder="company@example.com"
                    required
                    value={fields.company_info?.email || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Phone size={16} />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="company_info.phone"
                    placeholder="+233 XX XXX XXXX"
                    value={fields.company_info?.phone || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Logo Upload */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
                <Upload size={18} className="text-indigo-600" />
                Company Logo
              </label>
              
              {!logoPreview ? (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-indigo-300 rounded-2xl cursor-pointer bg-indigo-50 hover:bg-indigo-100 transition-all">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 text-indigo-400 mb-3" />
                    <p className="mb-2 text-sm text-gray-700 font-medium">
                      Click to upload logo
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="relative w-full h-48 border-2 border-indigo-300 rounded-2xl overflow-hidden">
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="w-full h-full object-contain bg-gray-50"
                  />
                  <button
                    type="button"
                    onClick={removeLogo}
                    className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-300 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating Profile...' : 'Create Professional Profile'}
              </button>
            </div>
          </form>
        </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddProfile;