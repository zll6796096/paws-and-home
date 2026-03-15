import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables from .env file
dotenv.config({ path: './server/.env' });

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️  Supabase variables (SUPABASE_URL, SUPABASE_ANON_KEY) are missing in server/.env');
}

export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

// API ROUTES

// Get all pets
app.get('/api/pets', async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase client not initialized' });

  try {
    const { data, error } = await supabase.from('pets').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching pets:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get pet by ID
app.get('/api/pets/:id', async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase client not initialized' });

  try {
    const { data, error } = await supabase
      .from('pets')
      .select('*')
      .eq('id', req.params.id)
      .single();
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching pet list:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Apply for pet adoption
app.post('/api/pets/:id/apply', async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase client not initialized' });

  try {
    const { data, error } = await supabase
      .from('pets')
      .update({ applied: true, applicationStatus: '审核中' })
      .eq('id', req.params.id)
      .select()
      .single();
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error applying for pet:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Cancel pet application
app.post('/api/pets/:id/cancel', async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase client not initialized' });

  try {
    const { data, error } = await supabase
      .from('pets')
      .update({ applied: false, applicationStatus: null })
      .eq('id', req.params.id)
      .select()
      .single();
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error canceling pet application:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
