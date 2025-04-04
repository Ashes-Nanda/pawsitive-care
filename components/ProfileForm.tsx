"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormError } from "@/components/ui/form-error";
import { LoadingState } from "@/components/ui/loading-state";
import { userSchema, petSchema } from "@/lib/validations";
import { useResponsive, getResponsiveValue } from "@/lib/responsive";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "@/lib/firebase";
import { FcGoogle } from "react-icons/fc";

type FormData = {
  name: string;
  email: string;
  password: string;
  petName: string;
  species: string;
  breed: string;
  age: string;
  weight: string;
  medicalConditions: string;
  medications: string;
  allergies: string;
};

export default function ProfileForm() {
  const router = useRouter();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isMobile, isTablet } = useResponsive();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userSchema.merge(petSchema)),
  });

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error) {
      setError("Google Sign-In failed. Please try again.");
      console.error("Google Sign-In Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Here you would typically save the additional user data to your database
      console.log("User registered successfully:", data);
      router.push("/");
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error("Registration Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get responsive container width
  const containerWidth = getResponsiveValue({
    mobile: "w-full px-4",
    tablet: "w-3/4 mx-auto px-6",
    desktop: "w-1/2 mx-auto px-8",
    default: "w-full px-4"
  });

  // Get responsive grid columns
  const gridColumns = getResponsiveValue({
    mobile: "grid-cols-1",
    tablet: "grid-cols-2",
    desktop: "grid-cols-2",
    default: "grid-cols-1"
  });

  return (
    <div className={`container mx-auto p-6 ${containerWidth}`}>
      <h1 className={`font-bold text-emerald-400 mb-6 ${
        isMobile ? "text-2xl" : "text-3xl"
      }`}>Create Account</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-md">
          {error}
        </div>
      )}

      <Button 
        onClick={handleGoogleSignIn} 
        className="w-full mb-4 flex items-center justify-center gap-2 bg-white text-black border hover:bg-gray-100"
        disabled={isLoading}
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
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                {...register("name")}
                disabled={isLoading}
              />
              <FormError message={errors.name?.message} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                disabled={isLoading}
              />
              <FormError message={errors.email?.message} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                disabled={isLoading}
              />
              <FormError message={errors.password?.message} />
            </div>

            <CardHeader>
              <CardTitle>Pet Information</CardTitle>
            </CardHeader>

            <div className={`grid gap-4 ${gridColumns}`}>
              <div className="grid gap-2">
                <Label htmlFor="petName">Pet Name</Label>
                <Input
                  id="petName"
                  {...register("petName")}
                  disabled={isLoading}
                />
                <FormError message={errors.petName?.message} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="species">Species</Label>
                <Input
                  id="species"
                  {...register("species")}
                  disabled={isLoading}
                />
                <FormError message={errors.species?.message} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="breed">Breed</Label>
                <Input
                  id="breed"
                  {...register("breed")}
                  disabled={isLoading}
                />
                <FormError message={errors.breed?.message} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  {...register("age")}
                  disabled={isLoading}
                />
                <FormError message={errors.age?.message} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  {...register("weight")}
                  disabled={isLoading}
                />
                <FormError message={errors.weight?.message} />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Button 
                type="submit" 
                className="bg-emerald-500 text-white hover:bg-emerald-600"
                disabled={isLoading}
              >
                {isLoading ? <LoadingState size="sm" text="Creating account..." /> : "Create Account"}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.push("/signin")}
                disabled={isLoading}
              >
                Already have an account? Sign In
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
