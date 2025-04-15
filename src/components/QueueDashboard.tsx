
import { useState } from 'react';
import { Patient, QueueStats } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, Timer } from 'lucide-react';

// Dummy data
const dummyStats: QueueStats = {
  totalWaiting: 12,
  averageWaitTime: 25,
  currentToken: 45,
};

const dummyPatients: Patient[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phoneNumber: '123-456-7890',
    tokenNumber: 45,
    appointmentTime: '2024-04-15T10:30:00',
    status: 'in-progress',
    queuePosition: 0,
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phoneNumber: '123-456-7891',
    tokenNumber: 46,
    appointmentTime: '2024-04-15T11:00:00',
    status: 'waiting',
    queuePosition: 1,
  },
];

export function QueueDashboard() {
  const [stats] = useState<QueueStats>(dummyStats);
  const [patients] = useState<Patient[]>(dummyPatients);

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
            <div className="text-2xl font-bold">{stats.currentToken}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Waiting Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalWaiting}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Wait Time</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageWaitTime} min</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
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
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Request Token</CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="w-full">Get New Token</Button>
        </CardContent>
      </Card>
    </div>
  );
}
