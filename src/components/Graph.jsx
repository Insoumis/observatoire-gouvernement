import React, { Component } from 'react';
import * as d3 from 'd3';

import css from './Graph.scss';

import data from './temp';

import philippe from './assets/cabinet/philippe.jpg';
import castaner from './assets/cabinet/castaner.jpg';
import areva from './assets/private/areva.jpg';
import m6 from './assets/private/m6.jpg';
import accor from './assets/private/accor.jpg';
import rva from './assets/private/rva.jpg';

const images = { philippe, castaner, areva, m6, rva, accor };

class Graph extends Component {
  componentDidMount() {
    const svg = d3.select('svg');
    const defs = svg.append('defs');
    const width = this.svgEl.clientWidth;
    const height = this.svgEl.clientHeight;

    const sizes = {
      cabinet: 45,
      private: 25,
    };

    const simulation = d3.forceSimulation()
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('charge', d3.forceManyBody())
    .force('collide', d3.forceCollide().radius(d => sizes[d.group] + 0.5))
    .force('link', d3.forceLink().id(d => d.id));

    simulation
    .nodes(data.nodes);

    simulation
    .force('link')
    .links(data.links)
    .distance(d => sizes[d.source.group] + sizes[d.target.group] + 100);

    const link = svg.selectAll(`.${css.link}`)
    .data(data.links)
    .enter().append('line')
    .attr('class', css.link);

    defs.selectAll('pattern')
    .data(data.nodes)
    .enter().append('pattern')
    .attr('id', d => d.id)
    .attr('patternUnits', 'userSpaceOnUse')
    .attr('width', d => sizes[d.group] * 2)
    .attr('height', d => sizes[d.group] * 2)
    .attr('x', d => -sizes[d.group])
    .attr('y', d => -sizes[d.group])
    .append('image')
    .attr('xlink:href', d => images[d.image])
    .attr('width', d => sizes[d.group] * 2)
    .attr('height', d => sizes[d.group] * 2);

    const node = svg.selectAll(`.${css.node}`)
    .data(data.nodes)
    .enter().append('circle')
    .attr('class', css.node)
    .attr('r', d => sizes[d.group])
    .attr('fill', d => `url(#${d.id})`)
    .call(
      d3.drag()
      .on('start', (d) => {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (d) => {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      })
      .on('end', (d) => {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }),
  );

    simulation.on('tick', () => {
      link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });
  }

  render() {
    return (
      <svg className={css.module} ref={(node) => { this.svgEl = node; }} />
    );
  }
}

export default Graph;
