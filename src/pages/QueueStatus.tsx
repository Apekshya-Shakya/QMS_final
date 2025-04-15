
import { Navigation } from '@/components/Navigation';
import { QueuePosition } from '@/components/QueuePosition';

const QueueStatus = () => {
  // Dummy data - will be replaced with real data from Firebase
  const dummyData = {
    tokenNumber: 46,
    position: 3,
    estimatedTime: 15
  };

  return (
    <>
      <Navigation />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Queue Status</h1>
        <QueuePosition {...dummyData} />
      </div>
    </>
  );
};

export default QueueStatus;
