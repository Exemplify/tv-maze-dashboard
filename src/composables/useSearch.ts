import { ref, watch } from 'vue';
import { getShowSearch } from '../services';
import type { SearchResult } from '../models';
import { DEBOUNCE_TIME, MIN_QUERY_LENGTH } from '../config';

export const useSearch = () => {
  const query = ref('');
  const results = ref<SearchResult[]>([]);
  const isLoading = ref(false);

  let debounceTimer: ReturnType<typeof setTimeout>;

  watch(query, async (newQuery) => {
    clearTimeout(debounceTimer);

    if (!newQuery.trim() || newQuery.length < MIN_QUERY_LENGTH) {
      results.value = [];
      return;
    }

    debounceTimer = setTimeout(async () => {
      isLoading.value = true;
      try {
        results.value = await getShowSearch(newQuery);
      } finally {
        isLoading.value = false;
      }
    }, DEBOUNCE_TIME);
  });

  return { query, results, isLoading };
};
