'use client';

import Faq from '@/components/Faq';
import { useState } from 'react';

const FaqPage = () => {
  const [open, setOpen] = useState(false);

  const toggle = (index) => {
    if (open === index) {
      return setOpen(null);
    }

    setOpen(index);
  };
  const faqs = [
    {
      title: 'What is your website all about?',
      desc: "Our website is a platform that facilitates connections between individuals seeking professional services and skilled professionals. It's designed to make it easy for users to find the right professionals for their specific needs and set competitive prices for their services",
    },
    {
      title: 'How does the platform work?',
      desc: 'As a user looking for professional services, you can browse through our database of skilled professionals, view their profiles, and select the ones that best match your requirements. You can then post a job listing, and interested professionals will have the opportunity to apply.',
    },
    {
      title: 'How do I become a professional on your platform?',
      desc: "To become a professional on our website, you need to create a profile detailing your skills, experience, qualifications, and services offered. Our team will review your application to ensure it meets our quality standards, and once approved, you'll be able to apply for jobs posted by users.",
    },
    {
      title: 'How do professionals set their prices for services?',
      desc: "Our platform allows professionals to set their own prices for the services they offer. During the profile creation process, you'll have the option to specify your rates based on various factors such as the type of service, complexity, and time required.",
    },
    {
      title: 'Can users negotiate prices with professionals?',
      desc: 'Yes, users can negotiate prices with professionals, but it ultimately depends on the preferences of both parties. We encourage open communication to reach a mutual agreement that satisfies both the user and the professional.',
    },
    {
      title: 'Is there a fee for using the platform?',
      desc: 'As a user looking for professional services, signing up and browsing through profiles is free. However, when you decide to hire a professional, there might be a nominal service fee associated with the transaction to support the maintenance and improvement of the platform.',
    },
    {
      title: 'How do you ensure the quality of professionals on your platform?',
      desc: 'We take quality seriously and have a rigorous vetting process for professionals applying to join our platform. We verify their qualifications, credentials, and work history to ensure they meet our standards of excellence.',
    },
    {
      title: 'Can users leave reviews and ratings for professionals?',
      desc: "Yes, users can provide feedback and leave reviews for professionals they've worked with. This feature helps maintain transparency and accountability within the community, aiding others in making informed decisions.",
    },
    {
      title:
        'What measures do you have in place for user safety and data security?',
      desc: 'We prioritize user safety and data security. Our platform uses advanced encryption techniques to protect user data, and we have strict guidelines to prevent fraudulent activities. User identities are verified to foster a trustworthy environment.',
    },
    {
      title:
        'How can I get in touch with customer support if I have further questions or issues?',
      desc: 'If you have any questions, concerns, or need assistance, you can reach out to our customer support team through the Contact Us section on our website or via email or phone, which will be provided on the platform.',
    },
  ];
  return (
    <section className='bg-indigo-50 place-items-center py-16'>
      <div className='px-10 max-w-[800px]'>
        <div className=' flex py-6 bg-white text-2xl font-bold text-slate-700 justify-center'>
          <h1>Frequently Asked Questions</h1>
        </div>
        {faqs.map((faq, index) => {
          return (
            <Faq
              key={index}
              open={index === open}
              title={faq.title}
              desc={faq.desc}
              toggle={() => toggle(index)}
            />
          );
        })}
      </div>
    </section>
  );
};

export default FaqPage;
