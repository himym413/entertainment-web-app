import {
  AVATAR_URL,
  ITEMS_PER_BOOKMARK_PAGE,
  PLACEHOLDER_AVATAR,
} from "../utils/constants";
import supabase from "./supabase";

export async function checkAndCreateProfile(id) {
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id);

  if (error) throw new Error(error);

  if (!profiles || profiles.length === 0) return createProfile(id);

  return profiles?.[0];
}

export async function createProfile(id) {
  const { data: profiles, error } = await supabase.from("profiles").insert([
    {
      id: id, // Must match auth.users UUID
      avatar_url: PLACEHOLDER_AVATAR,
      recommendations: true,
    },
  ]);

  if (error) {
    console.error("Error creating profile:", error.message);
    throw new Error(error.message);
  }

  return profiles?.[0];
}

export async function getCurrentProfile(id) {
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error);

  return profile;
}

// function for updating avatar url inside profiles table
export async function changeAvatarUrl(id, avatarUrl) {
  const { error } = await supabase
    .from("profiles")
    .update({ avatar_url: avatarUrl })
    .eq("id", id)
    .select();

  if (error) throw new Error(error);
}

// function for uploading avatar inside storage bucket
export async function uploadAvatar({ id, avatarFile }) {
  // id and date is used for making url more unique
  const url = `${id.slice(5, 10)}-${new Date().toLocaleString().replaceAll(".", "").replaceAll(" ", "")}-${avatarFile.name}`;
  const fullAvatarUrl = `${AVATAR_URL}${id.slice(5, 10)}-${new Date().toLocaleString().replaceAll(".", "").replaceAll(" ", "")}-${avatarFile.name}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(url, avatarFile, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw new Error(error);

  return fullAvatarUrl;
}

export async function updateRecommendations(id, recommendations) {
  const { data, error } = await supabase
    .from("profiles")
    .update({ recommendations })
    .eq("id", id)
    .select();

  if (error) throw new Error(error);
}

export async function updateBookmarks(userId, show) {
  // Get existing bookmarks
  const { data, error: fetchError } = await supabase
    .from("profiles")
    .select("bookmarks")
    .eq("id", userId)
    .single();

  if (fetchError) throw new Error(fetchError.message);

  let updatedBookmarks = data?.bookmarks || [];

  // Check if the bookmark already exists
  const existingIndex = updatedBookmarks.findIndex(
    (bookmark) => bookmark.id === show.id,
  );

  if (existingIndex !== -1) {
    // ✅ Remove bookmark if it exists
    updatedBookmarks = updatedBookmarks.filter(
      (bookmark) => bookmark.id !== show.id,
    );
  } else {
    // ✅ Add new bookmark
    updatedBookmarks.push(show);
  }

  // Update bookmarks column
  const { error } = await supabase
    .from("profiles")
    .update({ bookmarks: updatedBookmarks })
    .eq("id", userId);

  if (error) throw new Error(error.message);

  return updatedBookmarks;
}

export async function getBookmarks(page, query) {
  const startIndex = (Number(page) - 1) * ITEMS_PER_BOOKMARK_PAGE;
  const endIndex = startIndex + ITEMS_PER_BOOKMARK_PAGE;

  let { data: profiles, error } = await supabase
    .from("profiles")
    .select("bookmarks");

  if (error) throw new Error(error.message);

  let bookmarks = profiles.at(0).bookmarks;

  if (query)
    bookmarks = bookmarks.filter(
      (bookmark) =>
        bookmark.title?.toLowerCase().includes(query.toLowerCase()) ||
        bookmark.name?.toLowerCase().includes(query.toLowerCase()),
    );

  return {
    page,
    results: bookmarks.slice(startIndex, endIndex),
    total_pages: Math.ceil(bookmarks.length / ITEMS_PER_BOOKMARK_PAGE),
    total_results: bookmarks.length,
  };
}
