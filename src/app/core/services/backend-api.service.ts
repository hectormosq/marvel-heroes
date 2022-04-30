import { Injectable } from '@angular/core';
import HeroesJson from '@assets/data/wikipedia_marvel_data.json';
import { Observable, of } from 'rxjs';
import { MarvelHero } from '../models/marvel-hero';

@Injectable({
  providedIn: 'root',
})
export class BackendApiService {
  constructor() {}

  getHeroes(): Observable<MarvelHero[]> {
    return of(HeroesJson);
  }
}
