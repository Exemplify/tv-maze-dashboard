import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '../App.vue';

const initialLoadShowsMock = vi.fn<() => void>();

vi.mock('../stores/showStore', () => ({
  useShowStore: () => ({
    initialLoadShows: initialLoadShowsMock,
  }),
}));

describe('App', () => {
  it('calls initialLoadShows during app setup', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          AppHeader: true,
          RouterView: true,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(initialLoadShowsMock).toHaveBeenCalledTimes(1);
  });
});
