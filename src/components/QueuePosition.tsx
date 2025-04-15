
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CircleDot } from 'lucide-react';

interface QueuePositionProps {
  tokenNumber: number;
  position: number;
  estimatedTime: number;
}

export function QueuePosition({ tokenNumber, position, estimatedTime }: QueuePositionProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Your Queue Status
          <Badge variant="outline" className="ml-2">
            Token #{tokenNumber}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center space-x-2">
          <CircleDot className="h-5 w-5 text-blue-500 animate-pulse" />
          <span className="text-xl font-semibold">
            Position in Queue: {position}
          </span>
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">
            Estimated waiting time
          </p>
          <p className="text-2xl font-bold text-blue-600">
            {estimatedTime} minutes
          </p>
        </div>

        <div className="space-y-2">
          <Button variant="outline" className="w-full">
            Refresh Status
          </Button>
          <p className="text-xs text-center text-gray-500">
            Status auto-updates every 60 seconds
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
