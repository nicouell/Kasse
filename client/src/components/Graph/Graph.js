import React, { Component } from "react";
import {
  select,
  max,
  min,
  scaleLinear,
  axisBottom,
  axisLeft,
  scaleTime
} from "d3";
import Axis from "./Axis";

import classe from "./Graph.css";

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: this.props.width,
      height: this.props.height
    };
    this.createGraphSolde = this.createGraphSolde.bind(this);
  }

  componentDidMount() {
    this.createGraphSolde();
  }

  componentDidUpdate() {
    this.createGraphSolde();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ width: nextProps.width, height: nextProps.height });
  }

  createGraphSolde() {
    const node = this.node;
    const recivedData = this.props.data.slice(0, 100);
    const dataLength = recivedData.length;
    const dataMax = max(recivedData, d => d.debut);
    const dataMin = min(recivedData, d => d.fin);
    const margin = 50;
    const yScale = scaleLinear()
      .domain([dataMin, dataMax])
      .range([margin, this.state.height - margin]);
    const xScale = scaleLinear()
      .domain([1, dataLength])
      .range([margin, this.state.width - margin]);
    select(node)
      .selectAll("g.range")
      .data(recivedData)
      .enter()
      .append("g")
      .attr("class", "range");

    select(node)
      .selectAll("g.range")
      .data(recivedData)
      .exit()
      .remove()
      .attr("class", "range");

    select(node)
      .append("line")
      .attr("class", "fin")
      .attr("x1", xScale(-1))
      .attr("x2", xScale(100))
      .attr("y1", this.state.height - yScale(0))
      .attr("y2", this.state.height - yScale(0))
      .style("stroke-width", 0.5)
      .style("stroke", "grey")
      .style("stroke-dasharray", "4.1")
      .style("stroke-linecap", "round");

    select(node)
      .selectAll("g.range")
      .data(recivedData)
      .style("shape-rendering", "auto")
      .attr(
        "transform",
        d =>
          "translate(" +
          xScale(recivedData.indexOf(d)) +
          ", " +
          (this.state.height - yScale(d.debut)) +
          ")"
      )
      .each(function(d, i) {
        const width = Math.ceil(xScale(dataLength) / dataLength / 25);
        const xl = Math.floor(xScale(dataLength) / dataLength / 2.4);
        const mxl = Math.ceil(xScale(dataLength) / dataLength / -2.4);
        const y = Math.floor(yScale(d.debut) - yScale(d.fin));

        if (d.debut > d.fin) {
          select(this)
            .append("line")
            .attr("class", "range")
            .attr("x1", 0)
            .attr("x2", 0)
            .attr("y1", 0)
            .attr("y2", y)
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
            .attr("y1", y)
            .attr("y2", y)
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
            .attr("y2", y)
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
            .attr("y1", y)
            .attr("y2", y)
            .style("stroke-width", width)
            .style("stroke", "green")
            .style("stroke-linecap", "round");
        } else {
          select(this)
            .append("line")
            .attr("class", "fin")
            .attr("x1", mxl)
            .attr("x2", xl)
            .attr("y1", y)
            .attr("y2", y)
            .style("stroke-width", width)
            .style("stroke", "darkblue")
            .style("stroke-linecap", "round");
        }
      });
  }

  render() {
    const recivedData = this.props.data.slice(0, 100);
    const dataMax = max(recivedData, d => d.debut);
    const dataMin = min(recivedData, d => d.fin);
    const startDate = new Date(this.props.data[0].date);
    const endDate = new Date(this.props.data[100].date);
    const margin = 50;
    const yScale = scaleLinear()
      .domain([dataMin, dataMax])
      .range([this.state.height - margin, margin]);
    const xScale = scaleTime()
      .domain([startDate, endDate])
      .range([margin, this.state.width - margin]);
    return (
      <div>
        <svg
          className={classe.Svg}
          ref={node => (this.node = node)}
          width={this.state.width}
          height={this.state.height}
        >
          <g>
            <Axis
              axis="x"
              transform={"translate(-10," + (this.state.height - 20) + ")"}
              scale={axisBottom().scale(xScale)}
            />
          </g>
          <g>
            <Axis
              axis="y"
              transform={"translate( 30, 0)"}
              scale={axisLeft().scale(yScale)}
            />
          </g>
        </svg>
      </div>
    );
  }
}

export default Graph;
