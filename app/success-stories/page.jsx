import Link from 'next/link';
import React from 'react';

const SuccessStoriesPage = () => {
  const successStories = [
    {
      id: 1,
      name: "Kwame Asante",
      type: "Professional",
      profession: "Home Renovation Contractor",
      logo: "🏗️",
      testimonial: "DirectWayz GH transformed my business! I went from 2-3 projects per month to 15+ projects. The platform's transparency and review system helped me build incredible trust with clients.",
      location: "Accra, Ghana",
      metrics: [
        { label: "Monthly Projects", value: "15+" },
        { label: "Revenue Increase", value: "400%" },
        { label: "Client Rating", value: "4.9/5" }
      ],
      bgGradient: "from-orange-500/20 to-amber-500/20",
      accentColor: "border-orange-400"
    },
    {
      id: 2,
      name: "Abena Mensah",
      type: "Client",
      profession: "Small Business Owner",
      logo: "🏪",
      testimonial: "Finding a reliable digital marketing consultant was impossible until I found DirectWayz GH. Within 3 months, my online sales increased by 250% thanks to the perfect professional match.",
      location: "Kumasi, Ghana",
      metrics: [
        { label: "Online Sales", value: "+250%" },
        { label: "Time to Find Pro", value: "2 days" },
        { label: "Project Success", value: "100%" }
      ],
      bgGradient: "from-green-500/20 to-emerald-500/20",
      accentColor: "border-green-400"
    },
    {
      id: 3,
      name: "Dr. Yaw Osei",
      type: "Professional",
      profession: "Business Consultant",
      logo: "💼",
      testimonial: "As a consultant, DirectWayz GH gave me access to clients I never would have reached. My client base expanded from local to nationwide, and my expertise is now truly valued.",
      location: "Tamale, Ghana",
      metrics: [
        { label: "Client Base", value: "300% larger" },
        { label: "Geographic Reach", value: "10 regions" },
        { label: "Hourly Rate", value: "+150%" }
      ],
      bgGradient: "from-blue-500/20 to-indigo-500/20",
      accentColor: "border-blue-400"
    },
    {
      id: 4,
      name: "Ama Frimpong",
      type: "Client",
      profession: "Event Planner",
      logo: "🎉",
      testimonial: "I needed a graphic designer for my wedding planning business. DirectWayz GH connected me with an amazing designer who understood my vision perfectly. My brand now stands out beautifully.",
      location: "Cape Coast, Ghana",
      metrics: [
        { label: "Brand Recognition", value: "+180%" },
        { label: "New Clients", value: "45/month" },
        { label: "Satisfaction", value: "5/5 stars" }
      ],
      bgGradient: "from-pink-500/20 to-rose-500/20",
      accentColor: "border-pink-400"
    },
    {
      id: 5,
      name: "Isaac Boateng",
      type: "Professional",
      profession: "IT Support Specialist",
      logo: "💻",
      testimonial: "DirectWayz GH helped me transition from corporate IT to freelancing successfully. The platform's review system and client matching made building my reputation effortless.",
      location: "Tema, Ghana",
      metrics: [
        { label: "Monthly Income", value: "+220%" },
        { label: "Regular Clients", value: "25+" },
        { label: "Response Time", value: "2 hours" }
      ],
      bgGradient: "from-purple-500/20 to-violet-500/20",
      accentColor: "border-purple-400"
    },
    {
      id: 6,
      name: "Efua Danso",
      type: "Client",
      profession: "Restaurant Owner",
      logo: "🍽️",
      testimonial: "I was struggling to find a reliable accountant for my restaurant. DirectWayz GH connected me with a certified professional who streamlined my finances and saved me thousands in taxes.",
      location: "Ho, Ghana",
      metrics: [
        { label: "Tax Savings", value: "₵15,000" },
        { label: "Time Saved", value: "10hrs/week" },
        { label: "Profit Margin", value: "+35%" }
      ],
      bgGradient: "from-teal-500/20 to-cyan-500/20",
      accentColor: "border-teal-400"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
              Real Success Stories
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Discover how DirectWayz GH has transformed businesses and careers by connecting the right people at the right time
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-white">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">10,000+</div>
                <div className="text-sm text-slate-300">Successful Connections</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">₵500M+</div>
                <div className="text-sm text-slate-300">Value Created</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">4.8/5</div>
                <div className="text-sm text-slate-300">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Stories Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {successStories.map((story, index) => (
            <div
              key={story.id}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${story.bgGradient} backdrop-blur-sm border ${story.accentColor} border-opacity-20 hover:border-opacity-40 transition-all duration-500 hover:scale-105 hover:shadow-2xl`}
            >
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
              <div className="relative p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{story.logo}</div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{story.name}</h3>
                      <p className="text-sm text-slate-600 font-medium">{story.profession}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          story.type === 'Professional' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {story.type}
                        </span>
                        <span className="text-xs text-slate-500">📍 {story.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="mb-8">
                  <blockquote className="text-lg text-slate-800 leading-relaxed italic">
                    "{story.testimonial}"
                  </blockquote>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  {story.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="text-center p-3 bg-white/60 rounded-lg backdrop-blur-sm">
                      <div className="text-2xl font-bold text-slate-900 mb-1">{metric.value}</div>
                      <div className="text-xs text-slate-600 font-medium">{metric.label}</div>
                    </div>
                  ))}
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Benefits Section */}
      <div className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Why Our Community Thrives
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              DirectWayz GH empowers meaningful connections that drive real results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-semibold text-slate-900 mb-2">Efficiency</h3>
              <p className="text-sm text-slate-600">Advanced matching saves hours of searching</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="font-semibold text-slate-900 mb-2">Quality</h3>
              <p className="text-sm text-slate-600">Verified professionals with proven track records</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="font-semibold text-slate-900 mb-2">Transparency</h3>
              <p className="text-sm text-slate-600">Detailed profiles and authentic reviews</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="font-semibold text-slate-900 mb-2">Community</h3>
              <p className="text-sm text-slate-600">Built on respect and meaningful connections</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of Ghanaians who have found their perfect professional match on DirectWayz GH
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={'/register'}>
            <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Get Started
            </button>
            </Link>
            <Link href={'/register-pro'}>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
              Become a Pro
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStoriesPage;