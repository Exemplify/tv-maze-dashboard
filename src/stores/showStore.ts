import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getEpisodes, getShow, getShows } from '../services';
import type { Show } from '../models';
import { groupByGenre } from '../utils';

export const useShowStore = defineStore('showStore', () => {
  const shows = ref<Show[]>([]);
  const genres = ref<string[]>([]);
  const showsByGenre = ref<{ genre: string; shows: Show[] }[]>([]);
  const showDetails = ref();

  const initialLoadShows = async () => {
    const initialShows = await Promise.all([getShows(), getShows(1), getShows(2)]);
    shows.value = initialShows.flat();
    showsByGenre.value = groupByGenre(shows.value);
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
