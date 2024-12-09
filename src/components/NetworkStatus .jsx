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
            <div className='flex flex-col items-center justify-center  py-5 px-20 rounded mt-[-5rem]'>
                <span className='animate-pulse'> <WifiOff size={50} /></span>
                <p className='mt-1 tracking-wide'>No Internet</p>
            </div>
        </div>
    )
}


