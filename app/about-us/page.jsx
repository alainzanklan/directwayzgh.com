'use client';

import React from 'react';
import { Users, Search, Shield, Star, ArrowRight, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import hero from '@/assets/images/hero.png'; // Fixed: Removed curly braces
import { useRouter } from 'next/navigation';

const AboutUsPage = () => {
  const router = useRouter();
  const features = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Efficiency",
      description: "Advanced search and filtering tools save you hours of endless scrolling and frustration."
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Quality",
      description: "Handpicked professionals with the right expertise, qualifications, and proven track record."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Transparency",
      description: "Comprehensive profiles, client reviews, and ratings for informed decision-making."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community",
      description: "A thriving community built on respect, support, and meaningful connections."
    }
  ];

  const benefits = [
    "Browse diverse pool of talented professionals",
    "Name your price and negotiate freely",
    "Seamless, user-friendly experience",
    "Connect with clients seeking your expertise",
    "Showcase your skills with captivating profiles",
    "Expand your client base effectively"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-indigo-500 to-indigo-600 bg-clip-text text-transparent">
                  DirectWayz GH
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Your innovative platform connecting individuals with skilled professionals. 
                Making it easier than ever to find the perfect match for your requirements.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => router.push('/register')} className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-500 hover:to-blue-600 text-white px-8 py-3 rounded-2xl font-medium transition-all duration-200 flex items-center gap-2 group">
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => router.push('/register-pro')} className="border-2 border-indigo-200 hover:border-indigo-300 text-indigo-600 px-8 py-3 rounded-2xl font-medium transition-all duration-200">
                  Become a Pro
                </button>
              </div>
            </div>
            
            {/* Hero Image - Fixed */}
            <div className="relative w-full h-96 lg:h-[500px]">
              <Image 
                src={hero} 
                alt="DirectWayz GH Hero - Connecting Professionals and Clients" 
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Two-Column Value Proposition */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* For Clients */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">For Professionals You Need</h2>
              <p className="text-gray-600 mb-6">
                Searching for the perfect professional? Our platform connects you with skilled experts across all fields. 
                From contractors to consultants, therapists to specialists - find your perfect match.
              </p>
              <div className="space-y-3">
                {benefits.slice(0, 3).map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* For Professionals */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">For Professionals Like You</h2>
              <p className="text-gray-600 mb-6">
                Ready to showcase your expertise? Our platform helps you connect with clients who need your specific skills. 
                Expand your reach and grow your business with us.
              </p>
              <div className="space-y-3">
                {benefits.slice(3, 6).map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose DirectWayz GH?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe in empowering individuals and professionals alike, fostering meaningful 
              connections and mutually beneficial collaborations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-500 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join us today and unlock a world of opportunities. Whether you're in need or have 
            something incredible to offer, DirectWayz GH is your ultimate destination.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white text-indigo-600 hover:bg-gray-50 px-8 py-4 rounded-2xl font-bold transition-all duration-200 flex items-center gap-2 group" onClick={() => router.push('/register')}>
              <span>Sign Up Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => router.push('/register-pro')} className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-4 rounded-2xl font-bold transition-all duration-200">
              Become a Pro
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;