import { getShows, request } from '../../services/requests';

const mockFetch = vi.fn<() => void>();
vi.stubGlobal('fetch', mockFetch);

const TEST_URL = 'https://testurl.com';

describe('requests service', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe('request', () => {
    it('throws an error if response is not ok', async () => {
      mockFetch.mockResolvedValue({ ok: false, status: 404 });
      const testURL = new URL(TEST_URL);

      await expect(request(testURL)).rejects.toThrow('HTTP error! Status: 404');
      expect(mockFetch).toHaveBeenCalledWith(testURL, { method: 'GET' });
    });

    it('adds query params', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: vi.fn<() => void>(),
      });
      const testURL = new URL(TEST_URL);

      await request<{ id: number }[]>(testURL, { page: '1' });

      expect(testURL.toString()).toBe(`${TEST_URL}/?page=1`);
    });

    it('returns the parsed json', async () => {
      const testURL = new URL(TEST_URL);
      const mockResponse = { id: 0, state: 'use' };
      mockFetch.mockResolvedValue({
        ok: true,
        json: vi.fn<() => void>().mockResolvedValue(mockResponse),
      });
      const response = await request(testURL);
      expect(response).toEqual(mockResponse);
    });
  });
});
