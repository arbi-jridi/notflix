import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { IMAGES_SIZES } from '../../constants/images-sizes';
import { Tv } from 'src/app/models/tv';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() itemData:  Tv | null = null;

  imagesSizes = IMAGES_SIZES;
  currentRoute!: string;


  constructor(private route: ActivatedRoute, private router: Router ) {}

  ngOnInit(): void {
    this.currentRoute = this.router.url;

  }
}