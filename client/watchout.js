// start slingin' some d3 here.

var locations = [];
var numEnemies = 10;
var width = 800;
var height = 500;
var radius = 10;

var randomizeLocations = function(){
  var location;
  for(var i = 0; i < numEnemies; i++){
    location = [Math.floor(Math.random()*(width-2*radius) + radius), Math.floor(Math.random()*(height-2*radius)+radius)];
    locations[i] = location;
  }
}

var initializeBoard = function(){

  var board = d3.select("body").append("svg");
  board.attr("width", width).attr("height", height).classed("gameBoard", true);
  
  randomizeLocations();
  
  board.selectAll('circles').data(locations).enter().append('circle')
       .attr('cx', function(d){return d[0];})
       .attr('cy', function(d){return d[1];})
       .attr('r', radius)
       .style('color', 'black');  
}

initializeBoard();


