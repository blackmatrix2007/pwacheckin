import { CheckIn } from '@/types/checkIn';

// Base URL for the API
const API_BASE_URL = '/api';

/**
 * Sends a check-in to the API
 */
export const sendCheckIn = async (checkIn: CheckIn): Promise<CheckIn> => {
  try {
    // Add artificial delay to simulate network latency (remove in production)
    if (process.env.NODE_ENV !== 'production') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate occasional network failures in development (10% chance)
      if (Math.random() < 0.1) {
        throw new Error('Network error');
      }
    }
    
    const response = await fetch(`${API_BASE_URL}/checkin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkIn),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send check-in');
    }
    
    const data = await response.json();
    console.log('API: Check-in sent successfully', data.checkIn);
    
    return data.checkIn;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

/**
 * Fetches check-ins from the API
 */
export const fetchCheckIns = async (): Promise<CheckIn[]> => {
  try {
    // Add artificial delay to simulate network latency (remove in production)
    if (process.env.NODE_ENV !== 'production') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate occasional network failures in development (10% chance)
      if (Math.random() < 0.1) {
        throw new Error('Network error');
      }
    }
    
    const response = await fetch(`${API_BASE_URL}/checkin`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch check-ins');
    }
    
    const data = await response.json();
    return data.checkIns;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};
