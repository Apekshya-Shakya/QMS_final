
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Plus, Clock } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { useAuth } from '@/contexts/AuthContext';

export function Navigation() {
  const { user } = useAuth();
  
  return (
    <nav className="bg-white shadow-sm mb-8">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Sidebar />
            <Link to="/" className="flex items-center space-x-2 ml-2">
              <Home className="h-6 w-6 text-blue-500" />
              <span className="font-bold text-xl text-gray-800">Hospital Queue</span>
            </Link>
          </div>
          
          {user ? (
            <div className="flex items-center space-x-4">
              {/* <Button variant="ghost" asChild>
                <Link to="/request-token">
                  <Plus className="h-4 w-4 mr-2" />
                  Get Token
                </Link>
              </Button> */}
              <Button variant="ghost" asChild>
                <Link to="/queue-status">
                  <Clock className="h-4 w-4 mr-2" />
                  Check Status
                </Link>
              </Button>
            </div>
          ) : (
            <Button variant="default" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
