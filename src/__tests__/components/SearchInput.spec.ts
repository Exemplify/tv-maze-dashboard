import { describe, expect, it, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import type { SearchResult } from '../../models';

const mockQuery = ref('');
const mockResults = ref<SearchResult[]>([]);

vi.mock('../../composables/useSearch', () => ({
  useSearch: () => ({
    query: mockQuery,
    results: mockResults,
    isLoading: ref(false),
  }),
}));

import SearchInput from '../../components/SearchInput.vue';

describe('SearchInput', () => {
  beforeEach(() => {
    mockQuery.value = '';
    mockResults.value = [];
  });

  it('renders search input and no results by default', () => {
    const wrapper = mount(SearchInput);

    const input = wrapper.find('input#search');
    expect(input.exists()).toBe(true);
    expect(wrapper.findAll('li')).toHaveLength(0);
  });

  it('renders search results from useSearch composable', () => {
    mockResults.value = [
      {
        score: 1,
        show: {
          id: 101,
          name: 'The Office',
        } as SearchResult['show'],
      },
      {
        score: 0.9,
        show: {
          id: 202,
          name: 'Breaking Bad',
        } as SearchResult['show'],
      },
    ];

    const wrapper = mount(SearchInput);

    const listItems = wrapper.findAll('li');
    expect(listItems).toHaveLength(2);
    expect(wrapper.text()).toContain('The Office');
    expect(wrapper.text()).toContain('Breaking Bad');
  });

  it('emits selected show id and clears the query on result click', async () => {
    mockQuery.value = 'office';
    mockResults.value = [
      {
        score: 1,
        show: {
          id: 101,
          name: 'The Office',
        } as SearchResult['show'],
      },
    ];

    const wrapper = mount(SearchInput);

    await wrapper.find('li').trigger('click');

    expect(wrapper.emitted('showSearched')).toEqual([[101]]);
    expect(mockQuery.value).toBe('');
  });
});
