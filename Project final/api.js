//  api.js
import { supabase } from './supabaseClient';

//  Fetch Watchlist from Supabase
export const fetchWatchlist = async () => {
  const { data, error } = await supabase
    .from('watchlist')
    .select('*');

  if (error) {
    console.error("Error fetching watchlist:", error);
    return [];
  }

  return data;
};

// Add a Movie/Show to Watchlist
export const addToWatchlist = async (movie) => {
  const { data, error } = await supabase
    .from('watchlist')
    .insert([movie]);

  if (error) {
    console.error("Error adding to watchlist:", error);
    return null;
  }

  console.log("Added to Watchlist:", data);
  return data;
};

//  Remove from Watchlist
export const removeFromWatchlist = async (simkl_id) => {
  const { data, error } = await supabase
    .from('watchlist')
    .delete()
    .eq('simkl_id', simkl_id);

  if (error) {
    console.error("Error removing from watchlist:", error);
    return null;
  }

  console.log("Removed from Watchlist:", data);
  return data;
};
