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
        <div className='absolute top-[25%] py-3 px-10 left-[50%] -translate-x-[50%] z-50 flex flex-col items-center bg-primary rounded'>
            <span className='animate-ping'> <WifiOff size={30} /></span>
            <h1 className='text-3xl tracking font-bold'>You Are Offline</h1>
            <p className='text-md'>Please Connect to the Internet</p>
        </div>
    )
}


