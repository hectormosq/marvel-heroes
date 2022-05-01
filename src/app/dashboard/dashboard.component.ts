import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BaseComponent } from '@app/core/components/abstract/base/base.component';
import { HeroFilter, MarvelHero } from '@app/core/models/marvel-hero';
import { BackendApiService } from '../core/services/backend-api.service';
import { MatDialog } from '@angular/material/dialog';
import { HeroInfoComponent } from './hero-info/hero-info.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent extends BaseComponent implements OnInit {
  heroes: MarvelHero[] = [];
  filter: HeroFilter[] = [];

  constructor(
    private _backendApi: BackendApiService,
    private _dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    const heroesSub = this._backendApi
      .getHeroes()
      .subscribe((heroes) => (this.heroes = heroes));

    this._subscriptions.push(heroesSub);
  }

  onFilter(filter: HeroFilter[]) {
    this.filter = [...filter];
  }

  onShowHero(hero: MarvelHero) {
    const dialogRef = this._dialog.open(HeroInfoComponent, { data: { hero } });
  }
}
