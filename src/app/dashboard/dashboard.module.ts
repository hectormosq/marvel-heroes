import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, MatTableModule, MatSortModule],
})
export class DashboardModule {}
