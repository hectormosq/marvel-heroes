import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ChartData } from '@app/core/models/chart.model';
import * as d3 from 'd3';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  @ViewChild('chart', { static: true }) private chartContainer: ElementRef;
  @Input() data: ChartData[] = [];
  @Input() margin = 10;
  @Input() width = 200;
  @Input() height = 200;

  private svg;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;

  constructor() {}

  ngOnInit(): void {
    this._createSvg();
    this._createColors();
    this._drawChart();
  }

  private _createSvg(): void {
    const element = this.chartContainer.nativeElement;

    this.svg = d3
      .select(element)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
      );
  }

  private _createColors() {
    const names = new d3.InternSet(this.data.map((d) => d.key));
    const calculatedColors = d3.quantize(
      (t) => d3.interpolateSpectral(t * 0.8 + 0.1),
      this.data.length
    );

    this.colors = d3.scaleOrdinal(names, calculatedColors);
  }

  private _drawChart() {
    const pie = d3.pie<any>().value((d: any) => Number(d.count));

    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('path')
      .attr('d', d3.arc().innerRadius(0).outerRadius(this.radius))
      .attr('fill', (d, i) => this.colors(i))
      .attr('stroke', '#121926')
      .style('stroke-width', '1px');
  }
}
