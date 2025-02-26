'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";

export default function SignInPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Set user as logged in (in a real app, this would be handled by authentication)
    localStorage.setItem('isLoggedIn', 'true');
    // Redirect to home page
    router.push('/');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">Sign In</h1>
      
      <Button 
        onClick={() => {
          localStorage.setItem('isLoggedIn', 'true');
          router.push('/');
        }}
        className="w-full mb-4 flex items-center justify-center gap-2 bg-white text-black border hover:bg-gray-100"
      >
        <FcGoogle className="w-5 h-5" />
        Continue with Google
      </Button>

      <div className="relative mb-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">Or continue with email</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            <div className="flex flex-col gap-4">
              <Button type="submit" className="bg-emerald-500 text-white hover:bg-emerald-600">
                Sign In
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => router.push('/signup')}
              >
                Don't have an account? Sign Up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 