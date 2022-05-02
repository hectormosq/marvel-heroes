import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as d3 from 'd3';
import { ChartData } from '@app/core/models/chart.model';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit, OnChanges {
  @ViewChild('chart', { static: true }) private chartContainer: ElementRef;

  @Input() data: ChartData[] = [];

  private svg;
  private margin = 60;
  private width = 300 - this.margin * 2;
  private height = 200 - this.margin * 2;

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange) {
      // TODO Implement update for chart to update it instead of creating a new one
      this._clearSvg();
      this._createSvg();
      this._drawBars();
    }
  }

  ngOnInit(): void {
    this._createSvg();
    this._drawBars();
  }

  private _createSvg(): void {
    const element = this.chartContainer.nativeElement;
    this.svg = d3
      .select(element)
      .append('svg')
      .attr('width', this.width + this.margin * 2)
      .attr('height', this.height + this.margin * 2)
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private _drawBars() {
    const data = this.data;
    const x = d3
      .scaleBand()
      .range([0, this.width])
      .domain(data.map((d) => d.key))

    const gx = this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-25)')
      .style('text-anchor', 'end');

    const y = d3
      .scaleLinear()
      .domain([0, Math.max(...this.data.map((d) => d.count))])
      .rangeRound([this.height, 0]);

    // Draw the Y-axis on the DOM
    const gy = this.svg.append('g').call(d3.axisLeft(y));

    let bar = this.svg
      .attr('fill', 'steelblue')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', (d: ChartData) => x(d.key))
      .attr('y', (d: ChartData) => y(d.count))
      .attr('width', x.bandwidth() - 1)
      .attr('height', (d) => this.height - y(d.count))
      .exit()
      .remove();

    const that = this;

    return Object.assign(this.svg.node(), {
      update(updatedData) {
        const t = that.svg.transition().duration(750);

        x.domain(updatedData.map((d) => d.key));

        gx.transition(t).call(d3.axisBottom(x));

        y.domain([0, Math.max(...updatedData.map((d) => d.count))]);

        gy.transition(t).call(d3.axisLeft(y));

        bar = bar.data(updatedData).call((bar) => {
          console.log(bar);
          return bar
            .transition(t)
            .attr('x', (d: ChartData) => x(d.key))
            .attr('y', (d: ChartData) => y(d.count))
            .attr('width', x.bandwidth())
            .attr('height', (d) => that.height - y(d.count));
        });
      },
    });
  }

  private _clearSvg() {
    d3.select(this.chartContainer.nativeElement).select('svg').remove();
  }
}
