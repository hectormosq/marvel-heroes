import { Pipe, PipeTransform } from '@angular/core';
import { D3Charts } from '@app/core/models/chart.model';

@Pipe({
  name: 'chartSelector',
})
export class ChartSelectorPipe implements PipeTransform {
  transform(data: Object): D3Charts {
    const count = Object.keys(data).length;

    switch (true) {
      case _pieChart(count):
        return D3Charts.PIE_CHART;
      case _barChart(count):
        return D3Charts.BAR_CHART;

      default:
        return D3Charts.BAR_CHART;
    }
  }
}

function _pieChart(count) {
  return count > 5;
}

function _barChart(count) {
  return count <= 5;
}
