import { WifiOff } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function NetworkStatus() {

    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [navigator.onLine]);


    if (!isOnline) return (
        <div className='h-screen w-full flex items-center justify-center fixed top-0 z-50 backdrop-blur-sm pointer-events-none'>
            <div className=' py-5 px-20 shadow-lg flex flex-col items-center bg-white/90 rounded mt-[-5rem]'>
                <span className='animate-pulse text-black'> <WifiOff size={30} /></span>
                <h1 className='text-3xl tracking font-bold text-black'>You Are Offline</h1>
                <p className='text-md text-black'>Please Connect to the Internet</p>
            </div>
        </div>
    )
}


