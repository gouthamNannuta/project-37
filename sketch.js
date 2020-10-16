
var player;
var ground;

var diamondGroup;
var obstaclesGroup, obstacle1;

var PLAY=1;
var END=0;
var gamestate=PLAY;

var gameOver,Restart;

var score;
var count;


function preload(){

}

function setup() {
  canvas = createCanvas(displayWidth-20,displayHeight-200);
  
  var playeroptions={
    isStatic:false
  }
  player=createSprite(100,830,20,20,playeroptions);
  player.shapeColor="red";
  //player.velocityX=4;
   
  var options={
    isStatic:true
  }
  
  ground=createSprite(0,850,1000000,10,options);
  ground.shapeColor="red";
  ground.x = ground.width /2;
  ground.velocityX=-6; 
  
  
  diamondGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(255);
  var title = createElement('h2')
  title.html("It's goutham'sGame");
  title.position(displayWidth/2-50, 0);
  if(gamestate===PLAY){

      if(keyIsDown(32) && player.y> 780) {
        player.velocityY =-11;
      }
      player.velocityY = player.velocityY + 0.8
      if (ground.x < 0){
        ground.x = ground.width/2;
      }
      if (diamondGroup.isTouching(player)){
          score=score+50
          diamondGroup.destroyEach();
        }
      if (obstaclesGroup.isTouching(player)){
    gamestate=END;    
    }
      spawnDiamonds();
      spawnObstacles();
  }else if(gamestate===END){
    ground.velocityX=0;
    player.velocityY=0;
    obstaclesGroup.setVelocityXEach(0);
    diamondGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    diamondGroup.setLifetimeEach(-1);
    player.velocityX=0;
    textSize(50)
    text("Press UP_ARROW To Reset The Game",0,displayHeight/2);
    if(keyIsDown(UP_ARROW)){
      reset();
    }
  }
camera.position.x=player.x  
  textSize(40);
  text("Score: "+ score,700,50);
  player.collide(ground);
  
  drawSprites();
}

function spawnDiamonds() {
  if(frameCount % 65 === 0) {
   //for(i=2200; i<1100000; i=i+350){
 var diamond = createSprite(2200,830,15,15);
  
   // diamond.y = Math.round(random(790,830));
    diamond.velocityX = -11
    diamond.lifetime = 1000;
    diamondGroup.add(diamond);
  }
  
}

function spawnObstacles() {
  if(frameCount % 50 === 0) {
    var obstacle = createSprite(2200,795,10,100);
    obstacle.velocityX = -11      
    obstacle.lifetime = 1000;
    obstaclesGroup.add(obstacle);
  }
}
function reset(){
 gamestate=PLAY;
score=0;
diamondGroup.destroyEach();
obstaclesGroup.destroyEach();
}