
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Navigation } from '@/components/Navigation';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const Login = () => {
  const { signIn, signUp, configError } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signIn(email, password);
      if (error) throw error;
      
      toast({
        title: "Success!",
        description: "You have been logged in successfully.",
      });
      
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent, role: 'patient' | 'admin') => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signUp(email, password, role);
      if (error) throw error;
      
      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      });
      
      // Stay on login page after sign up to allow login
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[80vh]">
        {configError && (
          <Alert variant="destructive" className="mb-6 max-w-md">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Configuration Error</AlertTitle>
            <AlertDescription>
              Supabase connection is not properly configured. 
              Please add your Supabase URL and anon key to your environment variables.
            </AlertDescription>
          </Alert>
        )}
        
        <Card className="w-full max-w-md">
          <Tabs defaultValue="login">
            <CardHeader>
              <CardTitle className="text-2xl text-center mb-2">Hospital Queue System</CardTitle>
              <CardDescription className="text-center">Manage your appointments efficiently</CardDescription>
              <TabsList className="grid w-full grid-cols-2 mt-4">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent>
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Input 
                      type="email" 
                      placeholder="Email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                      disabled={configError}
                    />
                  </div>
                  <div className="space-y-2">
                    <Input 
                      type="password" 
                      placeholder="Password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      required 
                      disabled={configError}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading || configError}
                  >
                    {isLoading ? "Loading..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Input 
                      type="email" 
                      placeholder="Email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                      disabled={configError}
                    />
                  </div>
                  <div className="space-y-2">
                    <Input 
                      type="password" 
                      placeholder="Password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      required 
                      disabled={configError}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      onClick={(e) => handleSignUp(e, 'patient')} 
                      className="w-full" 
                      disabled={isLoading || configError}
                    >
                      Register as Patient
                    </Button>
                    <Button 
                      onClick={(e) => handleSignUp(e, 'admin')} 
                      className="w-full"
                      disabled={isLoading || configError}
                    >
                      Register as Admin
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </CardContent>

            <CardFooter className="flex justify-center">
              <p className="text-xs text-gray-500">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </p>
            </CardFooter>
          </Tabs>
        </Card>
      </div>
    </>
  );
};

export default Login;
