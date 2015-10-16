// start slingin' some d3 here.

var locations = [];
var numEnemies = 10;
var width = 800;
var height = 500;
var radius = 10;
var turnTime = 1500;

var randomizeLocations = function(){
  var location;
  for(var i = 0; i < numEnemies; i++){
    location = [Math.floor(Math.random()*(width-2*radius) + radius), Math.floor(Math.random()*(height-2*radius)+radius)];
    locations[i] = location;
  }
}

var dragmove = function(d) {
    d3.select(this)
      .attr("cy", ((d3.event.sourceEvent.pageY) - d3.select('svg')[0][0].offsetTop - radius/2 + "px"))
      .attr("cx", ((d3.event.sourceEvent.pageX) - d3.select('svg')[0][0].offsetLeft - radius/2 + "px"));
}

var drag = d3.behavior.drag()
    .on("drag", dragmove);


var initializeBoard = function(){

  var board = d3.select("body").append("svg");
  board.attr("width", width).attr("height", height).classed("gameBoard", true);
  
  randomizeLocations();
  
  board.selectAll('circle').data(locations).enter().append('circle')
       .attr('cx', function(d){return d[0];})
       .attr('cy', function(d){return d[1];})
       .attr('r', radius)
       .style('color', 'black');  

  setTimeout(moveEnemies, turnTime);

  /*board.data().enter().append('circle')
       .attr("class", "player")
       .attr('cx', 390)
       .attr('cy', 240)
       .attr('r', radius)
       .style('color', 'red');*/

  board.selectAll('#player').data([[400, 250]]).enter().append('circle')
       .attr('cx', function(d){return d[0];})
       .attr('cy', function(d){return d[1];})
       .attr('r', radius)
       .attr('id', 'player')
       .call(drag);
}


var moveEnemies = function(){
  randomizeLocations();
  d3.select('svg').selectAll('circle').data(locations).transition().duration(turnTime)
    .attr('cx', function(d){return d[0];})
    .attr('cy', function(d){return d[1];})
  
  //setTimeout(moveEnemies, turnTime);
}

initializeBoard();





