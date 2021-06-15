var canvas, backgroundImage;

var gameState =0;
var playerCount;
var allPlayers;
var distance ;
var database;
var CarsAtEnd=0;
var form, player, game;

var rank;

var cars, car1, car2, car3, car4;

var track, car1_img, car2_img, car3_img, car4_img;

function preload(){
  track = loadImage("images/track.jpg");
  car1_img = loadImage("images/car1.png");
  car2_img = loadImage("images/car2.png");
  car3_img = loadImage("images/car3.png");
  car4_img = loadImage("images/car4.png");
  ground = loadImage("images/ground.png");
  gold_img = loadImage("images/first.png");
  silver_img = loadImage("images/second.png");
  bronze_img = loadImage("images/Third.png");
  startbg = loadImage("images/startbg.png");
backgroundl = loadImage("images/background.jpg")
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(gameState === 0){
    background(startbg);
  }
  else{
    background(backgroundl)
  }
 
  if(playerCount === 4 && CarsAtEnd === 0){
    game.update(1);
    
  }
  if(gameState === 1){
   
    game.play();
   // game.getCarsAtEnd();
    if(CarsAtEnd === 4){
      game.update(2);
    }
   
  }
  
  
  if(gameState === 2 && CarsAtEnd === 4){
    
    game.displayRanks();
  }
 
}
