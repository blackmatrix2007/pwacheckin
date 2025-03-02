'use client';

import { useState, useEffect, useCallback } from 'react';
import { CheckIn } from '@/types/checkIn';
import { sendCheckIn } from '@/services/api';

export default function Home() {
  const [isOnline, setIsOnline] = useState(true);
  const [location, setLocation] = useState('');
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState('');

  // Function to sync a single check-in with the API
  const syncCheckInWithApi = async (checkIn: CheckIn): Promise<CheckIn> => {
    try {
      const syncedCheckIn = await sendCheckIn(checkIn);
      return syncedCheckIn;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  };

  // Function to sync all unsynced check-ins
  const syncCheckIns = useCallback(async () => {
    if (!isOnline) return;

    const unsyncedCheckIns = checkIns.filter(checkIn => !checkIn.synced);
    if (unsyncedCheckIns.length === 0) return;

    setSyncStatus(`Syncing ${unsyncedCheckIns.length} check-ins...`);

    for (const checkIn of unsyncedCheckIns) {
      try {
        const syncedCheckIn = await syncCheckInWithApi(checkIn);
        
        // Mark as synced
        setCheckIns(prevCheckIns => 
          prevCheckIns.map(c => 
            c.id === checkIn.id ? syncedCheckIn : c
          )
        );
        
        setSyncStatus(`Synced ${checkIn.location}`);
      } catch (error) {
        console.error('Failed to sync check-in:', error);
        setSyncStatus(`Failed to sync some check-ins`);
      }
    }

    // Clear status after a delay
    setTimeout(() => setSyncStatus(''), 3000);
  }, [checkIns, isOnline, setSyncStatus]);

  // Check online status
  useEffect(() => {
    // Set initial online status
    setIsOnline(navigator.onLine);

    // Add event listeners for online/offline status
    const handleOnline = () => {
      setIsOnline(true);
      syncCheckIns();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load check-ins from local storage
    const storedCheckIns = localStorage.getItem('checkIns');
    if (storedCheckIns) {
      setCheckIns(JSON.parse(storedCheckIns));
    }

    // Clean up event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [syncCheckIns]);

  // Save check-ins to local storage whenever they change
  useEffect(() => {
    if (checkIns.length > 0) {
      localStorage.setItem('checkIns', JSON.stringify(checkIns));
    }
  }, [checkIns]);

  // Function to handle check-in
  const handleCheckIn = async () => {
    if (!location.trim()) {
      alert('Please enter a location');
      return;
    }

    setIsLoading(true);

    // Create a new check-in
    const newCheckIn: CheckIn = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      location: location.trim(),
      synced: false
    };

    // Add to local state
    setCheckIns(prevCheckIns => [newCheckIn, ...prevCheckIns]);
    
    // Try to sync with API
    try {
      const syncedCheckIn = await syncCheckInWithApi(newCheckIn);
      
      // Mark as synced if successful
      setCheckIns(prevCheckIns => 
        prevCheckIns.map(checkIn => 
          checkIn.id === newCheckIn.id 
            ? { ...syncedCheckIn } 
            : checkIn
        )
      );
    } catch (error) {
      console.error('Failed to sync check-in:', error);
      setSyncStatus('Failed to sync check-in. Will retry when online.');
      
      // Clear status after a delay
      setTimeout(() => setSyncStatus(''), 3000);
    }

    setLocation('');
    setIsLoading(false);
  };


  // Format date for display
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="min-h-screen p-4 max-w-md mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">PWA Check-in App</h1>
        <div className="flex items-center justify-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <p className="text-sm">{isOnline ? 'Online' : 'Offline'}</p>
        </div>
        {syncStatus && (
          <p className="text-sm text-blue-500 mt-1">{syncStatus}</p>
        )}
      </header>

      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">New Check-in</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            className="flex-1 border rounded p-2"
          />
          <button
            onClick={handleCheckIn}
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isLoading ? 'Checking in...' : 'Check In'}
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Check-in History</h2>
        {checkIns.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No check-ins yet</p>
        ) : (
          <ul className="divide-y">
            {checkIns.map((checkIn) => (
              <li key={checkIn.id} className="py-3">
                <p className="font-medium">{checkIn.location}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{formatDate(checkIn.timestamp)}</span>
                  <span className={checkIn.synced ? 'text-green-500' : 'text-orange-500'}>
                    {checkIn.synced ? 'Synced' : 'Not synced'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
