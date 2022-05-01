import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { HeroFilterComponent } from '../dashboard/hero-filter/hero-filter.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HeroTableComponent } from '../dashboard/hero-table/hero-table.component';

@NgModule({
  declarations: [DashboardComponent, HeroFilterComponent, HeroTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
})
export class DashboardModule {}
