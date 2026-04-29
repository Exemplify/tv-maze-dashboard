import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import ShowCard from '../../components/ShowCard.vue';
import type { Show } from '../../models';

const mockShow: Show = {
  id: 1,
  url: 'https://example.com/show/1',
  name: 'My Test Show',
  type: 'Scripted',
  language: 'English',
  genres: ['Drama'],
  status: 'Running',
  runtime: 45,
  averageRuntime: 45,
  rating: {
    average: 9.1,
  },
  image: {
    medium: 'https://example.com/poster-medium.jpg',
    original: 'https://example.com/poster-original.jpg',
  },
};

describe('ShowCard', () => {
  it('renders show name and rating', () => {
    const wrapper = mount(ShowCard, {
      props: {
        show: mockShow,
      },
    });

    expect(wrapper.text()).toContain('My Test Show');
    expect(wrapper.text()).toContain('9.1');
  });

  it('renders poster image attributes from the show data', () => {
    const wrapper = mount(ShowCard, {
      props: {
        show: mockShow,
      },
    });

    const image = wrapper.find('img[title="My Test Show"]');

    expect(image.exists()).toBe(true);
    expect(image.attributes('src')).toBe('https://example.com/poster-medium.jpg');
    expect(image.attributes('title')).toBe('My Test Show');
  });
});
