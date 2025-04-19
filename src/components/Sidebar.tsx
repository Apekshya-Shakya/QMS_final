
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { 
  Menu, 
  Home, 
  User, 
  LogOut, 
  Clock, 
  Calendar, 
  Phone, 
  FileText, 
  Newspaper, 
  Info, 
  Plus,
  LogIn 
} from 'lucide-react';

export function Sidebar() {
  const { user, signOut, userRole } = useAuth();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setOpen(false);
  };

  const menuItems = [
    { name: 'Home', icon: <Home className="h-5 w-5" />, path: '/' },
    { name: 'Request Token', icon: <Plus className="h-5 w-5" />, path: '/request-token' },
    { name: 'Check Status', icon: <Clock className="h-5 w-5" />, path: '/queue-status' },
    { name: 'About Hospital', icon: <Info className="h-5 w-5" />, path: '/about' },
    { name: 'Contact Us', icon: <Phone className="h-5 w-5" />, path: '/contact' },
    { name: 'Book Appointment', icon: <Calendar className="h-5 w-5" />, path: '/appointments' },
    { name: 'Blog', icon: <FileText className="h-5 w-5" />, path: '/blog' },
    { name: 'News & Events', icon: <Newspaper className="h-5 w-5" />, path: '/news' },
    user ? null : { name: 'Login / Register', icon: <LogIn className="h-5 w-5" />, path: '/login' }
  ].filter(Boolean);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <SheetHeader className="border-b pb-4 mb-4">
          <SheetTitle className="text-xl font-semibold">Hospital Queue</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          <div className="flex-1">
            <nav className="flex flex-col space-y-1">
              {menuItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="justify-start"
                  asChild
                  onClick={() => setOpen(false)}
                >
                  <Link to={item.path}>
                    {item.icon}
                    <span className="ml-2">{item.name}</span>
                  </Link>
                </Button>
              ))}
            </nav>
          </div>
          
          <div className="mt-auto border-t pt-4">
            {user ? (
              <>
                <div className="flex items-center mb-2 px-3 py-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <div className="ml-2 text-sm font-medium truncate">
                    {user.email} ({userRole})
                  </div>
                </div>
                <Button 
                  variant="destructive" 
                  className="w-full justify-start mt-2"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-5 w-5" />
                  <span className="ml-2">Logout</span>
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
