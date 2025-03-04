'use client';

import { SignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();
  
  return (
    <div className="grid w-full grow items-center px-4 sm:justify-center">
      <SignUp 
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        redirectUrl="/dashboard"
        afterSignUpUrl="/dashboard"
      />
    </div>
  );
}