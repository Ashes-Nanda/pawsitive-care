'use client';

import Link from 'next/link'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PawPrint, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);

  const handleSignIn = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      router.push('/signin');
    }, 3000);
  };

  return (
    <>
      <div className="absolute top-0 right-0 p-6">
        <Button
          onClick={handleSignIn}
          className="bg-black text-white hover:bg-gray-800"
        >
          Sign In / Sign Up
        </Button>
      </div>

      <div className="container mx-auto p-6 h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-emerald-400 neon mb-10">Welcome to Pet Care Hub</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          <Link href="/pawsitive/dashboard" passHref>
            <Card className="hover:bg-zinc-800 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PawPrint className="mr-2" />
                  Pawsitive Care
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Manage your pet's health, vaccinations, and medical records.</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/tail-tracker/dashboard" passHref>
            <Card className="hover:bg-zinc-800 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2" />
                  TailTracker
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Track your pet's location, activity, and set up geofences.</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {showToast && (
        <div 
          className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-md shadow-lg z-50 flex items-center gap-2"
        >
          <span>Create an account to unlock all features!</span>
          <Button
            variant="link"
            className="text-white underline"
            onClick={() => router.push('/signup')}
          >
            Sign Up Now
          </Button>
        </div>
      )}
    </>
  );
}

