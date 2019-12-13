import React, { useEffect, useRef } from "react";
import * as d3 from "d3";


const Donut = props => {
  const ref = useRef(null);
  const cache = useRef(props.data);
  console.log('asf')
  console.log(cache)
  console.log('asf')
  const createPie = d3
    .pie()
    .value(d => d.totTime)
    .sort(null);
  const createArc = d3
    .arc()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius);
  const colors = d3.scaleOrdinal()
  //.domain(props.data)
  .range(['#f92672', '#66D9EF', '#A6E22E', '#AE81FF', '#FFE792', '#FD971F']);
  const format = d3.format(".2f");

  useEffect(
    () => {
      const data = createPie(props.data);
      const prevData = createPie(cache.current);
      const group = d3.select(ref.current);
      const groupWithData = group.selectAll("g.arc").data(data);

      groupWithData.exit().remove();

      const groupWithUpdate = groupWithData
        .enter()
        .append("g")
        .attr("class", "arc");

      const path = groupWithUpdate
        .append("path")
        .merge(groupWithData.select("path.arc"));

      const arcTween = (d, i) => {
        const interpolator = d3.interpolate(prevData[i], d);

        return t => createArc(interpolator(t));
      };

      path
        .attr("class", "arc")
        //console.log(data[0].color)
        .attr("fill", (d, i) => props.data[i].color)
        .transition()
        .attrTween("d", arcTween);
// format(interpolator(t).value)
      const text = groupWithUpdate
        .append("text")
        .merge(groupWithData.select("text"));

      text
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .style("fill", "transparent")
        .style("font-size", 15)
        .transition()
        .attr("transform", d => `translate(${createArc.centroid(d)})`)
        .tween("text", (d, i, nodes) => {
          //console.log(props.data.data[i].color); 
          const interpolator = d3.interpolate(prevData[i], d);
          console.log(props.data[i])
          return t => d3.select(nodes[i]).text(props.data[i].id);
        });

      cache.current = props.data;
    },
    [props.data]
  );

  return (
    <svg width={props.width} height={props.height}>
      <g
        ref={ref}
        transform={`translate(${props.outerRadius} ${props.outerRadius})`}
      />
    </svg>
  );
};

export default Donut;
