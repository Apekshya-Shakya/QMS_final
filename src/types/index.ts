
export interface Patient {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  tokenNumber: number | null;
  appointmentTime: string | null;
  status: 'waiting' | 'in-progress' | 'completed';
  queuePosition: number;
}

export interface QueueStats {
  totalWaiting: number;
  averageWaitTime: number;
  currentToken: number;
}
