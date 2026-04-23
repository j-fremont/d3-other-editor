import React, { useEffect } from 'react';
import * as d3 from 'd3';
import '../css/editor.css';

const data = require('../miserables.json');

const style = {
  'max-width': '100%',
  'height': 'auto'
};

const rectWidth = 30;
const height = 480;
const width = 900;






const MySchema2 = () => {

  useEffect(() => {


    // Create the SVG container.
    const svg = d3.select("#schema");

    const rects = d3.range( Math.ceil(height/rectWidth) * Math.ceil(width/rectWidth)  )
    
    svg.selectAll('rect')
      .data( rects )
      .join('rect')
        .attr('class', d => 'rect-' + d)
        .attr('width', rectWidth)
        .attr('height', rectWidth)
        .attr('x', (d,i) => rectWidth * (i % (width/rectWidth)))
        .attr('y', (d,i) => Math.floor( i/(width/rectWidth) ) * rectWidth)
        .classed("draggable", true)
        .style('stroke', 'white')
        .style('cursor', 'pointer')
        .style('fill', (d,i) => {
          const x = rectWidth * (i % (width/rectWidth)),
                y = Math.floor( i/(width/rectWidth) ) * rectWidth,
                dist = Math.hypot( x, y )
          
          return d3.interpolateSpectral( dist / Math.hypot( width, height ) )
        })





        function dragStart(d) {
    d3.select( this )
        .raise()
        .style('stroke', 'black')
  }
  
  function dragging(event) {

    console.log(event)

    d3.select( this )
        .attr('x', event.x - rectWidth/2)
        .attr('y', event.y - rectWidth/2)
        // If you uncomment below, the color of the rect will change as you drag :D
        // .style('fill', () => {
        //   return d3.interpolateSpectral( Math.hypot(d3.event.x, d3.event.y) / Math.hypot( width, height ) )
        // })
  }
  
  function dragEnd(d) {
    d3.select( this ).style('stroke', 'white')
  }


  /*
  d3.drag()
      .on('start', dragStart)
      .on('drag', dragging)
      .on('end', dragEnd)
  */



d3.select("#schema").selectAll(".draggable").call(
			d3.drag()
			.on("start", this.dragStarted)
			.on("drag", this.dragged)
			.on("end", this.dragEnded)
		).data(rects);







  }, []);

  return (
            <div>
              <svg id="schema" width={width} height={height} viewBox={[0, 0, width, height]} style={style}>

                <g id="icons-electrical" />

              </svg>
            </div>
    );
  }

  export default MySchema2;

