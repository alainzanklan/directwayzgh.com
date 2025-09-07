'use client';

import { FaPaperPlane, FaPhoneAlt } from 'react-icons/fa';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const ProContactForm = ({ pro }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const { data: session } = useSession();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      ...formData,
      recipient: pro.owner,
      pro: pro._id,
    };

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.status === 200) {
        toast.success('Message sent successfully');
        setWasSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else if (res.status === 400 || res.status === 401) {
        const dataObj = await res.json();
        toast.error(dataObj.message);
      } else {
        toast.error('Error sending message');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error sending message');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneClick = () => {
    setShowPhone(true);
  };

  if (!session) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">
          You must be logged in to contact {pro.company_info.name}
        </p>
        <Link className="text-blue-600 hover:text-blue-800 font-medium" href="/login">
          Sign in to continue
        </Link>
      </div>
    );
  }

  if (wasSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaPaperPlane className="w-6 h-6 text-green-600" />
        </div>
        <p className="text-green-600 font-medium mb-4">
          Message sent successfully!
        </p>
        <button 
          onClick={() => setWasSubmitted(false)}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Describe your project or ask a question..."
            required
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <FaPaperPlane className="w-4 h-4" />
              Send Message
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">or</span>
        </div>
      </div>

      {/* Phone Button */}
      {showPhone ? (
        <a
          href={`tel:${pro.company_info.phone}`}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 no-underline"
        >
          <FaPhoneAlt className="w-4 h-4" />
          Call {pro.company_info.phone}
        </a>
      ) : (
        <button
          type="button"
          onClick={handlePhoneClick}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <FaPhoneAlt className="w-4 h-4" />
          Show Phone Number
        </button>
      )}
    </div>
  );
};

export default ProContactForm;