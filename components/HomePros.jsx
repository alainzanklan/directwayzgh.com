import ProfessionalCard from './ProsCard';
import Link from 'next/link';
import connectDB from '@/config/database';
import Pro from '@/models/Pro';

const HomeJobs = async () => {
  let pros = [];
  
  try {
    await connectDB();
    
    // Fetch directly from database instead of API
    const professionals = await Pro.find({})
      .select('-__v')
      .sort({ createdAt: -1 })
      .lean();
      
    // Convert MongoDB ObjectIds to strings for serialization
    pros = professionals.map(pro => ({
      ...pro,
      _id: pro._id.toString(),
      owner: pro.owner?.toString(),
    }));
    
  } catch (error) {
    console.error('Error fetching professionals:', error);
    // Return empty array on error to prevent page crash
    pros = [];
  }

  // Get random 3 professionals
  const recentPros = pros
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <section className="mb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Recent Professionals
        </h2>
        
        {recentPros.length === 0 ? (
          <p className="text-center text-gray-600">No professionals found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {recentPros.map((pro) => (
              <ProfessionalCard key={pro._id} pros={pro} />
            ))}
          </div>
        )}

        <div className="text-center">
          <Link
            href="/professionals"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            View All Professionals
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeJobs;