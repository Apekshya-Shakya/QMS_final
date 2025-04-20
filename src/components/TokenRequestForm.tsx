
// import { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';

// export function TokenRequestForm() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phoneNumber: '',
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Here we'll later integrate with Firebase
//     console.log('Form submitted:', formData);
    
//     // For now, just show success with dummy data
//     alert(`Token Generated! Your token number is ${Math.floor(Math.random() * 100)}`);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <Card className="w-full max-w-md mx-auto">
//       <CardHeader>
//         <CardTitle>Request Token</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="name">Full Name</Label>
//             <Input
//               id="name"
//               name="name"
//               placeholder="Enter your full name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>
          
//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               name="email"
//               type="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
          
//           <div className="space-y-2">
//             <Label htmlFor="phoneNumber">Phone Number</Label>
//             <Input
//               id="phoneNumber"
//               name="phoneNumber"
//               placeholder="Enter your phone number"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <Button type="submit" className="w-full">
//             Generate Token
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }


//new
import { useState } from 'react';
import { collection, getDocs, addDoc, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function TokenRequestForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const patientsRef = collection(db, 'patients');

      // Get the last token number
      const latestQuery = query(patientsRef, orderBy('tokenNumber', 'desc'), limit(1));
      const snapshot = await getDocs(latestQuery);

      let newTokenNumber = 1;
      if (!snapshot.empty) {
        const lastToken = snapshot.docs[0].data().tokenNumber;
        newTokenNumber = lastToken + 1;
      }

      // Create new patient entry
      const newPatient = {
        ...formData,
        tokenNumber: newTokenNumber,
        status: 'waiting',
        queuePosition: newTokenNumber,
        appointmentTime: null,
        createdAt: new Date(),
      };

      await addDoc(patientsRef, newPatient);

      alert(`✅ Token Generated!\nYour token number is ${newTokenNumber}`);

      // Optional: Clear form after submission
      setFormData({ name: '', email: '', phoneNumber: '' });
    } catch (error) {
      console.error('Error generating token:', error);
      alert('❌ Failed to generate token. Please try again.');
    }

    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Request Token</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Generating Token...' : 'Generate Token'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
