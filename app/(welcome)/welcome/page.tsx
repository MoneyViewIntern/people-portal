'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthContext } from "@/context/auth-context";


const WelcomePage = () => {
  const router = useRouter();
  const { currentUser } = useAuthContext(); // Access currentUser from the auth context
  console.log(currentUser)

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      if (currentUser) {
        router.push(`/user/${currentUser}`);
      } else {
        // Redirect to login or another page if currentUser is not available
        router.push('/login');
      }
    }, 2000);

    return () => clearTimeout(redirectTimer);
  }, [router, currentUser]);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ marginBottom: '4rem', textAlign: 'center', flex: '1', marginTop: '19rem' }}>
        <h1 className="font-bold  text-4xl md:text-5xl">Hello {currentUser}, welcome back!</h1>
        <p className="text-lg md:text-xl text-green-300 text-gray-600 mt-2">It's great to have you here.</p>
      </div>
      <div style={{ width: '100%', height: 'auto', textAlign: 'center' }}>
        <img src="/images/waves.gif" alt="Me" className='-hue-rotate-79' style={{ width: '100%', height: 'auto', maxHeight: 'calc(100vh - 200px)' }} />
      </div>
    </div>
  );
}

export default WelcomePage;
