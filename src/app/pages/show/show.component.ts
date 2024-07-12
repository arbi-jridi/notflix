import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tv, ShowCredits, ShowImages, ShowVideo } from 'src/app/models/tv';
import { ShowsService } from '../../services/shows.service';
import { IMAGES_SIZES } from '../../constants/images-sizes';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit, OnDestroy {
  show: Tv | null = null;
  showVideos: ShowVideo[] = [];
  showImages: ShowImages | null = null;
  showCredits: ShowCredits | null = null;
  imagesSizes = IMAGES_SIZES;
  similarShows: Tv[] = [];

  constructor(private route: ActivatedRoute, private showsService: ShowsService) {}

  ngOnInit(): void {
    this.route.params.pipe().subscribe(({ id }) => {
      this.getShow(id);
      this.getShowVideos(id);
      this.geShowImages(id);
      this.getShowCredits(id);
      this.getShowSimilar(id);
    });
  }

  ngOnDestroy() {
    console.log('component destroyed');
  }

  getShow(id: string) {
    this.showsService.getShow(id).subscribe((Data) => {
      this.show = Data;
    });
  }

  getShowVideos(id: string) {
    this.showsService.getShowVideos(id).subscribe((VideosData) => {
      this.showVideos = VideosData;
    });
  }

  getShowSimilar(id: string) {
    this.showsService.getShowSimilar(id).subscribe((SimilarData) => {
      this.similarShows = SimilarData;
    });
  }

  geShowImages(id: string) {
    this.showsService.getShowImages(id).subscribe((ImagesData) => {
      this.showImages = ImagesData;
    });
  }

  getShowCredits(id: string) {
    this.showsService.getShowCredits(id).subscribe((CreditsData) => {
      this.showCredits = CreditsData;
    });
  }
}
