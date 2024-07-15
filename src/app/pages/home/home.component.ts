import { ShowsService } from './../../services/shows.service';
import { Component, Input, OnChanges, SimpleChanges ,OnInit  } from '@angular/core';
import { Genre, Movie } from '../../models/movie';
import { Tv } from '../../models/tv';
import { MoviesService } from '../../services/movies.service';
import { IMAGES_SIZES } from '../../constants/images-sizes';

import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit , OnChanges {
  popularMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  popularTvShows: Tv[] = [];
  movies: Movie[] = [];
  moviesgenres: any[] = [];
  showsgenres: any[] = [];
  genreId: string | null = null;
  readonly imagesSizes = IMAGES_SIZES;
  responsiveOptions: any[]=[];
  searchValue: string = '';
  private searchSubscription!: Subscription;


  constructor(private moviesService: MoviesService , private ShowsService : ShowsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.searchValue) {
      this.searchChanged();
    }
  }




  ngOnInit(): void {
    this.moviesService.getMovies('popular').subscribe((movies) => {
      this.popularMovies = movies;
    });
    this.moviesService.getMovies('top_rated').subscribe((movies) => {
      this.topRatedMovies = movies.slice(0,12);
    });
    this.moviesService.getMovies('upcoming').subscribe((movies) => {
      this.upcomingMovies = movies;
    });
    this.ShowsService.getTvs('popular').subscribe((tvShows) => {
      this.popularTvShows = tvShows.slice(0,24);
    });

    this.moviesService.getMoviesGenres().subscribe((genresData) => {
      this.moviesgenres = genresData;
    });

    this.ShowsService.getShowsGenres().subscribe((genresData) => {
      this.showsgenres = genresData;
    });

    this.responsiveOptions = [
      {
          breakpoint: '1200px',
          numVisible: 4,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 3,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 2,
          numScroll: 1
      },
      {
        breakpoint: '550px',
        numVisible: 1,
        numScroll: 1
    }



  ];

  this.searchSubscription = this.moviesService.searchValue.subscribe(value => {
    this.searchValue = value;
    this.searchChanged();
  });


  }

  searchChanged() {
    if (this.searchValue) {
      this.getPagedMovies(1, this.searchValue);
    }
    console.log('Search value:', this.searchValue);
  }
  getPagedMovies(page: number, searchKeyword?: string) {
    this.moviesService.searchMovies(page, searchKeyword).subscribe((movies) => {
      this.movies = movies;
    });
  }

  

  paginate(event: any) {
    const pageNumber = event.page + 1;

    if (this.genreId) {
      this.getMoviesByGenre(this.genreId, pageNumber);
    } else {
      if (this.searchValue) {
        this.getPagedMovies(pageNumber, this.searchValue);
      } else {
        this.getPagedMovies(pageNumber);
      }
    }
  window.scrollTo(0, 0);
  }
  
    getMoviesByGenre(genreId: string, page: number) {
      this.moviesService.getMoviesByGenre(genreId, page).subscribe((movies) => {
        this.movies = movies;
      });
    }

    ngOnDestroy(): void {
      if (this.searchSubscription) {
        this.searchSubscription.unsubscribe();
      }
    }


  }


