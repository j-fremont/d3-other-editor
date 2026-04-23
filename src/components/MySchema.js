import React, { useEffect } from 'react';
import * as d3 from 'd3';
import '../css/editor.css';

const data = require('../miserables.json');

const style = {
  'max-width': '100%',
  'height': 'auto'
};

const width = 928;
const height = 600;

const rects = [{
  mrid: "rect_1",
  x: 100,
  y: 100,


}]

const MySchema = () => {

  useEffect(() => {

    // Specify the color scale.
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // The force simulation mutates links and nodes, so create a copy
    // so that re-evaluating this cell produces the same result.
    const links = data.links.map(d => ({...d}));
    const nodes = data.nodes.map(d => ({...d}));



      // Create a simulation with several forces.
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2))
        .on("tick", ticked);

    // Create the SVG container.
    const svg = d3.select("#schema");
    /*.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto;");*/

    // Add a line for each link, and a circle for each node.
    const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
      .selectAll()
      .data(links)
      .join("line")
        .attr("stroke-width", d => Math.sqrt(d.value));

    const node = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
      .selectAll()
      .data(nodes)
      .join("circle")
        .attr("r", 5)
        .attr("fill", d => color(d.group));

    node.append("title")
        .text(d => d.id);

    // Add a drag behavior.
    node.call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));


    const rect = svg.append("g")
      .selectAll()
      .data(rects)
      .join("rect")
        .attr("id", d => 'node' + d.mrid)
				//.attr("transform", d => "translate(" + d.x + "," + d.y + ")")
        .attr("width", 100)
        .attr("height", 100)

        rect.call(d3.drag()
          .on("start", dragstarted2)
          .on("drag", dragged2)
          .on("end", dragended2));




    

    // Set the position attributes of links and nodes each time the simulation ticks.
    function ticked() {
      link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);

      node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);
    }

    // Reheat the simulation when drag starts, and fix the subject position.
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    // Update the subject (dragged node) position during drag.
    function dragged(event) {

      console.log(event)

      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    // Restore the target alpha so the simulation cools after dragging ends.
    // Unfix the subject position now that it’s no longer being dragged.
    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }






    function dragstarted2(event) {
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    // Update the subject (dragged node) position during drag.
    function dragged2(event) {

      console.log(event)

      event.subject.fx = event.x;
      event.subject.fy = event.y;

		d3.select("#node"+event.subject.mrid).attr('transform', d => `translate(${event.subject.fx},${event.subject.fy})`);


    }

    // Restore the target alpha so the simulation cools after dragging ends.
    // Unfix the subject position now that it’s no longer being dragged.
    function dragended2(event) {
      event.subject.fx = null;
      event.subject.fy = null;
    }





    // When this cell is re-run, stop the previous simulation. (This doesn’t
    // really matter since the target alpha is zero and the simulation will
    // stop naturally, but it’s a good practice.)
    //invalidation.then(() => simulation.stop());

    //return svg.node();

  }, []);

  return (
            <div>
              <svg id="schema" width={928} height={height} viewBox={[0, 0, 928, height]} style={style}>

                <g id="icons-electrical" />

              </svg>
            </div>
    );
  }

  export default MySchema;

