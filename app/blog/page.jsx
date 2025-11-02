'use client'
import React from 'react';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Top 5 Most Reliable Handyman Services in Ghana for Home and Office Repairs",
      excerpt: "When it comes to home or office maintenance, finding the right professional can make all the difference. From fixing a leaking tap to installing new lighting or building furniture, reliable handyman services in Ghana are in high demand.",
      content: `When it comes to home or office maintenance, finding the right professional can make all the difference. From fixing a leaking tap to installing new lighting or building furniture, reliable **handyman services in Ghana** are in high demand. Whether you live in Accra, Kumasi, or Takoradi, skilled workers are available to save you time, stress, and money. In this article, we highlight the top five handyman services you should consider when it's time for repairs or upgrades.

## 1. Plumbing Services
Water leaks, blocked drains, and faulty bathroom fittings are some of the most common household problems. Professional plumbers in Ghana are trained to handle everything from emergency repairs to complete bathroom installations. Instead of trying a quick DIY fix that may cause more damage, hiring a skilled plumber ensures long-term solutions and prevents costly water damage.

**Tip:** Look for plumbers who provide 24/7 services in case of urgent emergencies.

## 2. Electrical Services
Electricity is essential for every home and office, but faulty wiring or installations can be dangerous. Hiring a licensed electrician in Ghana guarantees safety and compliance with local standards. From installing ceiling fans and air conditioners to repairing circuit faults, reliable electricians ensure your systems run smoothly.

**Pro advice:** Always ask for proof of certification before hiring an electrician to avoid risks.

## 3. Carpentry and Furniture Works
Ghanaian carpenters are known for their craftsmanship, especially when it comes to custom furniture, roofing, or wooden fittings. Whether you need a new wardrobe, office desk, or home renovations, skilled carpenters can design and build to your taste. Investing in professional carpentry also ensures durability, saving you money in the long run.

**Example:** A locally made wooden sofa set can last decades when built by a professional carpenter.

## 4. Painting and Decorating
A fresh coat of paint can transform your home or office instantly. Professional painters in Ghana not only bring color to your space but also ensure neat finishes and the right choice of materials. Some also offer interior décor services, helping you create the perfect atmosphere for your living or work environment.

**Quick tip:** Ask your painter about weather-resistant paint for exterior walls to withstand Ghana's tropical climate.

## 5. Makeup and Beauty Artistry
Handyman services are not limited to repairs—skilled workers also include makeup artists and beauticians. For weddings, parties, or professional photo shoots, Ghanaian makeup artists provide high-quality services at affordable rates. Many now offer mobile services, traveling to your home or event venue for convenience.

**Why it matters:** Professional beauty services save you time and ensure you look your best for every occasion.

## Why Choose Professional Handyman Services in Ghana?
* **Saves time and stress:** Skilled workers handle the job faster and more efficiently than DIY.
* **Cost-effective:** Professional work reduces repeated fixes and unnecessary expenses.
* **Safety:** Certified artisans follow the right procedures to prevent accidents.
* **Local expertise:** Ghanaian hand workers understand the unique needs of local homes and offices.

## Final Thoughts
From **plumbing and electrical services** to **carpentry, painting, and beauty artistry**, reliable hand workers play an essential role in Ghana's economy and everyday life. Whether you're upgrading your home, renovating an office, or preparing for a big event, choosing trusted professionals guarantees peace of mind and quality results.

If you're searching for **handyman services in Ghana**, make sure to hire skilled, experienced, and verified workers for the best outcome.`,
      author: "DirectwayzGH Team",
      date: "2025-01-15",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=400&fit=crop",
      category: "Home Services"
    },
    {
      id: 2,
      title: "How to Choose the Right Professional for Your Home Project",
      excerpt: "Planning a home renovation or repair project? Here's your complete guide to selecting the best professionals for quality results.",
      content: "Planning a home renovation or repair project can be overwhelming, but choosing the right professional doesn't have to be. Here's your complete guide to making the best decision for your project...",
      author: "Sarah Johnson",
      date: "2025-01-12",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop",
      category: "Tips & Guides"
    },
    {
      id: 3,
      title: "The Rise of Mobile Services in Ghana's Service Industry",
      excerpt: "From mobile mechanics to home beauticians, discover how on-demand services are transforming the way we access professional help.",
      content: "The service industry in Ghana is experiencing a revolutionary shift towards mobile and on-demand services. Gone are the days when you had to travel to access professional help...",
      author: "Michael Asante",
      date: "2025-01-10",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&h=400&fit=crop",
      category: "Industry Trends"
    },
    {
      id: 4,
      title: "Budget-Friendly Home Maintenance Tips for Every Homeowner",
      excerpt: "Keep your home in perfect condition without breaking the bank. Learn essential maintenance tips that save money long-term.",
      content: "Regular home maintenance is crucial for preserving your property's value and ensuring your family's safety. However, it doesn't have to be expensive...",
      author: "Grace Owusu",
      date: "2025-01-08",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=400&fit=crop",
      category: "Home Care"
    }
  ];

  const [selectedPost, setSelectedPost] = React.useState(null);

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => setSelectedPost(null)}
            className="mb-6 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
          >
            ← Back to Blog
          </button>
          
          <article className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-64 object-cover"
            />
            
            <div className="p-8">
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {selectedPost.category}
                </span>
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  {selectedPost.date}
                </div>
                <div className="flex items-center gap-1">
                  <User size={16} />
                  {selectedPost.author}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  {selectedPost.readTime}
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                {selectedPost.title}
              </h1>
              
              <div className="prose max-w-none">
                {selectedPost.content.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('* ')) {
                    return (
                      <li key={index} className="text-gray-700 leading-relaxed mb-2">
                        {paragraph.replace('* ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
                      </li>
                    );
                  }
                  if (paragraph.trim()) {
                    return (
                      <p 
                        key={index} 
                        className="text-gray-700 leading-relaxed mb-4"
                        dangerouslySetInnerHTML={{
                          __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        }}
                      />
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </article>

          {/* Related/More Blog Posts Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">More Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts
                .filter(post => post.id !== selectedPost.id) // Exclude current post
                .slice(0, 3) // Show only 3 related posts
                .map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group cursor-pointer"
                    onClick={() => {
                      setSelectedPost(post);
                      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top when switching posts
                    }}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          {post.date}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock size={12} />
                          {post.readTime}
                        </div>
                        
                        <div className="flex items-center gap-1 text-blue-600 group-hover:text-blue-700 transition-colors">
                          <span className="text-xs font-medium">Read more</span>
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
            
            {/* View All Posts Button */}
            <div className="text-center mt-8">
              <button
                onClick={() => setSelectedPost(null)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 mx-auto"
              >
                View All Blog Posts
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest tips, trends, and insights in Ghana's service industry
          </p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {post.date}
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-blue-600 group-hover:text-blue-700 transition-colors">
                    <span className="text-sm font-medium">Read more</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;