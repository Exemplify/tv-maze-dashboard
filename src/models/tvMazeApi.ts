export interface Show {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string | null;
  genres: string[];
  status: string;
  runtime: number | null;
  averageRuntime: number | null;
  rating: {
    average: number | null;
  };
  image: {
    medium: string;
    original: string;
  } | null;
}

export interface Episode {
  id: number;
  season: number;
}

export interface SearchResult {
  score: number;
  show: Show;
}
