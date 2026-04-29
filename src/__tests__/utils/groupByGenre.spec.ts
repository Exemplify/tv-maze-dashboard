import { describe, it, expect } from 'vitest';
import { groupByGenre } from '../../utils/groupByGenre';
import type { Show } from '../models';

const mockShows: Show[] = [
  {
    id: 1,
    name: 'Show A',
    genres: ['Drama', 'Comedy'],
    rating: { average: 8.5 },
    language: 'English',
    status: 'Running',
    averageRuntime: 30,
    premiered: '2020-01-01',
  },
  {
    id: 2,
    name: 'Show B',
    genres: ['Drama'],
    rating: { average: 9.2 },
    language: 'English',
    status: 'Ended',
    averageRuntime: 60,
    premiered: '2018-01-01',
    ended: '2022-01-01',
  },
  {
    id: 3,
    name: 'Show C',
    genres: ['Comedy'],
    rating: { average: null },
    language: 'English',
    status: 'Running',
    averageRuntime: 30,
    premiered: '2021-01-01',
  },
];

describe('groupByGenre', () => {
  it('should group shows by genre', () => {
    const result = groupByGenre(mockShows);
    const genres = result.map((g) => g.genre);
    expect(genres).toContain('Drama');
    expect(genres).toContain('Comedy');
  });

  it('should sort shows by rating descending within each genre', () => {
    const result = groupByGenre(mockShows);
    const drama = result.find((g) => g.genre === 'Drama');
    expect(drama?.shows[0].id).toBe(2);
    expect(drama?.shows[1].id).toBe(1);
  });

  it('should handle null ratings by sorting them to the bottom', () => {
    const result = groupByGenre(mockShows);
    const comedy = result.find((g) => g.genre === 'Comedy');
    expect(comedy?.shows[0].id).toBe(1);
    expect(comedy?.shows[1].id).toBe(3);
  });

  it('should sort genres alphabetically', () => {
    const result = groupByGenre(mockShows);
    const genres = result.map((g) => g.genre);
    expect(genres).toEqual(['Comedy', 'Drama']);
  });
});
