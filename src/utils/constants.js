import { supabaseUrl } from "../services/supabase";

export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const BEARER_TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN;

export const IMAGE_URL = "https://image.tmdb.org/t/p/w";
export const IMAGE_WIDTH = "1280";

export const SCROLL_ITEM_WIDTH = 510;

// this will show 200 recommended shows, as they are fetched 40 per page
export const NUM_PAGES_INFINITE_SCROLL = 5;
// localStorage scroll KEY
export const LOCAL_STORAGE_SCROLL_Y_KEY = "infiniteScrollYPosition";

export const AVATAR_URL = `${supabaseUrl}/storage/v1/object/public/avatars//`;
export const PLACEHOLDER_AVATAR = `${supabaseUrl}/storage/v1/object/public/avatars//placeholder-image.jpg`;

export const ITEMS_PER_BOOKMARK_PAGE = 12;
