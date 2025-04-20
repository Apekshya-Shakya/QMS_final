import { useEffect, useState } from 'react';
import { Patient } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

export function QueueDashboard() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [currentToken, setCurrentToken] = useState<number>(0);
  const [totalWaiting, setTotalWaiting] = useState<number>(0);
  const [averageWaitTime, setAverageWaitTime] = useState<number>(0); 

  useEffect(() => {
    const q = query(collection(db, 'patients'), orderBy('tokenNumber'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedPatients = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Patient[];

      setPatients(updatedPatients);

      // Set stats dynamically
      const waiting = updatedPatients.filter((p) => p.status === 'waiting');
      const inProgress = updatedPatients.find((p) => p.status === 'in-progress');

      setTotalWaiting(waiting.length);
      setCurrentToken(inProgress?.tokenNumber ?? 0);

      // Optional: average wait time calculation placeholder
      setAverageWaitTime(waiting.length * 5); // simple estimate: 5 min per patient
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Hospital Queue Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Token</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentToken}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Waiting Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWaiting}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Wait Time</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageWaitTime} min</div>
          </CardContent>
        </Card>
      </div>

      {/* <Card className="mb-8">
        <CardHeader>
          <CardTitle>Current Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Token</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Appointment Time</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id} className="bg-white border-b">
                    <td className="px-6 py-4">{patient.tokenNumber}</td>
                    <td className="px-6 py-4">{patient.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        patient.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        patient.status === 'waiting' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(patient.appointmentTime!).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="outline" size="sm">View Details</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card> */}

      <Card>
        <CardHeader>
          <CardTitle>Request Token</CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="w-full">
            <Link to="/request-token" className="w-full h-full block text-center">
              Get New Token
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
