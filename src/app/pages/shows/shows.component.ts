import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Tv } from '../../models/tv';
import { ShowsService } from '../../services/shows.service';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.scss']
})
export class ShowsComponent implements OnInit {
  shows: Tv[] = [];
  popularShows: Tv[] = [];
  genreId: string | null = null;
  searchValue: string = '';
  private searchSubscription!: Subscription;


  constructor(private showsService: ShowsService, private route: ActivatedRoute) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.searchValue) {
      this.searchChanged();
    }
  }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getshowsByGenre(genreId, 1);
      } else {
        this.getPagedShows(1);
      }
    });

    this.searchSubscription = this.showsService.searchValue.subscribe(value => {
      this.searchValue = value;
      this.searchChanged();
    });

    this.showsService.getShows('top_rated').subscribe((shows) => {
      this.shows = shows;
      console.log(this.shows)
    });

    this.showsService.getTvs('latest').subscribe((shows) => {
      this.popularShows = shows;
      console.log(this.shows)
    });


  }

  getPagedShows(page: number, searchKeyword?: string) {
    this.showsService.searchShows(page, searchKeyword).subscribe((shows) => {
      this.shows = shows;
      console.log(this.shows);
    });
  }

  getshowsByGenre(genreId: string, page: number) {
    console.log(`Fetching genre ${genreId} page ${page}`);
    this.showsService.getShowsByGenre(genreId, page).subscribe((shows) => {
      this.shows = shows;
      console.log(this.shows);
    });
  }

  paginate(event: any) {
    const pageNumber = event.page + 1;
    console.log(`Paginating to page ${pageNumber}`);
    if (this.genreId) {
      console.log(`Genre ID: ${this.genreId}`);
      this.getshowsByGenre(this.genreId, pageNumber);
    } else {
      if (this.searchValue) {
        console.log(`Search value: ${this.searchValue}`);
        this.getPagedShows(pageNumber, this.searchValue);
      } else {
        this.getPagedShows(pageNumber);
      }
    }
    window.scrollTo(0, 0);
  }

  searchChanged() {
    if (this.searchValue) {
      this.getPagedShows(1, this.searchValue);
    }
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }




}
