import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BaseComponent } from '@app/core/components/abstract/base/base.component';
import { MarvelHero } from '@app/core/models/marvel-hero';
import { BackendApiService } from '../core/services/backend-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent extends BaseComponent implements OnInit {
  heroes: MatTableDataSource<MarvelHero> = new MatTableDataSource<MarvelHero>(
    []
  );

  columnsToDisplay = [
    'nameLabel',
    'skillsLabel',
    'memberOfLabel',
    'occupationLabel',
    'genderLabel',
    'citizenshipLabel',
    'creatorLabel',
  ];

  constructor(private _backendApi: BackendApiService) {
    super();
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.heroes.sort = this.sort;
  }

  ngOnInit(): void {
    const heroesSub = this._backendApi
      .getHeroes()
      .subscribe((heroes) => this._handleHeroes(heroes));

    this._subscriptions.push(heroesSub);
  }

  private _handleHeroes(heroes: MarvelHero[]) {
    this.heroes.data = heroes;
  }
}
