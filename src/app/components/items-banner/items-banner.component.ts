import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'items-banner',
  templateUrl: './items-banner.component.html',
  styleUrls: ['./items-banner.component.scss']
})
export class ItemsBannerComponent {
  @Input() items: Movie[] = [];
  @Input() title: string = '';
  page!:string;
  currentRoute!: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    if(this.currentRoute.includes('/movie'))
      this.page = 'MOVIES';
  else 
    if(this.currentRoute.includes('/shows'))
    this.page = 'TV SHOWS';
  else {
    this.page = '';
  }
  }


}
