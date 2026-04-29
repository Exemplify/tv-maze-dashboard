import { API_BASE_URL } from '../config';
import type { Episode, SearchResult, Show } from '../models';

export const request = async <T>(
  url: URL,
  searchParams?: Record<string, string>,
  options: RequestInit = { method: 'GET' },
): Promise<T> => {
  if (searchParams !== undefined) {
    Object.entries(searchParams).forEach(([key, value]) => url.searchParams.set(key, value));
  }
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json() as Promise<T>;
};

export const getShows = async (page: number = 0): Promise<Show[]> => {
  const showIndexURL = new URL(`${API_BASE_URL}/shows`);
  return request<Show[]>(showIndexURL, { page: page.toString() });
};

export const getEpisodes = async (showId: number): Promise<Episode[]> => {
  const episodeUrl = new URL(`${API_BASE_URL}/shows/${showId}/episodes`);
  return request<Episode[]>(episodeUrl);
};

export const getShowSearch = async (query: string): Promise<SearchResult[]> => {
  const showSearchURL = new URL(`${API_BASE_URL}/search/shows`);
  return request<SearchResult[]>(showSearchURL, { q: query });
};
export const getShow = async (showId: number = 0): Promise<Show[]> => {
  const showIndexURL = new URL(`${API_BASE_URL}/shows/${showId}`);
  return request<Show[]>(showIndexURL);
};
