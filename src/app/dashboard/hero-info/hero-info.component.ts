import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MarvelHero } from '@app/core/models/marvel-hero';

@Component({
  selector: 'app-hero-info',
  templateUrl: './hero-info.component.html',
  styleUrls: ['./hero-info.component.scss'],
})
export class HeroInfoComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { hero: MarvelHero }) {}

  ngOnInit(): void {
    console.log('dialog', this.data.hero);
  }
}
