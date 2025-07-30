import { NextResponse } from 'next/server';
import { deleteUser } from '@/actions/deleteUser';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with service role key for admin privileges
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function DELETE(request: Request) {
  try {
    const { userId } = await request.json();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // First try to delete the Prisma user record
    try {
      const deletedUser = await deleteUser(userId);
      console.log('Successfully deleted Prisma user record:', deletedUser.id);
    } catch (prismaError) {
      console.error('Prisma user deletion error:', prismaError);
      // Continue with auth deletion even if Prisma deletion fails
    }
    
    // Then delete Supabase Auth user
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (authError) {
      console.error('Supabase auth deletion error:', authError);
      return NextResponse.json(
        { error: 'Failed to delete auth user: ' + authError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}