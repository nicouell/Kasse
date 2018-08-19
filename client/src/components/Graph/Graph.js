import React, { Component } from "react";
import { select, max, min, scaleLinear } from "d3";

import "./Graph.css";

class Graph extends Component {
  constructor(props) {
    super(props);
    this.createGraphSolde = this.createGraphSolde.bind(this);
  }

  componentDidMount() {
    this.createGraphSolde();
  }

  componentDidUpdate() {
    this.createGraphSolde();
  }

  createGraphSolde() {
    const node = this.node;
    const dataLength = this.props.data.length;
    const dataMax = max(this.props.data, d => d.fin);
    const dataMin = min(this.props.data, d => d.fin);
    const margin = 55;
    const yScale = scaleLinear()
      .domain([dataMin, dataMax])
      .range([margin, this.props.size[1] - margin]);
    const xScale = scaleLinear()
      .domain([1, this.props.data.length])
      .range([margin, this.props.size[0] - margin]);

    select(node)
      .selectAll("g.range")
      .data(this.props.data)
      .enter()
      .append("g")
      .attr("class", "range");

    select(node)
      .selectAll("g.range")
      .data(this.props.data)
      .exit()
      .remove()
      .attr("class", "range");

    select(node)
      .selectAll("g.range")
      .data(this.props.data)
      .attr(
        "transform",
        d =>
          "translate(" +
          xScale(this.props.data.indexOf(d)) +
          ", " +
          (this.props.size[1] - yScale(d.debut)) +
          ")"
      )
      .each(function(d, i) {
        const width = Math.ceil(xScale(dataLength) / dataLength / 25);
        const xl = xScale(dataLength) / dataLength / 2.4;
        const mxl = xScale(dataLength) / dataLength / -2.4;
        console.log(width);
        if (d.debut > d.fin) {
          select(this)
            .append("line")
            .attr("class", "range")
            .attr("x1", 0)
            .attr("x2", 0)
            .attr("y1", 0)
            .attr("y2", yScale(d.debut) - yScale(d.fin))
            .style("stroke-width", width)
            .style("stroke", "red")
            .style("stroke-linecap", "butt");
          select(this)
            .append("line")
            .attr("class", "debut")
            .attr("x1", mxl)
            .attr("x2", 0)
            .attr("y1", 0)
            .attr("y2", 0)
            .style("stroke-width", width)
            .style("stroke", "red")
            .style("stroke-linecap", "round");
          select(this)
            .append("line")
            .attr("class", "fin")
            .attr("x1", 0)
            .attr("x2", xl)
            .attr("y1", yScale(d.debut) - yScale(d.fin))
            .attr("y2", yScale(d.debut) - yScale(d.fin))
            .style("stroke-width", width)
            .style("stroke", "red")
            .style("stroke-linecap", "round");
        } else if (d.debut < d.fin) {
          select(this)
            .append("line")
            .attr("class", "range")
            .attr("x1", 0)
            .attr("x2", 0)
            .attr("y1", 0)
            .attr("y2", yScale(d.debut) - yScale(d.fin))
            .style("stroke-width", width)
            .style("stroke", "green")
            .style("stroke-linecap", "butt");
          select(this)
            .append("line")
            .attr("class", "debut")
            .attr("x1", mxl)
            .attr("x2", 0)
            .attr("y1", 0)
            .attr("y2", 0)
            .style("stroke-width", width)
            .style("stroke", "green")
            .style("stroke-linecap", "round");
          select(this)
            .append("line")
            .attr("class", "fin")
            .attr("x1", 0)
            .attr("x2", xl)
            .attr("y1", yScale(d.debut) - yScale(d.fin))
            .attr("y2", yScale(d.debut) - yScale(d.fin))
            .style("stroke-width", width)
            .style("stroke", "green")
            .style("stroke-linecap", "round");
        } else {
          select(this)
            .append("line")
            .attr("class", "fin")
            .attr("x1", mxl)
            .attr("x2", xl)
            .attr("y1", yScale(d.debut) - yScale(d.fin))
            .attr("y2", yScale(d.debut) - yScale(d.fin))
            .style("stroke-width", width)
            .style("stroke", "darkblue")
            .style("stroke-linecap", "round");
        }
      });
  }

  render() {
    return (
      <svg
        className="Svg"
        ref={node => (this.node = node)}
        width={1000}
        height={500}
      />
    );
  }
}

export default Graph;
