import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getParticipants() {
  const { data, error } = await supabase
    .from('participants')
    .select('*')
    .order('totalScore', { ascending: false });

  if (error) {
    console.error('Error fetching participants:', error);
    return [];
  }

  return data;
}

export async function addParticipant(participant: {
  name: string;
  leetcode: string;
  codeforces: string;
  codechef: string;
}) {
  const { data, error } = await supabase
    .from('participants')
    .insert([{
      ...participant,
      leetcodeRating: 0,
      leetcodeSolved: 0,
      codeforcesRating: 0,
      codeforcesSolved: 0,
      codechefRating: 0,
      codechefSolved: 0,
      totalScore: 0,
      rank: 0,
      avatar: '/team/noimage.jpg',
      lastUpdated: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) {
    console.error('Error adding participant:', error);
    throw error;
  }

  return data;
}

export async function updateParticipantStats(id: string, stats: {
  leetcodeRating?: number;
  leetcodeSolved?: number;
  codeforcesRating?: number;
  codeforcesSolved?: number;
  codechefRating?: number;
  codechefSolved?: number;
  totalScore?: number;
}) {
  const { data, error } = await supabase
    .from('participants')
    .update({
      ...stats,
      lastUpdated: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating participant stats:', error);
    throw error;
  }

  return data;
}