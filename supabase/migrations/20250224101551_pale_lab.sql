/*
  # College Marketplace Database Schema

  1. Tables
    - users: User profiles and authentication
    - products: Product listings
    - categories: Product categories
    - messages: Chat messages between users
    - reviews: User reviews and ratings
    - wishlists: User wishlist items
    - requests: "Looking for" posts
    - reports: Reported listings/users
    - transactions: Payment and transaction records

  2. Security
    - Row Level Security enabled on all tables
    - Policies for data access control
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

