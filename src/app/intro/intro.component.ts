import { Component, OnInit } from '@angular/core';
import gsap from 'gsap';



@Component({
  selector: 'intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const tl: gsap.core.Timeline = gsap.timeline({ defaults: { ease: "power1.out" } });
    tl.to(".intro-text", { y: "0%", duration: 2.5 });
    tl.to(".slider", { y: "-100%", duration: 1.5, delay: 0.1 });
    tl.to(".intro", { y: "-100%", duration: 1 }, "-=1");


  }






}
