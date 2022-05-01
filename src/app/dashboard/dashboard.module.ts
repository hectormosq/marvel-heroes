import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import { HeroFilterComponent } from '../dashboard/hero-filter/hero-filter.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HeroTableComponent } from '../dashboard/hero-table/hero-table.component';
import { HeroInfoComponent } from './hero-info/hero-info.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HeroEditComponent } from './hero-edit/hero-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    DashboardComponent,
    HeroFilterComponent,
    HeroTableComponent,
    HeroInfoComponent,
    HeroEditComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatExpansionModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
})
export class DashboardModule {}
