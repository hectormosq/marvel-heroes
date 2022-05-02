import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { ChartData } from '@app/core/models/chart.model';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  @ViewChild('chart', { static: true }) private chartContainer: ElementRef;

  @Input() data: ChartData[] = [];

  private svg;
  private margin = 40;
  private width = 200 - this.margin * 2;
  private height = 200 - this.margin * 2;

  constructor() {}

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
      .padding(0.2);

    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    const y = d3
      .scaleLinear()
      .domain([0, Math.max(...this.data.map((d) => d.count))])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append('g').call(d3.axisLeft(y));

    this.svg
      .selectAll('bars')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d: ChartData) => x(d.key))
      .attr('y', (d: ChartData) => y(d.count))
      .attr('width', x.bandwidth())
      .attr('height', (d) => this.height - y(d.count))
      .attr('fill', 'steelblue');
  }
}
