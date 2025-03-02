/**
 * Utilities for handling offline functionality
 */

/**
 * Check if the browser is currently online
 */
export const isOnline = (): boolean => {
  return typeof navigator !== 'undefined' && navigator.onLine;
};

/**
 * Add an event listener for when the browser goes online
 */
export const addOnlineListener = (callback: () => void): void => {
  if (typeof window !== 'undefined') {
    window.addEventListener('online', callback);
  }
};

/**
 * Add an event listener for when the browser goes offline
 */
export const addOfflineListener = (callback: () => void): void => {
  if (typeof window !== 'undefined') {
    window.addEventListener('offline', callback);
  }
};

/**
 * Remove an event listener for when the browser goes online
 */
export const removeOnlineListener = (callback: () => void): void => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('online', callback);
  }
};

/**
 * Remove an event listener for when the browser goes offline
 */
export const removeOfflineListener = (callback: () => void): void => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('offline', callback);
  }
};

/**
 * Save data to local storage
 */
export const saveToLocalStorage = <T>(key: string, data: T): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }
};

/**
 * Load data from local storage
 */
export const loadFromLocalStorage = <T>(key: string): T | null => {
  if (typeof window !== 'undefined') {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return null;
    }
  }
  return null;
};
