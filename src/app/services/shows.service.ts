import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie, MovieCredits, MovieDto, MovieImages, MovieVideoDto } from '../models/movie';
import { switchMap } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { ShowCredits, ShowImages, Tv, TvDto } from '../models/tv';
import { GenresDto } from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {
  baseUrl: string = 'https://api.themoviedb.org/3';
  apiKey: string = '97840b785f0c4dfdd75e0a6a6a1ee592';
  uri!:string

  private searchValueSubject = new BehaviorSubject<string>('');
     searchValue = this.searchValueSubject.asObservable();

  constructor(private http: HttpClient) {}

  getShows(type: string = 'upcoming', count: number = 24) {
    return this.http.get<MovieDto>(`${this.baseUrl}/tv/${type}?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.results.slice(0, count));
      })
    );
  }

  getShow(id: string) {
    return this.http.get<Tv>(`${this.baseUrl}/tv/${id}?api_key=${this.apiKey}`);
  }

  getShowVideos(id: string) {
    return this.http
      .get<MovieVideoDto>(`${this.baseUrl}/tv/${id}/videos?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  getShowsGenres() {
    return this.http.get<GenresDto>(`${this.baseUrl}/genre/tv/list?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.genres);
      })
    );
  }

  getShowsByGenre(genreId: string, pageNumber: number) {
    return this.http
      .get<TvDto>(
        `${this.baseUrl}/discover/tv?with_genres=${genreId}&page=${pageNumber}&api_key=${this.apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }



  getShowImages(id: string) {
    return this.http.get<ShowImages>(`${this.baseUrl}/tv/${id}/images?api_key=${this.apiKey}`);
  }

  getShowCredits(id: string) {
    return this.http.get<ShowCredits>(
      `${this.baseUrl}/tv/${id}/credits?api_key=${this.apiKey}`
    );
  }

  getShowSimilar(id: string) {
    return this.http
      .get<TvDto>(`${this.baseUrl}/tv/${id}/similar?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {

          return of(res.results.slice(0, 12));
        })
      );
  }

  
  searchShows(page: number, searchValue?: string) {
    
    const uri = searchValue ? '/search/tv' : '/tv/popular'; 
    console.log(uri)
    return this.http
      .get<TvDto>(
        `${this.baseUrl}${uri}?page=${page}&query=${searchValue}&api_key=${this.apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }


  setSearchValue(value: string) {
    this.searchValueSubject.next(value);
    console.log(value)
  }

  getTvs(type: string = 'latest') {
    return this.http.get<TvDto>(`${this.baseUrl}/tv/${type}?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        console.log(res)
        return of(res.results);
      })
    );
  }




}
