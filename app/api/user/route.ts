import { NextResponse } from 'next/server';
import { deleteUser } from '@/actions/deleteUser';

export async function DELETE(request: Request) {
  try {
    const { userId } = await request.json();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    const deletedUser = await deleteUser(userId);
    
    return NextResponse.json({ success: true, user: deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}