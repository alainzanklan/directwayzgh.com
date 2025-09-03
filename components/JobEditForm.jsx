'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams, useRouter } from 'next/navigation';
import { fetchJob } from '@/utils/request';
import { Save, ArrowLeft, Briefcase, MapPin, User, Mail, Phone } from 'lucide-react';

const JobEditForm = () => {
  const { id } = useParams();
  const router = useRouter();

  const [fields, setFields] = useState({
    type: '',
    title: '',
    description: '',
    price: '',
    location: '',
    company: '',
    contactPhone: '',
    contactEmail: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Fetch Job data form
    const fetchJobData = async () => {
      try {
        const jobData = await fetchJob(id);
        setFields(jobData);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load job data');
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData(e.target);

      const res = await fetch(`/api/jobs/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (res.status === 200) {
        toast.success('Job updated successfully');
        router.push(`/jobs/${id}`);
      } else if (res.status === 401 || res.status === 403) {
        toast.error('Permission denied');
      } else {
        toast.error('Something went wrong');
      }

      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Briefcase className="w-8 h-8 mr-3 text-blue-600" />
            Edit Job Listing
          </h1>
          <p className="text-gray-600 mt-2">Update your job listing details below</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Job Details Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
              Job Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Type */}
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  Job Type
                </label>
                <select
                  id="type"
                  name="type"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                  value={fields.type}
                  onChange={handleChange}
                >
                  <option value="Cleaning">Cleaning</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Plumbers">Plumbers</option>
                  <option value="Carpenters">Carpenters</option>
                  <option value="Photography & Videography">Photography & Videography</option>
                  <option value="Health, Beauty & Fashion">Health, Beauty & Fashion</option>
                  <option value="Computing & IT">Computing & IT</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Target Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Target Price
                </label>
                <select
                  id="price"
                  name="price"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                  value={fields.price}
                  onChange={handleChange}
                >
                  <option value="Under 100₵">Under 100₵</option>
                  <option value="100₵ - 250₵">100₵ - 250₵</option>
                  <option value="250₵ - 500₵">250₵ - 500₵</option>
                  <option value="500₵ - 750₵">500₵ - 750₵</option>
                  <option value="750₵ - 1000₵">750₵ - 1000₵</option>
                  <option value="1000₵ - 1500₵">1000₵ - 1500₵</option>
                  <option value="1500₵ - 2000₵">1500₵ - 2000₵</option>
                  <option value="2000₵ - 2500₵">2000₵ - 2500₵</option>
                  <option value="2500₵ - 3000₵">2500₵ - 3000₵</option>
                  <option value="3000₵ - 3500₵">3000₵ - 3500₵</option>
                  <option value="Over 3500₵">Over 3500₵</option>
                </select>
              </div>
            </div>

            {/* Job Title */}
            <div className="mt-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Job Listing Name
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="e.g. Need a carpenter in East Legon"
                required
                value={fields.title}
                onChange={handleChange}
              />
            </div>

            {/* Location */}
            <div className="mt-6">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Your Location"
                required
                value={fields.location}
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div className="mt-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                placeholder="Add any job duties, expectations, requirements, etc"
                value={fields.description}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Your Information
            </h2>

            <div className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Your Name"
                  value={fields.company}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Email */}
                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    Contact Email
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Email address for applicants"
                    required
                    value={fields.contactEmail}
                    onChange={handleChange}
                  />
                </div>

                {/* Contact Phone */}
                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Optional phone for applicants"
                    value={fields.contactPhone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Update Job
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobEditForm;