import React, { useEffect } from 'react';
import * as d3 from 'd3';
import '../css/editor.css';

const style = {
  'max-width': '100%',
  'height': 'auto'
};

const height = 480;
const width = 900;

const Day1 = () => {

  useEffect(() => {

    const svg = d3.select("#schema")

    const rects = svg.selectAll('rect')

    const data = [ 0, 1, 2, 3, 4 ]

    rects
      .data( data )
      .join('rect')
        .style('fill', 'black')
        .attr('height', 20)
        .attr('width', 20)
        .attr('y', 10)
        .attr('x', (d,i) => { return 10 + (i * 30) })

  }, []);

  return (
            <div>
              <svg id="schema" width={width} height={height} viewBox={[0, 0, width, height]} style={style}>
              </svg>
            </div>
    );
  }

  export default Day1;

