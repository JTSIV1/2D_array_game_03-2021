/*

Rules for how to play:

- Navigate the map using the arrow keys to collect 10 points
- Try to beat your previous time
- Change your color by pressing C
- Reset the game by pressing R

Challenges:

1. Get player movement working in all directions

Optional:
2. Disable player movement if the goal is reached
3. Add a new cell type - a trap that makes the player lose
4. Make the goal change location after it's reached, add a score system
5. Come up with more ideas!

*/
let grid;

let grid1 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 1, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 1, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

let grid2 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

let grid3 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 0, 1, 1, 1],
  [1, 0, 1, 0, 1, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

let grid4 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

let CELL_SIZE = 40;

let playerRow = 1;
let playerCol = 1;

let goalRow;
let goalCol;

let color1;

let gameDone = false;
let win = false;
let points = 0;
let best = "--"

// Choses a grid, point location, and sets time, color, and more
function setup() {
  randomizeGrid();
  frameRate(30);
  createCanvas(400, 320);
  strokeWeight(2);
  ellipseMode(CORNER); //https://p5js.org/reference/#/p5/ellipseMode
  color1 = color(50, 50, 200);
  goalRow = floor(random(1, 7));
    goalCol = floor(random(1, 9));
    while(grid[goalRow][goalCol] == 1 || (goalRow == playerRow && goalCol == playerCol)){
      goalRow = floor(random(1, 7));
      goalCol = floor(random(1, 9));
  }
}

// Choses a random grid layout
function randomizeGrid(){
  gridNum = floor(random(1, 5));
  if(gridNum == 1){
    grid = grid1;
  }
  else if(gridNum == 2){
    grid = grid2;
  }
  else if(gridNum == 3){
    grid = grid3;
  }
  else if(gridNum == 4){
    grid = grid4;
  }
}

function draw() {
  
  //draw the grid
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] == 1) {
        fill(20); // black
      } else {
        fill(235); // white
      }
      square(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE);
    }
  }
  
  //draw the goal
  fill(50, 200, 50); //green
  circle(goalCol * CELL_SIZE, goalRow * CELL_SIZE, CELL_SIZE);
  
  //draw the player
  fill(color1); //blue
  circle(playerCol * CELL_SIZE, playerRow * CELL_SIZE, CELL_SIZE);
  
  // the order of drawing matters!
  // I want the grid to be on bottom
  // with the goal above the grid
  // and the player above to goal (if reached)
  
  //draw the text for points
  fill(255);
  textSize(24);
  text("You have " + points + " points", 10, 30);
  
  //draws the best time
  textSize(14);
  text("Best: " + best + " seconds", 280, 29);
  
  
  //check to see if player reached the goal
  if (playerRow == goalRow && playerCol == goalCol) {
    if(!gameDone){
      points++;
    }
    gameDone = true;
    fill(128); //gray
    rect(50, 50, 300, 150);
    fill(200, 50, 50); //red
    textSize(48);
    text("+1 Points", 75, 120);
    textSize(20);
    text("Press an arrow to continue", 75, 170);
  }
  
  //chechs if the player is done
  if(points >= 10){
    if(!win){
      seconds = floor(frameCount / 3) / 10;
    }
    win = true;
    fill(128); //gray
    rect(50, 50, 300, 150);
    fill(200, 50, 50); //red
    textSize(30);
    text("You finished in\n" + seconds + " seconds", 75, 100);
    textSize(18);
    text("Press R to Start Again", 75, 170);
    if(best == "--"){
      best = seconds;
    }
    else if(best >= seconds){
      best = seconds;
    }
  }
}

//adds a point and moves the goal
function addPoint(){
  if(gameDone && !win){
    gameDone = false;
    while(grid[goalRow][goalCol] == 1 || (goalRow == playerRow && goalCol == playerCol) && !win){
      goalRow = floor(random(1, 7));
      goalCol = floor(random(1, 9));
    }
  }
}

function keyPressed() {
  
  //if the player pressed down and they're not already at the bottom
  if (keyCode == DOWN_ARROW) {
    if (!(gameDone || win) && grid[playerRow + 1][playerCol] == 0 && playerRow < grid.length - 1) {
      playerRow += 1;
    }
    addPoint();
  }
  
  //if the player presses up and they can move right they move
  if (keyCode == UP_ARROW) {
    //if the cell below them is empty(0) / not a wall (1)
    if (!(gameDone || win) && grid[playerRow - 1][playerCol] == 0 && playerRow > 0) {
      playerRow -= 1;
    }
    addPoint();
  }
  
  //if the player presses right and they can move right they move
  if (keyCode == RIGHT_ARROW) {
    //if the cell below them is empty(0) / not a wall (1)
    if (!(gameDone || win) && grid[playerRow][playerCol + 1] == 0 && playerCol < grid[0].length) {
      playerCol += 1;
    }
    addPoint();
  }
  
  //if the player presses left and they can move right they move
  if (keyCode == LEFT_ARROW) {
    //if the cell below them is empty(0) / not a wall (1)
    if (!(gameDone || win) && grid[playerRow][playerCol - 1] == 0 && playerCol > 0) {
      playerCol -= 1;
    }
    addPoint();
  }
  
  //resets game when r is pressed
  if(keyCode == 82){ 
    randomizeGrid();
    frameCount = 0;
    playerRow = 1;
    playerCol = 1;
    points = 0;
    gameDone = false;
    win = false;
    while(grid[goalRow][goalCol] == 1 || (goalRow == playerRow && goalCol == playerCol)){
      goalRow = floor(random(1, 7));
      goalCol = floor(random(1, 9));
    }
  }
  
  //changes player color if c is pressed
  if(!(gameDone || win) && keyCode == 67){
    color1 = color(random(0,255), random(0,255), random(0,255));
  }
}