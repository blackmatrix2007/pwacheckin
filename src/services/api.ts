import { CheckIn } from '@/types/checkIn';

// Storage key for check-ins
const STORAGE_KEY = 'pwa_checkins';

/**
 * Sends a check-in to the "API" (localStorage in this case for GitHub Pages)
 */
export const sendCheckIn = async (checkIn: CheckIn): Promise<CheckIn> => {
  try {
    // Add artificial delay to simulate network latency
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate occasional network failures (10% chance)
    if (Math.random() < 0.1) {
      throw new Error('Network error');
    }
    
    // Get existing check-ins from localStorage
    const existingCheckIns = getCheckInsFromStorage();
    
    // Add the new check-in with synced status
    const syncedCheckIn = { ...checkIn, synced: true };
    
    // Save to localStorage
    saveCheckInsToStorage([syncedCheckIn, ...existingCheckIns]);
    
    console.log('API: Check-in saved successfully', syncedCheckIn);
    
    return syncedCheckIn;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

/**
 * Fetches check-ins from the "API" (localStorage in this case for GitHub Pages)
 */
export const fetchCheckIns = async (): Promise<CheckIn[]> => {
  try {
    // Add artificial delay to simulate network latency
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate occasional network failures (10% chance)
    if (Math.random() < 0.1) {
      throw new Error('Network error');
    }
    
    // Get check-ins from localStorage
    const checkIns = getCheckInsFromStorage();
    
    return checkIns;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

/**
 * Helper function to get check-ins from localStorage
 */
const getCheckInsFromStorage = (): CheckIn[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  
  try {
    const storedCheckIns = localStorage.getItem(STORAGE_KEY);
    return storedCheckIns ? JSON.parse(storedCheckIns) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

/**
 * Helper function to save check-ins to localStorage
 */
const saveCheckInsToStorage = (checkIns: CheckIn[]): void => {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checkIns));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};
