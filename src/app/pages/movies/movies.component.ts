import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit , OnChanges{
  movies: Movie[] = [];
  popularMovies: Movie[] = [];
  genreId: string | null = null;
  searchValue: string = '';
  private searchSubscription!: Subscription;


  constructor(private moviesService: MoviesService, private route: ActivatedRoute) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.searchValue) {
      this.searchChanged();
      this.paginate(event);
    }
  }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getMoviesByGenre(genreId, 1);
      } else {
        this.getPagedMovies(1);
      }
    });

    this.searchSubscription = this.moviesService.searchValue.subscribe(value => {
      this.searchValue = value;
      this.searchChanged();
    });

    this.moviesService.getMovies('popular').subscribe((movies) => {
      this.movies = movies;
      console.log(movies)
    });

  }

  getPagedMovies(page: number, searchKeyword?: string) {
    this.moviesService.searchMovies(page, searchKeyword).subscribe((movies) => {
      this.movies = movies;
    });
  }

  getMoviesByGenre(genreId: string, page: number) {
    this.moviesService.getMoviesByGenre(genreId, page).subscribe((movies) => {
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
  }

  searchChanged() {
    if (this.searchValue) {
      this.getPagedMovies(1, this.searchValue);
    }
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }




}
