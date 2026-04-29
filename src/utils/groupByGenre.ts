import type { Show } from '../models';

export const groupByGenre = (shows: Show[]) => {
  const genres = Array.from(
    shows.reduce((genreSet, show) => {
      show.genres.forEach((genre) => genreSet.add(genre));
      return genreSet;
    }, new Set<string>()),
  ).sort();

  return genres.map((genre) => ({
    genre,
    shows: shows
      .filter((show) => show.genres.includes(genre))
      .sort((a, b) => ((a?.rating?.average ?? 0) > (b?.rating?.average ?? 0) ? -1 : 1)),
  }));
};
