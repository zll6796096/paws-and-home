-- Supabase init.sql
-- Run this in your Supabase SQL Editor to create the pets table

CREATE TABLE IF NOT EXISTS public.pets (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    age TEXT NOT NULL,
    gender TEXT NOT NULL,
    distance TEXT NOT NULL,
    tag TEXT NOT NULL,
    "tagColor" TEXT NOT NULL,
    image TEXT NOT NULL,
    breed TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    applied BOOLEAN DEFAULT false,
    "applicationStatus" TEXT
);

-- Set up Row Level Security (RLS)
-- For development purposes, we can allow public read/write, or use service role for the backend.
-- The following policies allow open access (read/write) which is useful for testing. 
-- In production, you would want to restrict these.

ALTER TABLE public.pets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON public.pets
    FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON public.pets
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON public.pets
    FOR UPDATE USING (true);

CREATE POLICY "Enable delete access for all users" ON public.pets
    FOR DELETE USING (true);
