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
    x: 500,
    y: 100,

    child: [{
      mrid: "rect_11",
      label: "Fonction_3",
      px: 500,
      py: 100,

      x: 200,
      y: 60,

    },{
      mrid: "rect_12",
      label: "ProcessResource_X",
      px: 500,
      py: 100,

      x: 200,
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
    x: 100,
    y: 100,

    child: [{
      mrid: "rect_21",
      label: "Fonction_1",
      px: 100,
      py: 100,

      x: 600,
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
    mridSource: "rect_12",
    mridTarget: "rect_21",

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

      event.subject.x = event.x;
      event.subject.y = event.y;

		  d3.select("#" + event.subject.mrid).attr('transform', d => `translate(${event.subject.x},${event.subject.y})`);



      event.subject.child.forEach(c => {
        
             
        
        
        d3.selectAll("#paths path").filter(d => d.mridSource===c.mrid).attr('d', d => {


          let x, y, points;

          const link = links.current.find(l => l.mrid===d.mrid);



        if ((event.subject.x+200) < link.end.x) {

          x = event.subject.x + 200;
          y = event.subject.y + c.y;

          points = [
            [x, y],
            [x+50, y],
            [link.end.x-50, link.end.y],
            [link.end.x, link.end.y]
          ];


          

        } else if (((event.subject.x+200) > link.end.x) && ((event.subject.x+100) < (link.end.x+100))) {

          x = event.subject.x;
          y = event.subject.y + c.y;

          points = [
            [x, y],
            [x-50, y],
            [link.end.x-50, link.end.y],
            [link.end.x, link.end.y]
          ];




        } else if ((event.subject.x < (link.end.x+200)) && ((event.subject.x+100) > (link.end.x+100))) {

          x = event.subject.x + 200;
          y = event.subject.y + c.y;


          points = [
            [x, y],
            [x+50, y],
            [link.end.x+270, link.end.y],
            [link.end.x+220, link.end.y]
          ];

          



        } else {
          
          
          x = event.subject.x;
          y = event.subject.y + c.y;

          points = [
            [x, y],
            [x-50, y],
            [link.end.x+270, link.end.y],
            [link.end.x+220, link.end.y]
          ];
        }



                 link.start = {
            x: event.subject.x -10 ,
            y: event.subject.y + c.y
          }




       return curve(points)

      });







      d3.selectAll("#paths path").filter(d => d.mridTarget===c.mrid).attr('d', d => {



        let x, y, points;

        const link = links.current.find(l => l.mrid===d.mrid);

        


        if ((event.subject.x+200) < link.start.x) {

          x = event.subject.x + 200;
          y = event.subject.y + c.y;

          points = [
            [link.start.x, link.start.y],
            [link.start.x-50, link.start.y],
            [x+50, y],
            [x+10, y]
            
          ];

        } else if (((event.subject.x+200) > link.start.x) && ((event.subject.x+100) < (link.start.x+100))) {

          x = event.subject.x;
          y = event.subject.y + c.y;

          points = [
            [link.start.x, link.start.y],
            [link.start.x-50, link.start.y],
            [x-50, y],
            [x-10, y]
          ];


        } else if ((event.subject.x < (link.start.x+200)) && ((event.subject.x+100) > (link.start.x+100))) {

          x = event.subject.x + 200;
          y = event.subject.y + c.y;


          points = [
            [link.start.x+200, link.start.y],
            [link.start.x+250, link.start.y],
            [x+50, y],
            [x+10, y]
          ];


         } else {
          
          
          x = event.subject.x;
          y = event.subject.y + c.y;

          points = [
            [link.start.x+200, link.start.y],
            [link.start.x+250, link.start.y],
            [x-50, y],
            [x-10, y]
          ];

        }




        link.end = {
          x: event.subject.x,
          y: event.subject.y + c.y
        }




    

        return curve(points)

      });


      })


		  





    }

    // Restore the target alpha so the simulation cools after dragging ends.
    // Unfix the subject position now that it’s no longer being dragged.
    function dragended(event) {




      
      





    }




const linkCoordinates = (link) => {


  const source = rects.current.flatMap(c => c.child).find(r => r.mrid===link.mridSource);
  const target = rects.current.flatMap(c => c.child).find(r => r.mrid===link.mridTarget);

	const sourceX = source.px;
	const sourceY = source.py + source.y;
	const targetX = target.px - 10;
	const targetY = target.py + target.y;

	return {
		sourceX,
		sourceY,
		targetX,
		targetY
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

          //const c = linkCoordinates(d);

          const source = rects.current.flatMap(c => c.child).find(r => r.mrid===d.mridSource);
          const target = rects.current.flatMap(c => c.child).find(r => r.mrid===d.mridTarget);

          const sourceX = source.px;
          const sourceY = source.py + source.y;
          const targetX = target.px - 10;
          const targetY = target.py + target.y;

          const points=[
            [sourceX, sourceY],
            [sourceX-50, sourceY],
            [targetX-50, targetY],
            [targetX, targetY]
          ];

          const link = links.current.find(l => l.mrid===d.mrid)

          link.start = {
            x: sourceX,
            y: sourceY
          }

          link.end = {
            x: targetX,
            y: targetY
          }

          //return curve(link.points)
          return curve(points)


        })



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
  )
}

export default MySchema;

