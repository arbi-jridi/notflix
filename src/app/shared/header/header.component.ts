import { ShowsService } from './../../services/shows.service';


import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { MoviesService } from '../../services/movies.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router ,private moviesService:MoviesService , private showsService:ShowsService) { }

  items: MenuItem[] =[];
  searchValue: string = '';
    ngOnInit() {
        this.items = [

            {
                label: 'Movies',
                icon: 'pi pi-video',
                command: () => {
                    this.router.navigate(['/movies']);
                },
            },
            {
                label: 'Tv Shows',
                icon: 'pi pi-desktop',
                command: () => {
                    this.router.navigate(['/shows']);
                }
            },
           
            {
                label: 'About',
                icon: 'pi pi-info-circle',
                command: () => {
                    Swal.fire({
                        icon: "info",
                        title: "Notflix",
                        text: "a Netflix clone App made with Angular & TMDB",
                        footer: 'source Code : <a href="https://github.com/arbi-jridi/notflix">notflix</a>'
                      });;
                }
            }
        ]
    }

    searchChanged(){
        this.moviesService.setSearchValue(this.searchValue)
        this.showsService.setSearchValue(this.searchValue)
        console.log(this.searchValue)
    }

    isActive(route: string): boolean {
        return this.router.isActive(route, true);
      }
}


