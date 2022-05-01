import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { HeroFilter } from '@app/core/models/marvel-hero';

@Component({
  selector: 'app-hero-filter',
  templateUrl: './hero-filter.component.html',
  styleUrls: ['./hero-filter.component.scss'],
})
export class HeroFilterComponent {
  @Output() filter = new EventEmitter();

  heroNameList: HeroFilter[] = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  addOnBlur = true;

  constructor() {}

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.heroNameList.push({ name: value });
      this.filter.emit(this.heroNameList);
    }

    event.chipInput!.clear();
  }

  remove(index: number): void {
    this.heroNameList.splice(index, 1);
    this.filter.emit(this.heroNameList);
  }
}
