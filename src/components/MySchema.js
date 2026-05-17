import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import '../css/editor.css';

const style = {
  'max-width': '100%',
  'height': 'auto'
};

const width = 2400;
const height = 1200;

const WIDTH_APP = 200; // Largeur d'une application
const HEIGHT_APP = 35; // Hauteur pour le nom d'une application
const HEIGHT_FUNC = 25; // Hauteur pour le nom d'une fonction
const HEIGHT_RES = 25; // Hauteur pour le nom d'un process resource
const HEIGHT_SEP = 25; // Hauteur pour l'espce entre les fonctions et les process resources

const MySchema = () => {

  const rects = useRef([{
    mrid: "pwh",
    label: "HTA/Bay1/PWH",
    x: 100,
    y: 100,
    child: [{
      mrid: "pwh_depart",
      label: "PWH Départ",
      type: "function",
      x: 100,
      y: 100,
      dy: 50,
    },{
      mrid: "pr_dj_hta_depart",
      label: "PR_DJ_HTA_Depart",
      type: "resource",
      x: 100,
      y: 100,
      dy: 90,
    },{
      mrid: "current_transformer",
      label: "CurrentTransformer",
      type: "resource",
      x: 100,
      y: 100,
      dy: 115
    },{
      mrid: "voltage_transformer",
      label: "VoltageTransformer",
      type: "resource",
      x: 100,
      y: 100,
      dy: 140
    },{
      mrid: "local_remote_operator",
      label: "LocalRemoteOperator",
      type: "resource",
      x: 100,
      y: 100,
      dy: 165
    }]

  },{
    mrid: "eccd",
    label: "HTA/Bay1/ECCD",
    x: 100,
    y: 100,
    child: [{
      mrid: "breaker_interface",
      label: "Breaker interface",
      type: "function",
      x: 100,
      y: 100,
      dy: 50
    },{
      mrid: "automation_function",
      label: "Automation function",
      type: "resource",
      x: 100,
      y: 100,
      dy: 90

    },{
      mrid: "protection_function_a",
      label: "Protection function",
      type: "resource",
      x: 100,
      y: 100,
      dy: 115
    }]

  },{
    mrid: "rrl",
    label: "HTA/Bay2/RRL",
    x: 100,
    y: 100,
    child: [{
      mrid: "rrl_recloser",
      label: "RRL-Recloser",
      type: "function",
      x: 100,
      y: 100,
      dy: 50
    },{
      mrid: "pr_dj_hta",
      label: "PR_DJ_HTA",
      type: "resource",
      x: 100,
      y: 100,
      dy: 90
    },{
      mrid: "pr_protection",
      label: "PR_Protection",
      type: "resource",
      x: 100,
      y: 100,
      dy: 115
    }]

  },{
    mrid: "mesures",
    label: "HTA/Bay1/Mesures",
    x: 100,
    y: 100,
    child: [{
      mrid: "acq_cur_hta",
      label: "ACQ-CUR-HTA",
      type: "function",
      x: 100,
      y: 100,
      dy: 50
    },{
      mrid: "acq_vol_hta",
      label: "ACQ-VOL-HTA",
      type: "function",
      x: 100,
      y: 100,
      dy: 75
    },{
      mrid: "local_remote_hmi",
      label: "LocalRemoteHMI",
      type: "resource",
      x: 100,
      y: 100,
      dy: 115
    },{
      mrid: "automation_monitoring",
      label: "Automation monitoring",
      type: "resource",
      x: 100,
      y: 100,
      dy: 140
    },{
      mrid: "protection_function_b",
      label: "PR_Protection",
      type: "resource",
      x: 100,
      y: 100,
      dy: 165
    }]
  
  },{
    mrid: "hmi",
    label: "HTA/HMI",
    x: 100,
    y: 100,
    child: [{
      mrid: "supervision",
      label: "Supervision",
      type: "function",
      x: 100,
      y: 100,
      dy: 50
    }]
  }])

  const links = useRef([{
    mrid: "_1",
    mridSource: "pr_protection",
    mridTarget: "pwh_depart",
  },{
    mrid: "_2",
    mridSource: "automation_function",
    mridTarget: "rrl_recloser",
  },{
    mrid: "_3",
    mridSource: "pr_dj_hta_depart",
    mridTarget: "breaker_interface",
  },{
    mrid: "_4",
    mridSource: "current_transformer",
    mridTarget: "acq_cur_hta",
  },{
    mrid: "_5",
    mridSource: "voltage_transformer",
    mridTarget: "acq_vol_hta",
  },{
    mrid: "_6",
    mridSource: "local_remote_hmi",
    mridTarget: "supervision",
  },{
    mrid: "_7",
    mridSource: "local_remote_operator",
    mridTarget: "supervision",
  },{
    mrid: "_8",
    mridSource: "pr_dj_hta",
    mridTarget: "breaker_interface",
  },{
    mrid: "_9",
    mridSource: "protection_function_a",
    mridTarget: "pwh_depart",
  }])

  const textType = (type) => {

    if (type==='function') return 'functext'
  
    else return 'prtext'
  }

  const rectHeight = (d) => {

    return (
      HEIGHT_APP +
      HEIGHT_SEP +
      d.child.filter(c => c.type==='function').length * HEIGHT_FUNC +
      HEIGHT_SEP +
      d.child.filter(c => c.type==='resource').length * HEIGHT_RES
    )
  }

  useEffect(() => {

    const curve = d3.line().curve(d3.curveBasis)

    const svg = d3.select("#schema")

    const g = svg.select("#icons")
      .selectAll()
      .data(rects.current)
      .join("g")
        .attr("id", d => d.mrid)
				.attr("transform", d => "translate(" + d.x + "," + d.y + ")")

    g.append("rect")
      .attr('class', 'app maximized')
      .attr("id", d => d.mrid)
      .attr("width", WIDTH_APP)
      .attr("height", rectHeight)

    g.append("text")
      .attr('class', 'apptext')
      .attr("dx", ".5em")
      .attr("dy", "1.3em")
      .text(d => d.label)

    g.append("path")
      .attr('class', 'separator')
      .attr('d', d => `M0,${HEIGHT_APP}L${WIDTH_APP},${HEIGHT_APP}`)

		g.append('g')
      .attr("id", d => d.mrid)
			.attr("transform", d => "translate(185,15)")
      .append("use").attr("xlink:href", "#minimize")
        .attr("id", d => d.mrid)
        .on("click", e => {

          const app = rects.current.find(r => r.mrid===e.currentTarget.id)

          const maximized = d3.select("rect#" + e.currentTarget.id).filter(".maximized")

          if (maximized.empty()) {

            d3.select("rect#" + e.currentTarget.id).filter(".minimized").attr("height", rectHeight).attr("class", "app maximized")

            d3.select("use#" + e.currentTarget.id).attr("xlink:href", "#minimize")

            d3.select("g#" + e.currentTarget.id).selectAll("text").filter(".prtext").attr("class", "prtext")
            d3.select("g#" + e.currentTarget.id).selectAll("text").filter(".functext").attr("class", "functext")

            d3.select("g#" + e.currentTarget.id).selectAll("circle").attr("class", "anchor")

            moveLinksOfApp(app)

          } else {

            maximized.attr("height", HEIGHT_APP).attr("class", "app minimized")

            d3.select("use#" + e.currentTarget.id).attr("xlink:href", "#maximize")

            d3.select("g#" + e.currentTarget.id).selectAll("text").filter(".prtext").attr("class", "prtext hide")
            d3.select("g#" + e.currentTarget.id).selectAll("text").filter(".functext").attr("class", "functext hide")

            d3.select("g#" + e.currentTarget.id).selectAll("circle").attr("class", "anchor hide")

            moveLinksOfApp(app, true)

          }
        })
        
    rects.current.forEach(r => {
      
      r.child?.forEach(c => {
        
        const f = d3.select("#" + r.mrid).append("g")
        
        f.append("circle")
          .attr('class', 'anchor')
          .attr("r", 5)
          .attr("cx", 0)
          .attr("cy", c.dy)
        
        f.append("circle")
          .attr('class', 'anchor')
          .attr("r", 5)
          .attr("cx", 200)
          .attr("cy", c.dy)

        f.append("text")
          .attr('id', c.mrid)
          .attr('class', textType(c.type))
          .attr("dx", 10)
          .attr("dy", c.dy+8)
          .text(c.label)
          .on("click", e => {

            d3.selectAll("#icons g g text").classed("selected", false)
            d3.selectAll("#paths path").classed("selected", false)

            d3.select(e.currentTarget).classed("selected", true)

            d3.selectAll("#paths path").filter(d => d.mridSource===e.currentTarget.id).classed("selected", d => {

              d3.select('#' + d.mridTarget).classed("selected", true)
            
              return true
          
            });

            d3.selectAll("#paths path").filter(d => d.mridTarget===e.currentTarget.id).classed("selected", d => {

              d3.select('#' + d.mridSource).classed("selected", true)
            
              return true
          
            })
          
          })

      })

    })

    d3.forceSimulation(rects.current)
      .force('charge', d3.forceManyBody().strength(-50))
      .force('center', d3.forceCenter(width/2, height/2))
      .force('collision', d3.forceCollide().radius(75))
      .on('tick', () => {
    
        d3.select("#icons").selectChildren("g").attr("transform", d => {

          moveLinksOfApp(d);
    
          return "translate(" + d.x + "," + d.y + ")";
  
        })
  
      })

    const dragstarted = (event) => {

    }

    const curvePointsOfLinkWithMovingSource = (link, movingSource, dy=0) => {
      
      let x, y, points;

      if (movingSource.x < link.end.x-200) {

        x = movingSource.x + 200;
        y = movingSource.y + dy;

        points = [
          [x, y],
          [x+50, y],
          [link.end.x-60, link.end.y],
          [link.end.x-10, link.end.y]
        ];

      } else if ((movingSource.x > link.end.x-200) && (movingSource.x < link.end.x)) {

        x = movingSource.x;
        y = movingSource.y + dy;

        points = [
          [x, y],
          [x-50, y],
          [link.end.x-60, link.end.y],
          [link.end.x-10, link.end.y]
        ];

      } else if ((movingSource.x > link.end.x) && (movingSource.x < link.end.x+200)) {

        x = movingSource.x + 200;
        y = movingSource.y + dy;

        points = [
          [x, y],
          [x+50, y],
          [link.end.x+260, link.end.y],
          [link.end.x+210, link.end.y]
        ];

      } else {
          
        x = movingSource.x;
        y = movingSource.y + dy;

        points = [
          [x, y],
          [x-50, y],
          [link.end.x+260, link.end.y],
          [link.end.x+210, link.end.y]
        ];
      }

      return points;
    }

    const curvePointsOfLinkWithMovingTarget = (link, movingTarget, dy=0) => {

      let x, y, points;
      
      if (movingTarget.x < link.start.x-200) {
        
        x = movingTarget.x + 200;
        y = movingTarget.y + dy;
        
        points = [
          [link.start.x, link.start.y],
          [link.start.x-50, link.start.y],
          [x+60, y],
          [x+10, y]
        ];
      
      } else if ((movingTarget.x > link.start.x-200) && (movingTarget.x < link.start.x)) {
        
        x = movingTarget.x;
        y = movingTarget.y + dy;
        
        points = [
          [link.start.x, link.start.y],
          [link.start.x-50, link.start.y],
          [x-60, y],
          [x-10, y]
        ];
      
      } else if ((movingTarget.x > link.start.x) && (movingTarget.x < link.start.x+200)) {
        
        x = movingTarget.x + 200;
        y = movingTarget.y + dy;
        
        points = [
          [link.start.x+200, link.start.y],
          [link.start.x+250, link.start.y],
          [x+60, y],
          [x+10, y]
        ];
      
      } else {
        
        x = movingTarget.x;
        y = movingTarget.y + dy;
        
        points = [
          [link.start.x+200, link.start.y],
          [link.start.x+250, link.start.y],
          [x-60, y],
          [x-10, y]
        ];
      }

      return points;
    }

    const moveLinksOfApp = (app, minimized=false) => {

      app.child.forEach(c => {

        const delta = minimized ? 18 : c.dy;
        
        d3.selectAll("#paths path").filter(d => d.mridSource===c.mrid).attr('d', d => {

          const link = links.current.find(l => l.mrid===d.mrid);

          link.start = {
            x: app.x,
            y: app.y + delta //+ c.dy
          }
          
          return curve(curvePointsOfLinkWithMovingSource(link, app, delta /*c.dy*/))

        })
      
        d3.selectAll("#paths path").filter(d => d.mridTarget===c.mrid).attr('d', d => {

          const link = links.current.find(l => l.mrid===d.mrid);
        
          link.end = {          
            x: app.x,
            y: app.y + delta //+ c.dy
          }
        
          return curve(curvePointsOfLinkWithMovingTarget(link, app, delta /*c.dy*/))
      
        })
      })
    }

    const dragged = (event) => {

      event.subject.x = event.x;
      event.subject.y = event.y;

		  d3.select("#" + event.subject.mrid).attr('transform', d => `translate(${event.subject.x},${event.subject.y})`);

      const maximized = d3.select("rect#" + event.subject.mrid).filter(".maximized")

      moveLinksOfApp(event.subject, maximized.empty());
     
    }

    const dragended = (event) => {

    }

    g.call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

    svg.select("#paths")
      .selectAll()
      .data(links.current)
      .join("path")
        .attr('class', 'link')
        .attr("id", d => d.mrid)
        .attr('marker-end', 'url(#arrow)')
        .attr('d', d => {

          const source = rects.current.flatMap(c => c.child).find(r => r.mrid===d.mridSource);
          const target = rects.current.flatMap(c => c.child).find(r => r.mrid===d.mridTarget);

          const sourceX = source.x;
          const sourceY = source.y + source.dy;
          const targetX = target.x;
          const targetY = target.y + target.dy;

          const link = links.current.find(l => l.mrid===d.mrid)

          link.start = {
            x: sourceX,
            y: sourceY
          }

          link.end = {
            x: targetX,
            y: targetY
          }

          return curve(curvePointsOfLinkWithMovingSource(link, link.start))

          // Ou return curve(curvePointsOfLinkWithMovingTarget(link, link.end))

        })
        .on("click", e => {

          d3.selectAll("#icons g g text").classed("selected", false);
          d3.selectAll("#paths path").classed("selected", false);

          d3.select(e.currentTarget).classed("selected", true);

          const link = links.current.find(l => l.mrid===e.currentTarget.id);

          d3.select('#' + link.mridSource).classed("selected", true);
          d3.select('#' + link.mridTarget).classed("selected", true);
          
        });

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
          <g id="minimize">
            <circle r="10" className="button" />
            <line x1="-4" y1="0" x2="4" y2="0" className="button" />
          </g>
          <g id="maximize">
            <circle r="10" className="button" />
            <line x1="-4" y1="0" x2="4" y2="0" className="button" />
            <line x1="0" y1="-4" x2="0" y2="4" className="button" />
          </g>
        </defs>
      </svg>
    </div>
  )
}

export default MySchema;

