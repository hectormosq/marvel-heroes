import { Injectable } from '@angular/core';
import HeroesJson from '@assets/data/wikipedia_marvel_data.json';
import { Observable, of } from 'rxjs';
import { MarvelHero } from '../models/marvel-hero';

@Injectable({
  providedIn: 'root',
})
export class BackendApiService {
  _heroes: MarvelHero[] = HeroesJson;
  constructor() {}

  getHeroes(): Observable<MarvelHero[]> {
    return of(this._heroes);
  }

  saveHero(hero: MarvelHero): Observable<MarvelHero> {
    this._heroes.unshift(hero);
    return of(hero);
  }
}
