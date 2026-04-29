import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import ShowRating from '../../components/ShowRating.vue';

describe('ShowRating', () => {
  it('renders the numeric rating', () => {
    const wrapper = mount(ShowRating, {
      props: {
        rating: 8.7,
      },
    });

    expect(wrapper.text()).toContain('8.7');
  });

  it('renders a star icon image', () => {
    const wrapper = mount(ShowRating, {
      props: {
        rating: 10,
      },
    });

    const icon = wrapper.find('img');
    expect(icon.exists()).toBe(true);
    expect(icon.attributes('src')).toBeTruthy();
  });
});
