import { NextRequest, NextResponse } from 'next/server';
import { CheckIn } from '@/types/checkIn';

// Mock database
let checkIns: CheckIn[] = [];

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const checkIn: CheckIn = await request.json();
    
    // Validate the check-in data
    if (!checkIn.id || !checkIn.timestamp || !checkIn.location) {
      return NextResponse.json(
        { error: 'Invalid check-in data' },
        { status: 400 }
      );
    }
    
    // Add to our mock database
    checkIns.push({
      ...checkIn,
      synced: true
    });
    
    // Log the check-in (in a real app, this would be saved to a database)
    console.log('Received check-in:', checkIn);
    
    // Return success response
    return NextResponse.json(
      { 
        message: 'Check-in received successfully',
        checkIn: {
          ...checkIn,
          synced: true
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing check-in:', error);
    
    return NextResponse.json(
      { error: 'Failed to process check-in' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return all check-ins
  return NextResponse.json({ checkIns }, { status: 200 });
}
