
import { Link } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';

export function Navigation() {
  return (
    <nav className="bg-white shadow-sm mb-8">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center">
          <Sidebar />
          <Link to="/" className="flex items-center ml-2">
            <span className="font-bold text-xl text-gray-800">Hospital Queue Management System</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
