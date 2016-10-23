/* Start of Function */

$(document).ready(function(){
	
	/* Chart 1 */
	lineChart();
	/* Chart 2 */
	doughnutChart();
	/* Chart 3 */
	cloudWord();

});

/* Line Chart */
function lineChart(){
	//* Define Graph *//
	var graph = new Rickshaw.Graph( {
	    element: document.querySelector("#chart-1"), 
	    width: 500, 
	    height: 250,
	    renderer: 'line',
	    stroke: true,
	    dataURL: 'application/generate_data/count_hourly.json',
	    //onData: function(d) { d[0].data[0].y = 80; return d },
	    series: new Rickshaw.Series.FixedDuration([{
	        color: 'red',
	        stroke: 'rgba(0,0,0,0.15)',
	        name: 'Ahok - Djarot',
	    }, {
	        color: 'blue',
	        stroke: 'rgba(0,0,0,0.15)',
	        name: 'Anies - Sandiaga',
	    },  {
	        color: 'green',
	        stroke: 'rgba(0,0,0,0.15)',
	        name: 'Agus - Sylviana',
	    }
	    ], undefined, {
	    	timeInterval: 5000,
	    	maxDataPoints: 24,
	    	timeBase: 1
	    }),
	});

	d3.json("application/generate_data/count_hourly.json", function(error, data) {
    	data.forEach(function(d) {
	        d.jam = parseDate(d.jam);
	        d.tweet = +d.tweet;
	    });
	});

	for(var i = 0; i < 25; i++){
	    //addRandomData(graph);
	}

	setInterval(function () {

	    //addRandomData(graph);
	    graph.render();

	}, 5000);

	function addRandomData(chart) {
	    var data = {
	        'Ahok - Djarot': Math.floor(Math.random() * 500) + 100,
	        'Anies - Sandiaga': Math.floor(Math.random() * 500) + 100,
	        'Agus - Sylviana': Math.floor(Math.random() * 500) + 100
	    };
	    chart.series.addData(data);
	}

	//* Hover Detail *//
	var hoverDetail = new Rickshaw.Graph.HoverDetail( {
	    graph: graph,
	    xFormatter: function(x) { return x + " hours"},
	    yFormatter: function(y) { return Math.floor(y) + " tweets" }
	} );
	//* X Axis *//
	var time = new Rickshaw.Fixtures.Time();
	var seconds = time.unit('hour');

	var xAxis = new Rickshaw.Graph.Axis.Time({
	    graph: graph,
	    timeUnit: seconds
	});
	xAxis.render();
	//* Y Axis *//
	var yAxis = new Rickshaw.Graph.Axis.Y( {
	    graph: graph,
	    orientation: 'left',
	    tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
	    element: document.getElementById('y_axis'),
	} );
	yAxis.render();
	//* Get Data *//
	/*new Rickshaw.Graph.JSONP({
	        element: document.querySelector('#chart-1'),
	        dataURL: '/application/generate_data/count_hourly.json',
	        onData: function(d) {
	                d[0].data[0].y += 1;
	                return d;
	        },
	        onComplete: function(transport) {
	                var graph = transport.graph;
	                var detail = new Rickshaw.Graph.HoverDetail({ graph: graph });
	        }
	});*/
	//* Draw Graph *//
	graph.render();
};

/* Doughnut Chart */
function doughnutChart(){
	var width = 500,
    height = 250 - 29; // adjust for height of input bar div
	var color = d3.scale.category20();
	// draw and append the container
	var svg = d3.select("#chart-2").append("svg")
	  .attr("width", width).attr("height", height);
	// set the thickness of the inner and outer radii
	var min = Math.min(width, height);
	var oRadius = min / 2 * 0.9;
	var iRadius = min / 2 * 0;
	// construct default pie laoyut
	var pie = d3.layout.pie().value(function(d){ return d; }).sort(null);
	// construct arc generator
	var arc = d3.svg.arc()
	  .outerRadius(oRadius)
	  .innerRadius(iRadius);
	// creates the pie chart container
	var g = svg.append('g')
	var g = svg.append('g')
	  .attr('transform', function(){
	    if ( window.innerWidth >= 960 ) var shiftWidth = width / 2;
	    if ( window.innerWidth < 960 ) var shiftWidth = width / 3;
	    return 'translate(' + shiftWidth + ',' + height / 2 + ')';
	  })
	// generate random data
	var data = makeData(+3);
	// enter data and draw pie chart
	var path = g.datum(data).selectAll("path")
	  .data(pie)
	  .enter().append("path")
	    .attr("class","piechart")
	    .attr("fill", function(d,i){ return color(i); })
	    .attr("d", arc)
	    .each(function(d){ this._current = d; })
	function render(){
	  // generate new random data
	  data = makeData(+3);
	  // add transition to new path
	  g.datum(data).selectAll("path").data(pie).transition().duration(1000).attrTween("d", arcTween)
	  // add any new paths
	  g.datum(data).selectAll("path")
	    .data(pie)
	  .enter().append("path")
	    .attr("class","piechart")
	    .attr("fill", function(d,i){ return color(i); })
	    .attr("d", arc)
	    .each(function(d){ this._current = d; })
	  // remove data not being used
	  g.datum(data).selectAll("path")
	    .data(pie).exit().remove();
	}
	render();
	setInterval(render,5000);
	function makeData(size){
	  return d3.range(size).map(function(item){
	   return Math.random()*100;
	  });
	};
	// Store the displayed angles in _current.
	// Then, interpolate from _current to the new angles.
	// During the transition, _current is updated in-place by d3.interpolate.
	function arcTween(a) {
	  var i = d3.interpolate(this._current, a);
	  this._current = i(0);
	  return function(t) {
	    return arc(i(t));
	  };
	}
};

function cloudWord(){
	var frequency_list = [
		{"text":"study","size":40*2},
		{"text":"motion","size":15*2},
		{"text":"forces","size":10*2},
		{"text":"electricity","size":15*2},
		{"text":"movement","size":10*2},
		{"text":"relation","size":5*2},
		{"text":"things","size":10*2},
		{"text":"force","size":5*2},
		{"text":"ad","size":5*2},
		{"text":"energy","size":85*2},
		{"text":"living","size":5*2},
		{"text":"nonliving","size":5*2}];


    var color = d3.scale.linear()
            .domain([0,1,2,3,4,5,6,10,15,20,100])
            .range([getRandomColor(),
             getRandomColor(),
             getRandomColor(),
             getRandomColor(),
             getRandomColor(),
             getRandomColor(),
             getRandomColor(),
             getRandomColor(),
             getRandomColor(),
             getRandomColor(),
             getRandomColor(),
             getRandomColor()]);

    d3.layout.cloud().size([450, 200])
            .words(frequency_list)
            .rotate(0)
            .fontSize(function(d) { return d.size; })
            .on("end", draw)
            .start();

    function draw(words) {
        d3.select("#chart-3").append("svg")
                .attr("width", 500)
                .attr("height", 250)
                .attr("class", "wordcloud")
                .append("g")
                // without the transform, words words would get cutoff to the left and top, they would
                // appear outside of the SVG area
                .attr("transform", "translate(170,130)")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return d.size + "px"; })
                .style("fill", function(d, i) { return color(i); })
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
    }
};

function getRandomColor() {
    var letters = '3456789ABC';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 10)];
    }
    return color;
};