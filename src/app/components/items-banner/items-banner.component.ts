import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { ShowsService } from './../../services/shows.service';

@Component({
  selector: 'items-banner',
  templateUrl: './items-banner.component.html',
  styleUrls: ['./items-banner.component.scss']
})
export class ItemsBannerComponent {
  @Input() items: Movie[] = [];
  @Input() title: string = '';
  page!:string;
  genreName:string='';
  currentRoute!: string;
  moviesgenres: any[] = [];
  showsgenres: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router,private moviesService: MoviesService , private ShowsService : ShowsService) {}

  ngOnInit(): void {

    this.pageName();
  

  this.moviesService.getMoviesGenres().subscribe((genresData) => {
    this.moviesgenres = genresData;
    this.handleGenres();
    console.log(this.genreName,this.moviesgenres)
  });

  this.ShowsService.getShowsGenres().subscribe((genresData) => {
    this.showsgenres = genresData;
    this.handleGenres();
    console.log(this.genreName,this.showsgenres)
  });
  }

  pageName(){
    this.currentRoute = this.router.url;
    if(this.currentRoute.includes('/movie')) {
      this.page = 'MOVIES';
    } else if (this.currentRoute.includes('/shows')) {
      this.page = 'TV SHOWS';
    } else {
      this.page = '';
      
    }
  }
  
  getGenreName(genres: any[]) {
    for (let genre of genres) {
      if (this.currentRoute.includes(genre.id)) {
        console.log(genre.name)
        return genre.name;
      }
    }
    return '';
  }

handleGenres() {
    if (this.moviesgenres.length > 0 && this.showsgenres.length > 0) {
        if (this.currentRoute.includes('/movie')) {
            this.genreName = this.getGenreName(this.moviesgenres);
        } else if (this.currentRoute.includes('/shows')) {
            this.genreName = this.getGenreName(this.showsgenres);
        }
        console.log(this.genreName);
    }
}



}
