'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Users, Shield, Phone } from 'lucide-react';

const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqCategories = {
    general: {
      title: "General",
      icon: <HelpCircle className="w-5 h-5" />,
      color: "blue",
      faqs: [
        {
          title: 'What is your platform?',
          desc: "Our platform connects individuals looking for professional services with qualified experts. It makes it easy to find the right professional according to your specific needs and enables competitive pricing."
        },
        {
          title: 'How does the platform work?',
          desc: 'Browse our database of qualified professionals, view their profiles, and select those that match your needs. Post a project listing and interested professionals can apply.'
        },
        {
          title: 'Are there fees for using the platform?',
          desc: 'Registration and browsing are free. Nominal service fees may apply when hiring to support platform maintenance and improvements.'
        }
      ]
    },
    professionals: {
      title: "For Professionals",
      icon: <Users className="w-5 h-5" />,
      color: "green",
      faqs: [
        {
          title: 'How do I become a professional on your platform?',
          desc: "Create a profile detailing your skills, experience, and qualifications. Our team reviews your application to ensure it meets our quality standards."
        },
        {
          title: 'How do professionals set their rates?',
          desc: "Professionals set their own rates based on service type, complexity, and time required. This flexibility allows for pricing tailored to each situation."
        },
        {
          title: 'Can users negotiate prices?',
          desc: 'Yes, negotiation is possible depending on both parties\' preferences. We encourage open communication for a mutually satisfactory agreement.'
        }
      ]
    },
    security: {
      title: "Security & Quality",
      icon: <Shield className="w-5 h-5" />,
      color: "purple",
      faqs: [
        {
          title: 'How do you ensure professional quality?',
          desc: 'We have a rigorous verification process including validation of qualifications, references, and professional history to guarantee excellence.'
        },
        {
          title: 'Can users leave reviews?',
          desc: 'Yes, users can leave reviews and ratings for professionals. This maintains transparency and helps others make informed decisions.'
        },
        {
          title: 'What measures ensure data security?',
          desc: 'We use advanced encryption to protect user data and have strict guidelines against fraudulent activities. Identities are verified.'
        }
      ]
    }
  };

  const supportFaq = {
    title: 'How do I contact customer support?',
    desc: 'For any questions or assistance, contact our team through the Contact section of our website, by email, or phone. We\'re here to help!'
  };

  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
      icon: "text-blue-600"
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-200", 
      text: "text-green-700",
      icon: "text-green-600"
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-700", 
      icon: "text-purple-600"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <HelpCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Quickly find answers to your questions about our platform and services.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {Object.entries(faqCategories).map(([key, category]) => (
            <div key={key} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className={`${colorClasses[category.color].bg} ${colorClasses[category.color].border} border-b px-6 py-4`}>
                <div className="flex items-center gap-3">
                  <div className={colorClasses[category.color].icon}>
                    {category.icon}
                  </div>
                  <h2 className={`text-xl font-semibold ${colorClasses[category.color].text}`}>
                    {category.title}
                  </h2>
                </div>
              </div>
              
              <div className="divide-y divide-slate-100">
                {category.faqs.map((faq, faqIndex) => {
                  const globalIndex = `${key}-${faqIndex}`;
                  const isOpen = openIndex === globalIndex;
                  
                  return (
                    <div key={faqIndex} className="group">
                      <button
                        onClick={() => toggle(globalIndex)}
                        className="w-full px-6 py-5 text-left hover:bg-slate-50 transition-colors duration-200 focus:outline-none focus:bg-slate-50"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-slate-800 pr-4 group-hover:text-blue-600 transition-colors">
                            {faq.title}
                          </h3>
                          <div className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                            <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
                          </div>
                        </div>
                      </button>
                      
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <div className="px-6 pb-5">
                          <p className="text-slate-600 leading-relaxed">
                            {faq.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Support Contact Card */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg text-white overflow-hidden">
            <div className="px-6 py-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">
                    {supportFaq.title}
                  </h3>
                  <p className="text-blue-100 leading-relaxed mb-4">
                    {supportFaq.desc}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a 
                      href="/contact" 
                      className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
                    >
                      Contact Page
                    </a>
                    <a 
                      href="mailto:info@directwayzgh.com" 
                      className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
                    >
                      Email Support
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-slate-600 mb-6">
            Can't find the answer to your question?
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <Phone className="w-4 h-4" />
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;