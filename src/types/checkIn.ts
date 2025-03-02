/**
 * Represents a check-in record
 */
export interface CheckIn {
  /**
   * Unique identifier for the check-in
   */
  id: string;
  
  /**
   * Timestamp of when the check-in occurred (in milliseconds)
   */
  timestamp: number;
  
  /**
   * Location where the check-in occurred
   */
  location: string;
  
  /**
   * Whether the check-in has been synced with the server
   */
  synced: boolean;
}
