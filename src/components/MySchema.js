import React, { useRef, useState, useEffect, useCallback } from 'react';
import * as d3 from 'd3';
import '../css/editor.css';

//const data = require('../miserables.json');

const style = {
  'max-width': '100%',
  'height': 'auto'
};

const width = 1200;
const height = 600;

const MySchema = () => {

  const rects = useRef([{
    mrid: "rect_1",
    x: 100,
    y: 100,
    child: [{}]

  },{
    mrid: "rect_2",
    x: 500,
    y: 100,

  },{
    mrid: "rect_3",
    x: 500,
    y: 300,

  }])

  const links = useRef([{
    source: "rect_1",
    target: "rect_2",
    x: 300,
    y: 300

  },{
    source: "rect_2",
    target: "rect_3",

  }])



  /*const [rects, setRects] = useState([{
    mrid: "rect_1",
    x: 100,
    y: 100,

  },{
    mrid: "rect_2",
    x: 500,
    y: 100,

  }]);*/




  //const [current, setCurrent] = useState();


  /*const dragstarted = useCallback(event => {

      console.log(event)

      setCurrent(rects.find(r => r.mrid===event.subject.mrid))

    }, [rects, setCurrent]);



    const dragged = useCallback(event => {

      setCurrent({
        ...current,
        x: event.x,
        y: event.y
      })


		  d3.select("#node"+event.subject.mrid).attr('transform', d => `translate(${event.x},${event.y})`);


    }, [current, setCurrent]);


      const dragended = useCallback(event => {

      console.log(event)

      console.log([...rects.filter(r => r.mrid!==event.subject.mrid), current])

    }, [rects, current]);




*/






  useEffect(() => {

    console.log(rects.current)

    // Specify the color scale.
    //const color = d3.scaleOrdinal(d3.schemeCategory10);

    // The force simulation mutates links and nodes, so create a copy
    // so that re-evaluating this cell produces the same result.
    /*const links = data.links.map(d => ({...d}));
    const nodes = data.nodes.map(d => ({...d}));*/



      // Create a simulation with several forces.
    /*const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2))
        .on("tick", ticked);*/

    // Create the SVG container.
    const svg = d3.select("#schema");
    /*.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto;");*/

    // Add a line for each link, and a circle for each node.
    /*const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
      .selectAll()
      .data(links)
      .join("line")
        .attr("stroke-width", d => Math.sqrt(d.value));*/

    /*const node = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
      .selectAll()
      .data(nodes)
      .join("circle")
        .attr("r", 5)
        .attr("fill", d => color(d.group));*/

    /*node.append("title")
        .text(d => d.id);*/

    // Add a drag behavior.
    /*node.call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));*/


    const rect = svg.append("g")
      .selectAll()
      .data(rects.current)
      .join("g")
        .attr("id", d => d.mrid)
				.attr("transform", d => "translate(" + d.x + "," + d.y + ")")
        //.attr("width", 100)
        //.attr("height", 100)

    .append("rect")
        .attr("width", 100)
        .attr("height", 100)
        //.attr("x", d => d.x)
        //.attr("y", d => d.y)

        .data(d => console.log(d))
        .join("rect")
.attr("width", 10)
        .attr("height", 10)
        .attr("x", 10)
        .attr("y", 10)
        .attr('fill', '#69a3b2');


      /*rect.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("x", 10)
        .attr("y", 10)
        .attr('fill', '#69a3b2');


      rect.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("x", 10)
        .attr("y", 30)
        .attr('fill', '#69a3b2');

*/
        rect.call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

    function dragstarted(event) {

      //console.log(event)

      //const rect = rects.current.find(r => r.mrid===event.subject.mrid);


      //console.log(rect)

      //d3.select("#node"+rect.mrid).attr('transform', d => `translate(${rect.x},${rect.y})`);






    }

    // Update the subject (dragged node) position during drag.
    function dragged(event) {

      //console.log(event)

        event.subject.x = event.x;
        event.subject.y = event.y;

		  d3.select("#" + event.subject.mrid).attr('transform', d => `translate(${event.subject.x},${event.subject.y})`);

      console.log(d3.selectAll("path"))


		  
      d3.selectAll("path").filter(d => d.source===event.subject.mrid).attr('d', d => {

        const p = d3.select("path#" + d.source + "_" + d.target).attr("d");
        const l = p.split("L")[1];
        const coo = l.split(",")

        return `M${event.subject.x},${event.subject.y}L${coo[0]},${coo[1]}`;

      });


      d3.selectAll("path").filter(d => d.target===event.subject.mrid).attr('d', d => {

        const p = d3.select("path#" + d.source + "_" + d.target).attr("d");
        const l = p.split("L")[0].split("M")[1];
        const coo = l.split(",")

        return `M${coo[0]},${coo[1]}L${event.subject.x},${event.subject.y}`;

      });




    }

    // Restore the target alpha so the simulation cools after dragging ends.
    // Unfix the subject position now that it’s no longer being dragged.
    function dragended(event) {




      
      





    }




const linkCoordinates = (link) => {

  const source = rects.current.find(r => r.mrid===link.source);
  const target = rects.current.find(r => r.mrid===link.target);

	const sourceX = source.x;
	const sourceY = source.y;
	const targetX = target.x;
	const targetY = target.y;

	return {
		sourceX,
		sourceY,
		targetX,
		targetY,
		//middleX: sourceX+((targetX-sourceX)/2),
		//middleY: sourceY+((targetY-sourceY)/2)
	}
}



    svg.append("g")
      .selectAll()
      .data(links.current)
      .join("path")
        .attr('class', 'link')
        .attr("id", d => d.source + "_" + d.target)
        .attr('d', d => {
          const c = linkCoordinates(d);
          return `M${c.sourceX},${c.sourceY}L${c.targetX},${c.targetY}`;
        })












    // When this cell is re-run, stop the previous simulation. (This doesn’t
    // really matter since the target alpha is zero and the simulation will
    // stop naturally, but it’s a good practice.)
    //invalidation.then(() => simulation.stop());

    //return svg.node();

  }, []);




    

   








  return (
            <div>
              <svg id="schema" width={width} height={height} viewBox={[0, 0, width, height]} style={style}>

              </svg>
            </div>
    );
  }

  export default MySchema;

