// start slingin' some d3 here.

var locations = [];
var numEnemies = 30;
var width = 800;
var height = 500;
var radius = 10;
var turnTime = 1500;
var highScore = 0;
var currentScore = 0;
var collisions = 0;
var borderPatrolR = 10;

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

  board.selectAll('#borderPatrol').data([[0+borderPatrolR,0+borderPatrolR]]).enter().append('path')
       .attr('x', function(d){return d[0];})
       .attr('y', function(d){return d[1];})
       .attr('r', borderPatrolR)
       .attr('class', 'enemy')
       .attr('id', 'borderPatrol')
       //.attr("d", "m9.74101,0.23739l-2.2662,7.05768l-6.47481,2.91349l6.79856,1.94233l2.20144,5.89228l1.94232,-5.69805l7.05768,-2.84861l-6.92791,-2.46056l-2.33108,-6.79856l0,0z");
       .attr("d", "m10,0 -2.2662,7.05768l-6.47481,2.91349l6.79856,1.94233l2.20144,5.89228l1.94232,-5.69805l7.05768,-2.84861l-6.92791,-2.46056l-2.33108,-6.79856l0,0z");

}


var borderPatrol1 = function() {
  d3.select('svg').selectAll('#borderPatrol').data([[width-borderPatrolR, 0+borderPatrolR]]).transition().duration(turnTime)
    .attr('x', function(d){return d[0]})
    .attr('y', function(d){return d[1]})
    .attr('d', function(d){return 'm' + d[0] + ',' + (d[1] - radius) + '-2.2662,7.05768l-6.47481,2.91349l6.79856,1.94233l2.20144,5.89228l1.94232,-5.69805l7.05768,-2.84861l-6.92791,-2.46056l-2.33108,-6.79856l0,0z';})
    
  setTimeout(borderPatrol2, turnTime)
}

var borderPatrol2 = function(){
    d3.select('svg').selectAll('#borderPatrol').data([[width-borderPatrolR, height-borderPatrolR]]).transition().duration(turnTime)
    .attr('x', function(d){return d[0]})
    .attr('y', function(d){return d[1]})      
    .attr('d', function(d){return 'm' + d[0] + ',' + (d[1] - radius) + '-2.2662,7.05768l-6.47481,2.91349l6.79856,1.94233l2.20144,5.89228l1.94232,-5.69805l7.05768,-2.84861l-6.92791,-2.46056l-2.33108,-6.79856l0,0z';});
    setTimeout(borderPatrol3, turnTime);
}

var borderPatrol3 = function(){
    d3.select('svg').selectAll('#borderPatrol').data([[0+borderPatrolR, height-borderPatrolR]]).transition().duration(turnTime)
     .attr('x', function(d){return d[0]})
    .attr('y', function(d){return d[1]})     
      .attr('d', function(d){return 'm' + d[0] + ',' + (d[1] - radius) + '-2.2662,7.05768l-6.47481,2.91349l6.79856,1.94233l2.20144,5.89228l1.94232,-5.69805l7.05768,-2.84861l-6.92791,-2.46056l-2.33108,-6.79856l0,0z';});
    setTimeout(borderPatrol4, turnTime);
}

var borderPatrol4 = function(){
    d3.select('svg').selectAll('#borderPatrol').data([[0+borderPatrolR, 0+borderPatrolR]]).transition().duration(turnTime)
     .attr('x', function(d){return d[0]})
    .attr('y', function(d){return d[1]})     
      .attr('d', function(d){return 'm' + d[0] + ',' + (d[1] - radius) + '-2.2662,7.05768l-6.47481,2.91349l6.79856,1.94233l2.20144,5.89228l1.94232,-5.69805l7.05768,-2.84861l-6.92791,-2.46056l-2.33108,-6.79856l0,0z';});
    setTimeout(borderPatrol1, turnTime);
}




  window.addEventListener('keydown', function(e){
     e.preventDefault();

  var topOffset = d3.select('svg')[0][0].offsetTop + radius/2;
  var leftOffset = d3.select('svg')[0][0].offsetLeft + radius/2;

  var yPos = +d3.select("#player").attr("cx") - topOffset;
  var xPos = +d3.select("#player").attr("cx") - leftOffset;
  
  
 //  if(xPos < radius){
 //    d3.selectAll('#player')
 //       .attr('cx', +d3.select("#player").attr("cx") - 5);
 //  }
 // else if (xPos > width - radius){
 //    xPos = width-radius;
 //  }
  
 //  if(yPos < radius){
 //    yPos = radius;
 //  } else if (yPos > height - radius){
 //    yPos = height - radius;
 //  }

  if (e.keyCode === 37) {
    var xPos = +d3.select("#player").attr("cx");
    if(xPos > radius+5){
      d3.selectAll('#player').transition().duration(50)
       .attr('cx', xPos-10);
    }
  }

  if (e.keyCode === 38) {
    var yPos = +d3.select("#player").attr("cy");
    if(yPos > radius+6){
      d3.selectAll('#player').transition().duration(50)
       .attr('cy', yPos-10);
    }
  }

  if (e.keyCode === 39) {
    var xPos = +d3.select("#player").attr("cx");
    if(xPos < width - radius - 5){
      d3.selectAll('#player').transition().duration(50)
       .attr('cx', xPos+10);
    }
  }

  if (e.keyCode === 40) {
    var yPos = +d3.select("#player").attr("cy");
    if(yPos < height - radius - 5){
      d3.selectAll('#player').transition().duration(50)
       .attr('cy', yPos+10);
    }
  }
})


// window.addEventListener('keydown', function(e){
//   if (e.keyCode === 38) {
//       d3.selectAll('#player')
//        .attr('cy', +d3.select("#player").attr("cy") - 5);
//   }
// })


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

var audio = new Audio("grunt.WAV");

var deathChecker = function(){
  var xComps = [];
  var yComps = [];
  
  var xPlayer = d3.select('#player').attr('cx').replace('px','');
  var yPlayer = d3.select('#player').attr('cy').replace('px','');
  
  var enemies = d3.selectAll('.enemy:not(#borderPatrol)');
  enemies.each(function(){
    xComps.push(d3.select(this).attr('cx'));
    yComps.push(d3.select(this).attr('cy'));
  });
  xComps.push(d3.selectAll('#borderPatrol').attr('x'));
  yComps.push(d3.selectAll('#borderPatrol').attr('y'));
  for (var i=0; i<xComps.length; i++) {
    if (Math.abs(xPlayer - xComps[i]) < (2*radius-4)) {
      if(Math.abs(yPlayer - yComps[i]) < (2*radius-4)) {
        collisions++;
        d3.select(".collisions").select("span").text(collisions);
        d3.select(".gameBoard").style("background-color", "red");
        setTimeout(deathChecker, 500);
        currentScore = 0;
        setTimeout(function(){d3.select(".gameBoard").style("background-color", "white")},20);
        d3.select(".current").select("span").text(currentScore);
        audio.play();
        return;
      }
    }
  }
  setTimeout(deathChecker, 10);
};
borderPatrol4();
deathChecker();





