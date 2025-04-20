
// import { Navigation } from '@/components/Navigation';
// import { QueuePosition } from '@/components/QueuePosition';

// const QueueStatus = () => {
//   // Dummy data - will be replaced with real data from Firebase
//   const dummyData = {
//     tokenNumber: 46,
//     position: 3,
//     estimatedTime: 15
//   };

//   return (
//     <>
//       <Navigation />
//       <div className="container mx-auto p-6">
//         <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Queue Status</h1>
//        /* <QueuePosition {...dummyData} />*
//       </div>
//     </>
//   );
// };

// export default QueueStatus;


// new
import { useEffect, useState } from 'react';
import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { Navigation } from '@/components/Navigation';
import { QueuePosition } from '@/components/QueuePosition';

const QueueStatus = () => {
  const { user } = useAuth(); // assuming user.email is available
  const [tokenData, setTokenData] = useState<null | {
    tokenNumber: number;
    queuePosition: number;
    estimatedTime: number;
  }>(null);

  useEffect(() => {
    if (!user?.email) return;

    const patientsRef = collection(db, 'patients');
    const userQuery = query(patientsRef, where('email', '==', user.email));

    const unsubscribe = onSnapshot(userQuery, (snapshot) => {
      if (!snapshot.empty) {
        const doc = snapshot.docs[0].data();
        setTokenData({
          tokenNumber: doc.tokenNumber,
          queuePosition: doc.queuePosition,
          estimatedTime: calculateEstimatedTime(doc.queuePosition),
        });
      }
    });

    return () => unsubscribe();
  }, [user?.email]);

  const calculateEstimatedTime = (position: number) => {
    const avgTimePerPatient = 5; // Adjust this as needed
    return position * avgTimePerPatient;
  };

  return (
    <>
      <Navigation />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Queue Status</h1>
        {tokenData ? (
          <QueuePosition
            tokenNumber={tokenData.tokenNumber}
            position={tokenData.queuePosition}
            estimatedTime={tokenData.estimatedTime}
          />
        ) : (
          <p className="text-center text-gray-600">Fetching your queue status...</p>
        )}
      </div>
    </>
  );
};

export default QueueStatus;
