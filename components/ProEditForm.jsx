'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { 
  ArrowLeft, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  User, 
  Mail, 
  Phone, 
  Upload, 
  X, 
  Trash2,
  Save,
  Loader2,
  Plus
} from 'lucide-react';

// Service types array
const SERVICE_TYPES = [
  'Animation', 'Appliance Repair', 'Carpenters', 'Catering', 'Cleaning', 
  'Coaching', 'Computing & IT', 'Data Entry', 'Decorators', 'Editing',
  'Electrician', 'Fitness', 'Graphic/Web Design', 'Health, Beauty & Fashion',
  'Installation', 'Landscaping', 'Lawn Care', 'Logo Design', 'Makeup Artist',
  'Mechanic', 'Painting', 'Personal Training', 'Photography & Videography',
  'Plumbers', 'Renovation', 'Repair', 'Roofing & Flooring', 'Software Engineering',
  'Tech Support', 'Transcription', 'Translation', 'Tutoring', 'Wellness', 
  'Writing', 'Other'
];

const PAYMENT_METHODS = [
  { id: 'cash', value: 'Cash', label: 'Cash' },
  { id: 'momo', value: 'Mobile Money', label: 'Mobile Money' },
  { id: 'cheque', value: 'Cheque', label: 'Cheque' },
  { id: 'bank', value: 'BankTransfer', label: 'Bank Transfer' }
];

// Simple Service Dropdown Selector
const ServiceDropdownSelector = ({ selectedTypes, onAdd, onRemove }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleAdd = () => {
    if (selectedValue && !selectedTypes.includes(selectedValue)) {
      onAdd(selectedValue);
      setSelectedValue('');
    }
  };

  const availableTypes = SERVICE_TYPES.filter(type => !selectedTypes.includes(type));

  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
        <Briefcase className="w-4 h-4 text-blue-600" />
        Service Categories *
      </label>
      
      {/* Add new service */}
      <div className="flex gap-2 mb-4">
        <select
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select a service to add...</option>
          {availableTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleAdd}
          disabled={!selectedValue}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      {/* Selected services */}
      {selectedTypes.length > 0 ? (
        <div>
          <p className="text-sm text-gray-600 mb-3">Selected services ({selectedTypes.length}):</p>
          <div className="space-y-2">
            {selectedTypes.map(type => (
              <div key={type} className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="text-sm font-medium text-blue-900">{type}</span>
                <button
                  type="button"
                  onClick={() => onRemove(type)}
                  className="text-red-600 hover:text-red-700 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          Please select at least one service category
        </p>
      )}
    </div>
  );
};

// Logo Upload Component
const LogoUpload = ({ preview, onFileChange, onRemove }) => {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
        <Upload className="w-4 h-4 text-blue-600" />
        Company Logo
      </label>
      
      {preview && (
        <div className="mb-4">
          <img
            src={preview}
            alt="Logo preview"
            className="w-full h-32 object-contain bg-gray-50 border border-gray-200 rounded-lg"
          />
        </div>
      )}

      <div className="space-y-3">
        <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex items-center gap-2 text-gray-600">
            <Upload className="w-5 h-5" />
            <span className="text-sm">{preview ? 'Change Logo' : 'Upload Logo'}</span>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="hidden"
          />
        </label>

        {preview && onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="w-full flex items-center justify-center gap-2 py-2 text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100"
          >
            <X className="w-4 h-4" />
            Remove Logo
          </button>
        )}
      </div>
    </div>
  );
};

// Input Field Component
const InputField = ({ label, icon: Icon, error, children, ...props }) => {
  return (
    <div>
      {label && (
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          {Icon && <Icon className="w-4 h-4 text-blue-600" />}
          {label}
        </label>
      )}
      {children || (
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          {...props}
        />
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

// Main Component
const EditProfile = () => {
  const router = useRouter();
  const { id } = useParams();
  const { data: session } = useSession();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const [formData, setFormData] = useState({
    types: [],
    introduction: '',
    location: { street: '', city: '', state: '', zipcode: '' },
    employees: '',
    year_in_business: '',
    price: '',
    payment: [],
    company_info: { name: '', email: '', phone: '' }
  });

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/professionals/${id}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({
            types: data.types || [],
            introduction: data.introduction || '',
            location: data.location || { street: '', city: '', state: '', zipcode: '' },
            employees: data.employees || '',
            year_in_business: data.year_in_business || '',
            price: data.price || '',
            payment: data.payment || [],
            company_info: data.company_info || { name: '', email: '', phone: '' }
          });
          
          if (data.logo) {
            setLogoPreview(data.logo);
          }
        } else {
          toast.error('Profile not found');
          router.push('/profile');
        }
      } catch (error) {
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProfile();
  }, [id, router]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle service addition
  const handleServiceAdd = (type) => {
    setFormData(prev => ({
      ...prev,
      types: [...prev.types, type]
    }));
  };

  // Handle service removal
  const handleServiceRemove = (type) => {
    setFormData(prev => ({
      ...prev,
      types: prev.types.filter(t => t !== type)
    }));
  };

  // Handle payment method change
  const handlePaymentChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      payment: checked
        ? [...prev.payment, value]
        : prev.payment.filter(p => p !== value)
    }));
  };

  // Handle logo upload
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Logo must be less than 5MB');
        return;
      }
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  // Remove logo
  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.types.length === 0) {
      toast.error('Please select at least one service category');
      return;
    }

    setSaving(true);

    try {
      const submitData = new FormData();
      submitData.append('profileData', JSON.stringify(formData));
      
      if (logoFile) {
        submitData.append('logo', logoFile);
      }

      const response = await fetch(`/api/professionals/${id}`, {
        method: 'PUT',
        body: submitData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success('Profile updated successfully!');
        setTimeout(() => router.push('/profile'), 1500);
      } else {
        toast.error(result.error || 'Failed to update profile');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Handle profile deletion
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete your professional profile? This cannot be undone.')) {
      return;
    }

    try {
      const res = await fetch(`/api/professionals/${id}`, { method: 'DELETE' });
      
      if (res.ok) {
        toast.success('Profile deleted successfully');
        setTimeout(() => router.push('/profile'), 1500);
      } else {
        toast.error('Failed to delete profile');
      }
    } catch (error) {
      toast.error('Failed to delete profile');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Edit Professional Profile</h1>
          <p className="text-gray-600 mt-1">Update your professional information</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 sm:p-6 space-y-6">
            
            {/* Service Types */}
            <ServiceDropdownSelector
              selectedTypes={formData.types}
              onAdd={handleServiceAdd}
              onRemove={handleServiceRemove}
            />

            {/* Introduction */}
            <InputField label="Professional Introduction" icon={User}>
              <textarea
                name="introduction"
                rows={4}
                placeholder="Tell clients about your expertise and experience..."
                value={formData.introduction}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </InputField>

            {/* Location */}
            <div>
              <h3 className="flex items-center gap-2 text-lg font-medium text-gray-900 mb-4">
                <MapPin className="w-5 h-5 text-blue-600" />
                Service Location
              </h3>
              <div className="space-y-4">
                <InputField
                  placeholder="Street Address (Optional)"
                  name="location.street"
                  value={formData.location.street}
                  onChange={handleChange}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    placeholder="City *"
                    name="location.city"
                    value={formData.location.city}
                    onChange={handleChange}
                    required
                  />
                  <InputField
                    placeholder="Region *"
                    name="location.state"
                    value={formData.location.state}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Business Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Team Size"
                type="number"
                name="employees"
                min="1"
                value={formData.employees}
                onChange={handleChange}
                required
              />
              <InputField
                label="Years of Experience"
                type="number"
                name="year_in_business"
                min="0"
                value={formData.year_in_business}
                onChange={handleChange}
                required
              />
            </div>

            {/* Pricing */}
            <InputField
              label="Starting Price (GH₵)"
              icon={DollarSign}
              type="number"
              name="price"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={formData.price}
              onChange={handleChange}
            />
            
            {/* Payment Methods */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Payment Methods Accepted
              </label>
              <div className="grid grid-cols-2 gap-3">
                {PAYMENT_METHODS.map(method => (
                  <label key={method.id} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <input
                      type="checkbox"
                      value={method.value}
                      checked={formData.payment.includes(method.value)}
                      onChange={handlePaymentChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{method.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Company Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Company Details</h3>
              <div className="space-y-4">
                <InputField
                  label="Company Name"
                  icon={User}
                  name="company_info.name"
                  placeholder="Your Company Name"
                  value={formData.company_info.name}
                  onChange={handleChange}
                />
                <InputField
                  label="Email Address *"
                  icon={Mail}
                  type="email"
                  name="company_info.email"
                  placeholder="company@example.com"
                  value={formData.company_info.email}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Phone Number"
                  icon={Phone}
                  type="tel"
                  name="company_info.phone"
                  placeholder="+233 XX XXX XXXX"
                  value={formData.company_info.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Logo Upload */}
            <LogoUpload
              preview={logoPreview}
              onFileChange={handleLogoChange}
              onRemove={removeLogo}
            />
          </div>

          {/* Action Buttons */}
          <div className="border-t border-gray-200 p-4 sm:p-6">
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Update Profile
                    </>
                  )}
                </button>
              </div>
              
              {/* Delete Button */}
              <button
                type="button"
                onClick={handleDelete}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete Profile
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;