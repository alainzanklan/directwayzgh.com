'use client';

import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Briefcase, MapPin, DollarSign, User, Mail, Phone, FileText } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';



// Move FormField component outside to prevent re-creation
const FormField = ({ icon: Icon, label, children, required = false }) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
      <Icon size={16} className="text-gray-500" />
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

// Move static data outside component
const jobTypes = [
 'Animation', 'Appliance Repair', 'Carpenters', 'Catering', 'Cleaning', 'Coaching', 'Computing & IT', 'Data Entry', 'Decorators', 'Editing', 'Electrician', 'Fitness', 'Graphic/Web Design', 'Health, Beauty & Fashion', 'Installation', 'Landscaping', 'Lawn Care', 'Logo Design', 'Makeup Artist', 'Mechanic', 'Other', 'Painting', 'Personal Training', 'Photography & Videography', 'Plumbers', 'Renovation', 'Repair', 'Roofing & Flooring', 'Software Engineering', 'Tech Support', 'Transcription', 'Translation', 'Tutoring', 'Wellness', 'Writing'

];

const priceRanges = [
  'Under 100₵', '100₵ - 250₵', '250₵ - 500₵', '500₵ - 750₵', '750₵ - 1000₵',
  '1000₵ - 1500₵', '1500₵ - 2000₵', '2000₵ - 2500₵', '2500₵ - 3000₵',
  '3000₵ - 3500₵', 'Over 3500₵'
];

const JobsAddPage = () => {
const {data: session} = useSession()
const userId = session?.user?.id
const router = useRouter()

const [isLoading,setIsLoading] = useState(false)

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


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  const handleSubmit = async (e) => {

      e.preventDefault();
      setIsLoading(true)

    const formData = new FormData()

    formData.append('jobData', JSON.stringify({
      type: fields.type,
      title: fields.title,
      description: fields.description,
      price: fields.price,
      location: fields.location,
      company: fields.company,
      contactEmail: fields.contactEmail,
      contactPhone: fields.contactPhone,
      owner: userId}));
   
    try {
    const response = await fetch('/api/jobs', {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header - let browser set it with boundary
    });

    const result = await response.json();
    
    if (response.ok && result.success) {
      console.log('Job added successfully:', result);
      
      // Show success message
      toast.success('Job posted successfully! A confirmation email has been sent.');
      
      // Reset the form
      setFields({
        type: '',
        title: '',
        description: '',
        price: '',
        location: '',
        company: '',
        contactPhone: '',
        contactEmail: '',
      });
      
      // Redirect to the job page after a short delay
      setTimeout(() => {
        router.push(`/jobs/${result.jobId}`);
      }, 2000)
        
      } else {
      console.error('Error:', result.error);
      alert(`Error: ${result.error}`);
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Network error. Please try again.');
     }

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
            <Briefcase className="text-white" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a Job</h1>
          <p className="text-gray-600">Find the perfect professional for your project</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 space-y-8">
            
            {/* Job Details Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 pb-2 border-b border-gray-200">
                Job Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField icon={Briefcase} label="Job Type" required>
                  <select
                    name="type"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    required
                    value={fields.type}
                    onChange={handleChange}
                  >
                    <option value="">Select job type</option>
                    {jobTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </FormField>

                <FormField icon={DollarSign} label="Target Price" required>
                  <select
                    name="price"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    required
                    value={fields.price}
                    onChange={handleChange}
                  >
                    <option value="">Select price range</option>
                    {priceRanges.map((range) => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </FormField>
              </div>

              <FormField icon={FileText} label="Job Title" required>
                <input
                  type="text"
                  name="title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="e.g. Need a carpenter in East Legon"
                  required
                  value={fields.title}
                  onChange={handleChange}
                />
              </FormField>

              <FormField icon={MapPin} label="Location" required>
                <input
                  type="text"
                  name="location"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Your location"
                  required
                  value={fields.location}
                  onChange={handleChange}
                />
              </FormField>

              <FormField icon={FileText} label="Description">
                <textarea
                  name="description"
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                  placeholder="Add job duties, expectations, requirements, etc."
                  value={fields.description}
                  onChange={handleChange}
                />
              </FormField>
            </div>

            {/* Contact Information Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 pb-2 border-b border-gray-200">
                Your Information
              </h2>
              
              <FormField icon={User} label="Your Name">
                <input
                  type="text"
                  name="company"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Your name"
                  value={fields.company}
                  onChange={handleChange}
                />
              </FormField>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField icon={Mail} label="Contact Email" required>
                  <input
                    type="email"
                    name="contactEmail"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="your@email.com"
                    required
                    value={fields.contactEmail}
                    onChange={handleChange}
                  />
                </FormField>

                <FormField icon={Phone} label="Contact Phone">
                  <input
                    type="tel"
                    name="contactPhone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Optional phone number"
                    value={fields.contactPhone}
                    onChange={handleChange}
                  />
                </FormField>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                onClick={handleSubmit}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg"
              >
              {!isLoading ?  'Post Job' : 'Creating...'}
              </button>
              <p className="text-sm text-gray-500 text-center mt-3">
                Your job will be reviewed and published within 24 hours
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">
            Need help? <a href="/contact" className="text-indigo-600 hover:text-indigo-700 font-medium">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobsAddPage;