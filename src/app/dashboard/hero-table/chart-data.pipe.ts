import { Pipe, PipeTransform } from '@angular/core';
import { ChartData } from '@app/core/models/chart.model';

@Pipe({
  name: 'chartData',
})
export class ChartDataPipe implements PipeTransform {
  transform(data: {}): ChartData[] {
    const keys = Object.keys(data);
    const chartData = keys.map((key) => {
      return { key, count: data[key] };
    });
    return chartData;
  }
}
