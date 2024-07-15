import { Movie, MovieDto } from './movie';

export interface Tv extends Movie {
  name: string;
  first_air_date: string;
}

export interface TvDto extends MovieDto {
  page: number;
  results: Tv[];
  total_results: number;
  total_pages: number;
}

export interface ShowImages {
  backdrops: {
    file_path: string;
  }[];
}

export interface ShowCredits {
  cast: {
    name: string;
    profile_path: string;
  }[];
}

export interface ShowVideoDto {
  id: number;
  results: ShowVideo[];
}

export interface ShowVideo {
  site: string;
  key: string;
}

export interface Genre {
  id: number;
  name: string;
}