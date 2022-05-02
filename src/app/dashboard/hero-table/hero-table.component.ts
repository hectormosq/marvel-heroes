import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  HeroChart,
  HeroFilter,
  HeroProp,
  HeroPropChartMap,
  MarvelHero,
} from '@app/core/models/marvel-hero';

@Component({
  selector: 'app-hero-table',
  templateUrl: './hero-table.component.html',
  styleUrls: ['./hero-table.component.scss'],
})
export class HeroTableComponent implements OnChanges, OnInit {
  @Input() filter: HeroFilter[];
  @Input() heroes: MarvelHero[];

  @Output() showHero = new EventEmitter();

  @ViewChild('pieChart') pieChart: TemplateRef<any>;
  @ViewChild('barChart') barChart: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  heroesDataSource: MatTableDataSource<MarvelHero> =
    new MatTableDataSource<MarvelHero>();
  heroesGroupedData: any = {};
  HERO_CHART = HeroChart;

  columnsToDisplay = [
    HeroProp.NAME,
    HeroProp.SKILLS,
    HeroProp.MEMBEROF,
    HeroProp.OCCUPATION,
    HeroProp.GENDER,
    HeroProp.CITIZENSHIP,
    HeroProp.CREATOR,
  ];
  columnsChart = [
    HeroChart.NAME,
    HeroChart.SKILLS,
    HeroChart.MEMBEROF,
    HeroChart.OCCUPATION,
    HeroChart.GENDER,
    HeroChart.CITIZENSHIP,
    HeroChart.CREATOR,
  ];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filter']) {
      this.heroesDataSource.filter = JSON.stringify(this.filter);
    }

    if (changes['heroes']) {
      this._handleHeroes();
    }
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.heroesDataSource.sort = this.sort;
    this.heroesDataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this._configureFilter();
  }

  onClickHero(hero: MarvelHero) {
    this.showHero.emit(hero);
  }

  private _handleHeroes() {
    this.heroesDataSource.data = this.heroes;
    this.heroesGroupedData = {
      [HeroChart.NAME]: {},
      [HeroChart.SKILLS]: {},
      [HeroChart.MEMBEROF]: {},
      [HeroChart.OCCUPATION]: {},
      [HeroChart.GENDER]: {},
      [HeroChart.CITIZENSHIP]: {},
      [HeroChart.CREATOR]: {},
    };

    this.heroes.forEach((hero: MarvelHero) => {
      this.columnsToDisplay.forEach((key) => {
        const chartKey = HeroPropChartMap[key];

        this.heroesGroupedData[chartKey][hero[key]] = this.heroesGroupedData[
          chartKey
        ][hero[key]]
          ? this.heroesGroupedData[chartKey][hero[key]] + 1
          : 1;
      });
    });
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
