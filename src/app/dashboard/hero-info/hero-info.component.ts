import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeroCardFields, MarvelHero } from '@app/core/models/marvel-hero';

@Component({
  selector: 'app-hero-info',
  templateUrl: './hero-info.component.html',
  styleUrls: ['./hero-info.component.scss'],
})
export class HeroInfoComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { hero: MarvelHero }) {}

  hero: MarvelHero = this.data.hero;
  heroCardFields = HeroCardFields;

  ngOnInit(): void {}
}
