import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HeroFilter, MarvelHero } from '@app/core/models/marvel-hero';

@Component({
  selector: 'app-hero-table',
  templateUrl: './hero-table.component.html',
  styleUrls: ['./hero-table.component.scss'],
})
export class HeroTableComponent implements OnChanges, OnInit {
  @Input() filter: HeroFilter[];
  @Input() heroes: MarvelHero[];

  @Output() showHero = new EventEmitter();

  heroesDataSource: MatTableDataSource<MarvelHero> =
    new MatTableDataSource<MarvelHero>();

  columnsToDisplay = [
    'nameLabel',
    'skillsLabel',
    'memberOfLabel',
    'occupationLabel',
    'genderLabel',
    'citizenshipLabel',
    'creatorLabel',
  ];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log({ changes });
    if (changes['filter']) {
      this.heroesDataSource.filter = JSON.stringify(this.filter);
    }

    if (changes['heroes']) {
      this.heroesDataSource.data = this.heroes;
    }
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.heroesDataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this._handleHeroes();
    this._configureFilter();
  }

  onClickHero(hero: MarvelHero) {
    this.showHero.emit(hero);
  }

  private _handleHeroes() {
    this.heroesDataSource.data = this.heroes;
  }

  private _configureFilter() {
    this.heroesDataSource.filterPredicate = function (record, filter) {
      const mappedFilter = JSON.parse(filter);

      if (mappedFilter.length) {
        const accFilter = mappedFilter.reduce(
          (filtered: boolean, filterValue: HeroFilter) => {
            const name = record.nameLabel.toLocaleLowerCase();
            return (
              name.indexOf(filterValue.name.toLocaleLowerCase()) !== -1 ||
              filtered
            );
          },
          false
        );

        return accFilter;
      }

      return true;
    };
  }
}
