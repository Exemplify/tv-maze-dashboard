import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getEpisodes, getShow, getShows } from '../services';
import type { Show } from '../models';

export const useShowStore = defineStore('showStore', () => {
  const shows = ref<Show[]>([]);
  const genres = ref<string[]>([]);
  const showsByGenre = ref<{ genre: string; shows: Show[] }[]>([]);
  const showDetails = ref();

  const initialLoadShows = async () => {
    const initialShows = await Promise.all([getShows(), getShows(1), getShows(2)]);
    shows.value = initialShows.flat();

    genres.value = Array.from(
      shows.value.reduce((genreSet, show) => {
        show.genres.forEach((genre) => genreSet.add(genre));
        return genreSet;
      }, new Set()),
    ).sort() as string[];

    showsByGenre.value = genres.value.map((genre) => {
      const showsWithGenre = shows.value.filter((show) => {
        return show.genres.includes(genre);
      });
      return {
        genre,
        shows: showsWithGenre.sort((showA, showB) =>
          (showA?.rating?.average ?? 0) > (showB?.rating?.average ?? 0) ? -1 : 1,
        ),
      };
    });
  };

  const loadShowDetails = async (showId: number) => {
    const show = await getShow(showId);
    const episodeDetails = await getEpisodes(showId);
    showDetails.value = {
      ...show,
      seasons: episodeDetails[episodeDetails.length - 1]?.season ?? 0,
      episodes: episodeDetails.length,
    };
  };

  return { shows, genres, showsByGenre, showDetails, initialLoadShows, loadShowDetails };
});
