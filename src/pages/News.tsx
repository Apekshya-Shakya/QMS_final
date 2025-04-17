
import { Navigation } from '@/components/Navigation';
import { CalendarIcon } from 'lucide-react';

const News = () => {
  // Dummy news and events
  const newsAndEvents = [
    {
      id: 1,
      title: "New Pediatric Wing Opening",
      type: "News",
      date: "April 30, 2025",
      content: "We're excited to announce the opening of our new state-of-the-art pediatric wing designed to provide specialized care for our youngest patients.",
      image: "https://placehold.co/600x300/png"
    },
    {
      id: 2,
      title: "Free Health Screening Day",
      type: "Event",
      date: "May 15, 2025",
      time: "9:00 AM - 4:00 PM",
      content: "Join us for our annual free health screening day. Services include blood pressure checks, cholesterol screening, and diabetes testing.",
      image: "https://placehold.co/600x300/png"
    },
    {
      id: 3,
      title: "Dr. James Williams Joins Our Team",
      type: "News",
      date: "April 10, 2025",
      content: "We're pleased to welcome Dr. James Williams, a renowned neurologist, to our medical staff. Dr. Williams brings over 15 years of experience.",
      image: "https://placehold.co/600x300/png"
    },
    {
      id: 4,
      title: "Community Health Workshop",
      type: "Event",
      date: "May 22, 2025",
      time: "6:00 PM - 8:00 PM",
      content: "Learn about preventive healthcare measures and lifestyle changes to improve your overall health in this free community workshop.",
      image: "https://placehold.co/600x300/png"
    }
  ];

  return (
    <>
      <Navigation />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">News & Events</h1>
        
        <div className="space-y-8">
          {newsAndEvents.map((item) => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
              <div className="md:w-1/3">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:w-2/3">
                <div className="flex items-center mb-2">
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${item.type === 'News' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                    {item.type}
                  </span>
                  <div className="flex items-center ml-4 text-sm text-gray-500">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {item.date}
                    {item.time && ` | ${item.time}`}
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-3">{item.title}</h2>
                <p className="text-gray-600">{item.content}</p>
                {item.type === 'Event' && (
                  <button className="mt-4 text-blue-500 font-medium hover:text-blue-700">
                    Register for this event
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default News;
