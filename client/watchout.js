// start slingin' some d3 here.

var locations = [];
var numEnemies = 20;
var width = 800;
var height = 500;
var radius = 10;
var turnTime = 1500;
var highScore = 0;
var currentScore = 0;
var collisions = 0;

var randomizeLocations = function(){
  var location;
  for(var i = 0; i < numEnemies; i++){
    location = [Math.floor(Math.random()*(width-2*radius) + radius), Math.floor(Math.random()*(height-2*radius)+radius)];
    locations[i] = location;
  }
}

var dragmove = function(d) {
    var topOffset = d3.select('svg')[0][0].offsetTop + radius/2;
    var leftOffset = d3.select('svg')[0][0].offsetLeft + radius/2;

    var yPos = ((d3.event.sourceEvent.pageY) - topOffset);
    var xPos = ((d3.event.sourceEvent.pageX) - leftOffset);

    if(xPos < radius){
      xPos = radius;
    } else if (xPos > width - radius){
      xPos = width-radius;
    }
    if(yPos < radius){
      yPos = radius;
    } else if (yPos > height - radius){
      yPos = height - radius;
    }


    d3.select(this)
      .attr("cy", yPos + "px")
      .attr("cx", xPos + "px");
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
       .classed('enemy', true)
       .style('color', 'black');  

  setTimeout(moveEnemies, turnTime);

  board.selectAll('#player').data([[width/2, height/2]]).enter().append('circle')
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
    .attr('cy', function(d){return d[1];});
  currentScore += 100;
  d3.select(".current").select("span").text(currentScore);
  if(currentScore > highScore){
    highScore = currentScore;
    d3.select(".highscore").select("span").text(highScore);
  }
  setTimeout(moveEnemies, turnTime);
}

initializeBoard();

var deathChecker = function(){
  var xComps = [];
  var yComps = [];
  
  var xPlayer = d3.select('#player').attr('cx').replace('px','');
  var yPlayer = d3.select('#player').attr('cy').replace('px','');
  
  var enemies = d3.selectAll('.enemy');
  enemies.each(function(){
    xComps.push(d3.select(this).attr('cx'));
    yComps.push(d3.select(this).attr('cy'));
  });
  for (var i=0; i<xComps.length; i++) {
    if (Math.abs(xPlayer - xComps[i]) < (2*radius-4)) {
      if(Math.abs(yPlayer - yComps[i]) < (2*radius-4)) {
        collisions++;
        d3.select(".collisions").select("span").text(collisions);
        setTimeout(deathChecker, 500);
        currentScore = 0;
        d3.select(".current").select("span").text(currentScore);
        return;
      }
    }
  }
  setTimeout(deathChecker, 10);
};

deathChecker();




