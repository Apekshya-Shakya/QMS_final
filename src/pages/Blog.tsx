
import { Navigation } from '@/components/Navigation';
import { CalendarIcon } from 'lucide-react';

const Blog = () => {
  // Dummy blog posts
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Heart Health",
      excerpt: "Learn about the latest research in cardiovascular health and prevention strategies.",
      date: "April 12, 2025",
      author: "Dr. Sarah Johnson",
      category: "Cardiology",
      image: "https://placehold.co/600x400/png"
    },
    {
      id: 2,
      title: "COVID-19: What You Need to Know Today",
      excerpt: "Stay updated with the latest information about COVID-19, vaccines, and preventive measures.",
      date: "April 08, 2025",
      author: "Dr. Michael Chen",
      category: "Infectious Diseases",
      image: "https://placehold.co/600x400/png"
    },
    {
      id: 3,
      title: "Mental Health Matters: Signs of Stress and Anxiety",
      excerpt: "Recognizing the signs of stress and anxiety and when to seek professional help.",
      date: "April 01, 2025",
      author: "Dr. Emily Rodriguez",
      category: "Mental Health",
      image: "https://placehold.co/600x400/png"
    },
    {
      id: 4,
      title: "Nutrition Tips for a Healthy Lifestyle",
      excerpt: "Practical advice on maintaining a balanced diet and improving your nutrition.",
      date: "March 25, 2025",
      author: "Dr. David Wilson",
      category: "Nutrition",
      image: "https://placehold.co/600x400/png"
    }
  ];

  return (
    <>
      <Navigation />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Health Blog</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-sm text-blue-500 mb-2">{post.category}</div>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-500">{post.author}</div>
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {post.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog;
