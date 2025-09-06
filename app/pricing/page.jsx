'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Star, 
  Eye, 
  Users, 
  Check, 
  X, 
  ChevronDown,
  ArrowLeft,
  Building,
  Mail,
  Phone
} from 'lucide-react';

const PricingPage = () => {
  const [activeTab, setActiveTab] = useState('client');
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const clientPlans = [
    {
      name: 'Basic',
      price: 'Free',
      period: '/month',
      description: 'Perfect for individuals with occasional hiring needs',
      features: [
        { text: 'Browse all professionals', included: true },
        { text: 'Basic search filters', included: true },
        { text: 'View public profiles', included: true },
        { text: 'Submit up to 2 projects/month', included: true },
        { text: 'Contact information access', included: false }
      ],
      buttonText: 'Get Started Free',
      buttonStyle: 'bg-gray-100 hover:bg-gray-200 text-gray-800',
      href:'/register'

    },
    {
      name: 'Premium',
      price: 'GHS 99',
      period: '/month',
      description: 'Ideal for small businesses and frequent hirers',
      features: [
        { text: 'Everything in Basic', included: true },
        { text: 'Advanced search & filters', included: true },
        { text: 'Contact info access', included: true },
        { text: 'Unlimited project submissions', included: true },
        { text: 'Priority customer support', included: true },
        { text: 'Professional ratings & reviews', included: true }
      ],
      buttonText: 'Start Premium Trial',
      buttonStyle: 'bg-indigo-600 hover:bg-indigo-700 text-white',
      popular: true,
      href:'/register'

    },
    {
      name: 'Enterprise',
      price: 'GHS 199',
      period: '/month',
      description: 'For large organizations with complex hiring needs',
      features: [
        { text: 'Everything in Premium', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: 'Custom integration options', included: true },
        { text: 'Bulk hiring tools', included: true },
        { text: 'Advanced analytics', included: true },
        { text: '24/7 priority support', included: true }
      ],
      buttonText: 'Contact Sales',
      buttonStyle: 'bg-gray-800 hover:bg-gray-900 text-white',
      href:'/register'

    }
  ];

  const professionalPlans = [
    {
      name: 'Starter',
      price: 'Free',
      period: '/month',
      description: 'Get started and build your reputation',
      features: [
        { text: 'Basic profile creation', included: true },
        { text: 'Apply to 5 jobs/month', included: true },
        { text: 'Standard listing visibility', included: true },
        { text: 'Basic messaging', included: true },
        { text: 'Featured profile badge', included: false }
      ],
      buttonText: 'Join for Free',
      buttonStyle: 'bg-gray-100 hover:bg-gray-200 text-gray-800',
      href:'/register-pro'
    },
    {
      name: 'Professional',
      price: 'GHS 199',
      period: '/month',
      description: 'Boost your visibility and win more projects',
      features: [
        { text: 'Everything in Starter', included: true },
        { text: 'Enhanced profile with portfolio', included: true },
        { text: 'Unlimited job applications', included: true },
        { text: 'Priority in search results', included: true },
        { text: 'Featured professional badge', included: true },
        { text: 'Advanced messaging tools', included: true }
      ],
      buttonText: 'Upgrade to Pro',
      buttonStyle: 'bg-indigo-600 hover:bg-indigo-700 text-white',
      popular: true,
      href:'/register-pro'

    },
    {
      name: 'Expert',
      price: 'GHS 299',
      period: '/month',
      description: 'Maximum exposure and premium features',
      features: [
        { text: 'Everything in Professional', included: true },
        { text: 'Top-tier search placement', included: true },
        { text: 'Verified expert badge', included: true },
        { text: 'Priority customer support', included: true },
        { text: 'Advanced analytics dashboard', included: true },
        { text: 'Exclusive project invitations', included: true }
      ],
      buttonText: 'Become an Expert',
      buttonStyle: 'bg-gray-800 hover:bg-gray-900 text-white',
      href:'/register-pro'

    }
  ];

  const features = [
    {
      icon: Search,
      title: 'Efficiency',
      description: 'Advanced search and filtering tools save you hours of endless scrolling and frustration.',
      color: 'indigo'
    },
    {
      icon: Star,
      title: 'Quality',
      description: 'Handpicked professionals with the right expertise, qualifications, and proven track record.',
      color: 'green'
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'Comprehensive profiles, client reviews, and ratings for informed decision-making.',
      color: 'blue'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'A thriving community built on respect, support, and meaningful connections.',
      color: 'purple'
    }
  ];

  const faqs = [
    {
      question: 'Can I switch between plans anytime?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes will take effect immediately, and you\'ll be charged pro-rata for any upgrades.'
    },
    {
      question: 'Is there a free trial available?',
      answer: 'Yes! All premium plans come with a 14-day free trial. No credit card required to start your trial.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, Mobile Money, and bank transfers within Ghana. All payments are secure and processed through encrypted channels.'
    }
  ];

  const PricingCard = ({ plan, index }) => (
    <div className={`bg-white rounded-2xl shadow-lg border p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl relative ${
      plan.popular ? 'border-2 border-indigo-500 shadow-xl' : 'border-gray-200'
    }`}>
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-full text-sm font-bold animate-pulse">
          {activeTab === 'client' ? 'Most Popular' : 'Recommended'}
        </div>
      )}
      
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
        <span className="text-gray-500">{plan.period}</span>
      </div>
      <p className="text-gray-600 mb-6">{plan.description}</p>
      
      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-center">
            {feature.included ? (
              <Check className="text-green-500 mr-3 flex-shrink-0" size={16} />
            ) : (
              <X className="text-red-400 mr-3 flex-shrink-0" size={16} />
            )}
            <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>
      
      <Link 
      href={plan.href}
      className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors text-center block ${plan.buttonStyle}`}
    >
      {plan.buttonText}
    </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-500 via-cyan-600 to-blue-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Choose Your Perfect Plan</h1>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Whether you're seeking talented professionals or showcasing your expertise, we have the right plan to help you succeed on DirectWayz GH.
          </p>
          
          {/* Plan Type Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-1 flex">
              <button
                onClick={() => setActiveTab('client')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === 'client'
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                For Clients
              </button>
              <button
                onClick={() => setActiveTab('professional')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === 'professional'
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                For Professionals
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 -mt-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Plans for {activeTab === 'client' ? 'Clients' : 'Professionals'}
            </h2>
            <p className="text-gray-600 text-lg">
              {activeTab === 'client' 
                ? 'Find and hire the perfect professionals for your projects'
                : 'Showcase your skills and grow your client base'
              }
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {(activeTab === 'client' ? clientPlans : professionalPlans).map((plan, index) => (
              <PricingCard key={plan.name} plan={plan} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose DirectWayz GH?</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              We're committed to empowering individuals and professionals in Ghana, fostering meaningful connections and mutually beneficial collaborations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              const colorClasses = {
                indigo: 'bg-indigo-100 text-indigo-600',
                green: 'bg-green-100 text-green-600',
                blue: 'bg-blue-100 text-blue-600',
                purple: 'bg-purple-100 text-purple-600'
              };
              
              return (
                <div key={index} className="text-center group">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110 ${colorClasses[feature.color]}`}>
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Got questions? We've got answers.</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <button
                  className="w-full text-left flex justify-between items-center"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown 
                    className={`text-gray-400 transition-transform duration-200 ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                    size={20}
                  />
                </button>
                {openFAQ === index && (
                  <div className="mt-4 text-gray-600 animate-in slide-in-from-top-1 duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-500 via-cyan-600 to-blue-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of satisfied clients and professionals who trust DirectWayz GH for their business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-indigo-600 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default PricingPage;