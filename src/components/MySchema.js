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
    label: "Application_A",
    x: 100,
    y: 100,

    child: [{
      mrid: "rect_11",
      label: "Fonction_3",
      px: 100,
      py: 100,
      xmin: 10,
      xmax: 110,
      y: 60,

    },{
      mrid: "rect_12",
      label: "ProcessResource_X",
      px: 100,
      py: 100,
      xmin: 10,
      xmax: 110,
      y: 85,

    }/*,{
      mrid: "rect_13",
      label: "ProcessResource_Y",
      px: 100,
      py: 100,
      x: 10,
      y: 90,

    }*/]

  },{
    mrid: "rect_2",
    label: "Application_B",
    x: 500,
    y: 100,

    child: [{
      mrid: "rect_21",
      label: "Fonction_1",
      px: 500,
      py: 100,
      xmin: 10,
      xmax: 110,
      y: 60,

    }/*,{
      mrid: "rect_22",
      label: "ProcessResource_Z",
      px: 500,
      py: 100,
      x: 10,
      y: 60,

    }*/]

  }/*,{
    mrid: "rect_3",
    label: "Application_C",
    x: 500,
    y: 300,

    child: [{
      mrid: "rect_31",
      label: "Fonction_2",
      px: 500,
      py: 300,
      x: 10,
      y: 30,

    },{
      mrid: "rect_32",
      label: "ProcessResource_W",
      px: 500,
      py: 100,
      x: 10,
      y: 60,

    }]

  }*/])

  const links = useRef([{
    mrid: "rect_12_rect_21",
    source: "rect_12",
    target: "rect_21",

  }/*,{
    mrid: "rect_13_rect_31",
    source: "rect_13",
    target: "rect_31",

  },{
    mrid: "rect_22_rect_11",
    source: "rect_22",
    target: "rect_11",

  },{
    mrid: "rect_32_rect_21",
    source: "rect_32",
    target: "rect_21",

  }*/])



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



    const curve = d3.line().curve(d3.curveBasis);







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


    const g = svg.select("#icons")
      .selectAll()
      .data(rects.current)
      .join("g")
        .attr("id", d => d.mrid)
				.attr("transform", d => "translate(" + d.x + "," + d.y + ")")
      //  .attr("width", 100)
      //  .attr("height", 100)

    g.append("rect")
      .attr('class', 'app')
        .attr("width", 200)
        .attr("height", 150)
        //.attr("x", d => d.x)
        //.attr("y", d => d.y)

g.append("text")
.attr('class', 'apptext')
.attr("dx", ".5em")
        .attr("dy", "1.2em")
    .text(d => d.label);
        //g.selectAll().forEach(e => console.log(e))

/*

        g.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("x", 10)
        .attr("y", 10)
        .attr('fill', '#69a3b2');

*/


rects.current.forEach(g => {



 



  g.child?.forEach(c => {


     const test = d3.select("#" + g.mrid).append("g")
     
     
     /*test.append("rect")
      .attr('class', 'func')
        .attr("width", 150)
        .attr("height", 20)
        .attr("x", c.xmin)
        .attr("y", c.y+10)
        .attr('fill', '#69a3b2')*/


test.append("circle")
      .attr('class', 'anchor')
        .attr("r", 5)
        .attr("cx", 0)
        .attr("cy", c.y)
        
test.append("circle")
      .attr('class', 'anchor')
        .attr("r", 5)
        .attr("cx", 200)
        .attr("cy", c.y)

    test.append("text")
      .attr('class', 'func')
      .attr("dx", 10)
      .attr("dy", c.y+8)
      .text(c.label);


  })









})

















        g.call(d3.drag()
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


      event.subject.child.forEach(c => {

        //console.log(c)



      d3.selectAll("#paths path").filter(d => d.source===c.mrid).attr('d', d => {

        /*const p = d3.select("path#" + d.source + "_" + d.target).attr("d");
        const l = p.split("L")[1];
        const coo = l.split(",")*/

        let sx, sy;

        const link = links.current.find(l => l.mrid===d.mrid)

        //const nx = event.subject.x + c.xmin;
        //const ny = event.subject.y + c.y;

        if ((event.subject.x+200) < link.points[3][0]) {

          sx = event.subject.x + 200; // + c.xmax;
          sy = event.subject.y + c.y;

          link.points = [
            [sx, sy],
            [sx+50, sy],
            link.points[2],
            link.points[3]
          ];

        } else if (((event.subject.x+200) > link.points[3][0]) && ((event.subject.x+100) < (link.points[3][0]+100))) {

          sx = event.subject.x; //+ c.xmin;
          sy = event.subject.y + c.y;

          link.points = [
            [sx, sy],
            [sx-50, sy],
            link.points[2],
            link.points[3]
          ];

        } else if ((event.subject.x) < (link.points[3][0]+200) && (event.subject.x+100) > (link.points[3][0]+100)){

          sx = event.subject.x + 200;
          sy = event.subject.y + c.y;

          link.points = [
            [sx, sy],
            [sx+50, sy],
            link.points[2],
            link.points[3]
            //[(link.points[2][0]+250), link.points[2][1]],
            //[(link.points[3][0]+200), link.points[3][1]]
          ];

          console.log(link.points)

        } else {
          
          
          sx = event.subject.x;
          sy = event.subject.y + c.y;

          link.points = [
            [sx, sy],
            [sx-50, sy],
            link.points[2],
            link.points[3]
            //[link.points[2][0]+250, link.points[2][1]],
            //[link.points[3][0]+200, link.points[3][1]]
          ];
        }







        //return `M${nx},${ny}L${coo[0]},${coo[1]}`;

        

        //link.points = [[nx, ny], link.points[1], link.points[2]];

          /*link.points = [
            [nx, ny],
            pt2,
            //[nx-50, ny],
            //[c.targetX-50, c.targetY],
            link.points[2],
            link.points[3]
          ];*/

        return curve(link.points)

      });


      d3.selectAll("#paths path").filter(d => d.target===c.mrid).attr('d', d => {

        /*const p = d3.select("path#" + d.source + "_" + d.target).attr("d");
        const l = p.split("L")[0].split("M")[1];
        const coo = l.split(",")*/

        let tx, ty;

        const link = links.current.find(l => l.mrid===d.mrid)

        //const nx = event.subject.x + c.xmin;
        //const ny = event.subject.y + c.y;

        if ((event.subject.x-200) < link.points[0][0]) {

          tx = event.subject.x;
          ty = event.subject.y + c.y;

          link.points = [
            link.points[0],
            link.points[1],
            [tx-50, ty],
            [tx, ty]
          ];

          //pt3 = [nx+50, ny];

        } else {

          tx = event.subject.x; // + c.xmin;
          ty = event.subject.y + c.y;

          //pt3 = [nx-50, ny];

          link.points = [
            link.points[0],
            link.points[1],
            [tx-50, ty],
            [tx, ty]
          ];

        }


        //return `M${coo[0]},${coo[1]}L${nx},${ny}`;

        //const link = links.current.find(l => l.mrid===d.mrid)

        //link.points = [link.points[0], link.points[1], [nx, ny]];

          /*link.points = [
            link.points[0],
            link.points[1],
            [nx-50, ny],
            //pt3,
            [nx, ny]

          ];*/


        

        return curve(link.points)

      });


      })


		  





    }

    // Restore the target alpha so the simulation cools after dragging ends.
    // Unfix the subject position now that it’s no longer being dragged.
    function dragended(event) {




      
      





    }




const linkCoordinates = (link) => {


  /*const source = rects.current.reduce((acc,v) => {

    const s = v.child.find(c => c.mrid===link.source);

    if (s) {
      acc = {
        parent: v,
        source: s
      }
    }

    return acc;

  }, {});*/

  /*const target = rects.current.reduce((acc,v) => {

    const t = v.child.find(c => c.mrid===link.target);

    if (t) {
      acc = {
        parent: v,
        target: t
      }
    }

    return acc;

  }, {});*/


  const source = rects.current.flatMap(c => c.child).find(r => r.mrid===link.source);
  const target = rects.current.flatMap(c => c.child).find(r => r.mrid===link.target);

	const sourceX = source.px /*+ source.xmin*/;
	const sourceY = source.py + source.y;
	const targetX = target.px - 10/*+ target.xmin*/;
	const targetY = target.py + target.y;

	return {
		sourceX,
		sourceY,
		targetX,
		targetY,
		//middleX: sourceX+((targetX-sourceX)/2),
		//middleY: sourceY+((targetY-sourceY)/2)
	}
}



    svg.select("#paths")
      .selectAll()
      .data(links.current)
      .join("path")
        .attr('class', 'link')
        .attr("id", d => d.mrid)
        .attr('marker-end', 'url(#arrow)')
        .attr('d', d => {

          const c = linkCoordinates(d);
          //const points=[[c.sourceX, c.sourceY], [c.sourceX-50, c.sourceY], [c.targetX-50, c.targetY], [c.targetX, c.targetY]];
          //const points=[[c.sourceX, c.sourceY], [500, 500], [c.targetX, c.targetY]];


          const points=[
            [c.sourceX, c.sourceY],
            [c.sourceX-50, c.sourceY],
            [c.targetX-50, c.targetY],
            [c.targetX, c.targetY]
          ];


          const link = links.current.find(l => l.mrid===d.mrid)

          link.points = points;





          return curve(link.points)

          /*
          const c = linkCoordinates(d);
          return `M${c.sourceX},${c.sourceY}L${c.targetX},${c.targetY}`;
          */
        })



    /*    svg.append("text")
   .append("textPath") //append a textPath to the text element
    .attr("xlink:href", "#rect_32_rect_21") //place the ID of the path here
    .style("text-anchor","middle") //place the text halfway on the arc
    .attr("startOffset", "50%")
    .text("Yay, my text is on a wavy path");
*/











    // When this cell is re-run, stop the previous simulation. (This doesn’t
    // really matter since the target alpha is zero and the simulation will
    // stop naturally, but it’s a good practice.)
    //invalidation.then(() => simulation.stop());

    //return svg.node();

  }, []);




    

   








  return (
            <div>
              <svg id="schema" width={width} height={height} viewBox={[0, 0, width, height]} style={style}>


							<g id="icons" />
<g id="paths" />



                <defs>
                  <marker
      id="arrow"
      viewBox="0 0 20 20"
      refX="10"
      refY="10"
      markerWidth="12"
      markerHeight="12"
      orient="auto-start-reverse">
      <path d="M 0 0 L 20 10 L 0 20 z" />
    </marker>
                </defs>




              </svg>
            </div>
    );
  }

  export default MySchema;

