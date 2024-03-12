'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthContext } from "@/context/auth-context"; // Adjusted import

const WelcomePage = () => {
  const router = useRouter();
  const { currentUser } = useAuthContext(); // Access currentUser from the auth context

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      if (currentUser) {
        router.push(`/user/${currentUser}`);
      } else {
        // Redirect to login or another page if currentUser is not available
        router.push('/login');
      }
    }, 3000);

    return () => clearTimeout(redirectTimer);
  }, [router, currentUser]);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
      <h1 className="font-bold text-4xl md:text-5xl">Hello Jay, welcome back!</h1>
      <p className="text-lg md:text-xl text-gray-600 mt-2">It's great to have you here.</p>
    </div>
    <div>
      <img src="/images/waves.gif" alt="Me" width="600" height="auto" />
    </div>
  </div>

  );
}

export default WelcomePage;
