import { NextResponse } from 'next/server';
import { deleteUser } from '@/actions/deleteUser';
import { supabase } from '@/lib/supabase';

export async function DELETE(request: Request) {
  try {
    const { userId } = await request.json();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // First delete Supabase Auth user
const { error: authError } = await supabase.auth.admin.deleteUser(userId);

if (authError) {
  console.error('Supabase auth deletion error:', authError);
  return NextResponse.json(
    { error: 'Failed to delete auth user' },
    { status: 500 }
  );
}

// Then delete Prisma user record
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