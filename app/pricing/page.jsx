'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, X, ChevronDown, Star } from 'lucide-react';

// Simple pricing data
const PRICING_DATA = {
  clients: [
    {
      name: 'Basic',
      price: 'Free',
      period: '',
      description: 'Perfect for individuals with occasional hiring needs',
      features: [
        'Browse all professionals',
        'Basic search filters',
        'View public profiles',
        'Submit up to 2 projects/month'
      ],
      limitations: [
        'Contact information access'
      ],
      href: '/register',
      buttonText: 'Get Started Free'
    },
    {
      name: 'Premium',
      price: 'GHS 99',
      period: '/month',
      description: 'Ideal for small businesses and frequent hirers',
      features: [
        'Everything in Basic',
        'Advanced search & filters',
        'Contact info access',
        'Unlimited project submissions',
        'Priority customer support',
        'Professional ratings & reviews'
      ],
      limitations: [],
      href: '/register',
      buttonText: 'Start Premium Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'GHS 199',
      period: '/month',
      description: 'For large organizations with complex hiring needs',
      features: [
        'Everything in Premium',
        'Dedicated account manager',
        'Custom integration options',
        'Bulk hiring tools',
        'Advanced analytics',
        '24/7 priority support'
      ],
      limitations: [],
      href: '/contact',
      buttonText: 'Contact Sales'
    }
  ],
  professionals: [
    {
      name: 'Starter',
      price: 'Free',
      period: '',
      description: 'Get started and build your reputation',
      features: [
        'Basic profile creation',
        'Apply to 5 jobs/month',
        'Standard listing visibility',
        'Basic messaging'
      ],
      limitations: [
        'Featured profile badge'
      ],
      href: '/register-pro',
      buttonText: 'Join for Free'
    },
    {
      name: 'Professional',
      price: 'GHS 199',
      period: '/month',
      description: 'Boost your visibility and win more projects',
      features: [
        'Everything in Starter',
        'Enhanced profile with portfolio',
        'Unlimited job applications',
        'Priority in search results',
        'Featured professional badge',
        'Advanced messaging tools'
      ],
      limitations: [],
      href: '/register-pro',
      buttonText: 'Upgrade to Pro',
      popular: true
    },
    {
      name: 'Expert',
      price: 'GHS 299',
      period: '/month',
      description: 'Maximum exposure and premium features',
      features: [
        'Everything in Professional',
        'Top-tier search placement',
        'Verified expert badge',
        'Priority customer support',
        'Advanced analytics dashboard',
        'Exclusive project invitations'
      ],
      limitations: [],
      href: '/register-pro',
      buttonText: 'Become an Expert'
    }
  ]
};

const FAQ_DATA = [
  {
    question: 'Can I switch between plans anytime?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.'
  },
  {
    question: 'Is there a free trial available?',
    answer: 'Yes! All premium plans come with a 14-day free trial. No credit card required.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, Mobile Money, and bank transfers within Ghana.'
  }
];

// Components
const PlanToggle = ({ activeTab, onToggle }) => (
  <div className="flex justify-center mb-12">
    <div className="bg-gray-100 rounded-lg p-1 flex">
      <button
        onClick={() => onToggle('clients')}
        className={`px-6 py-2 rounded-md font-medium transition-colors ${
          activeTab === 'clients'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        For Clients
      </button>
      <button
        onClick={() => onToggle('professionals')}
        className={`px-6 py-2 rounded-md font-medium transition-colors ${
          activeTab === 'professionals'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        For Professionals
      </button>
    </div>
  </div>
);

const PricingCard = ({ plan }) => (
  <div className={`bg-white rounded-lg shadow-sm border p-6 relative ${
    plan.popular ? 'border-blue-500 shadow-lg' : 'border-gray-200'
  }`}>
    {plan.popular && (
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
        Most Popular
      </div>
    )}
    
    <div className="text-center mb-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
        <span className="text-gray-500">{plan.period}</span>
      </div>
      <p className="text-gray-600 text-sm">{plan.description}</p>
    </div>
    
    <div className="space-y-3 mb-8">
      {plan.features.map((feature, idx) => (
        <div key={idx} className="flex items-center text-sm">
          <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
          <span>{feature}</span>
        </div>
      ))}
      {plan.limitations.map((limitation, idx) => (
        <div key={idx} className="flex items-center text-sm">
          <X className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
          <span className="text-gray-400">{limitation}</span>
        </div>
      ))}
    </div>
    
    <Link
      href={plan.href}
      className={`w-full block text-center font-medium py-3 px-4 rounded-lg transition-colors ${
        plan.popular
          ? 'bg-blue-600 hover:bg-blue-700 text-white'
          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
      }`}
    >
      {plan.buttonText}
    </Link>
  </div>
);

const FAQ = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
          <button
            className="w-full text-left flex justify-between items-center"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span className="font-medium text-gray-900">{faq.question}</span>
            <ChevronDown 
              className={`w-5 h-5 text-gray-400 transition-transform ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openIndex === index && (
            <div className="mt-4 text-gray-600 text-sm">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Main Component
const PricingPage = () => {
  const [activeTab, setActiveTab] = useState('clients');

  const currentPlans = PRICING_DATA[activeTab];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your needs. Upgrade or downgrade at any time.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        
        {/* Plan Toggle */}
        <PlanToggle activeTab={activeTab} onToggle={setActiveTab} />

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {currentPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>

        {/* Features Highlight */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Why Choose DirectWayz GH?
            </h2>
            <p className="text-gray-600">
              Built for the Ghanaian market with features that matter most
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Quality Professionals</h3>
              <p className="text-sm text-gray-600">Verified and rated professionals you can trust</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Local Focus</h3>
              <p className="text-sm text-gray-600">Designed specifically for Ghanaian businesses</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Easy Payments</h3>
              <p className="text-sm text-gray-600">Mobile Money and local payment methods</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-600">Get help when you need it most</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">Everything you need to know about our pricing</p>
          </div>
          
          <FAQ faqs={FAQ_DATA} />
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-blue-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 mb-6">
            Join thousands who trust DirectWayz GH for their business needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-blue-600 font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start Free Trial
            </Link>
            <Link
              href="/contact"
              className="border border-white text-white font-medium px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;