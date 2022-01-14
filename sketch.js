var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost=createSprite(300,300)
  ghost.addImage(ghostImg)
  ghost.scale=0.3

  doorsGroup=new Group()
  climbersGroup=new Group()
  invisibleBlockGroup=new Group()
}

function draw() {
  background(200);
  
if(gameState==="play"){

    if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("space")){
    ghost.velocityY=-10

    }

    ghost.velocityY=ghost.velocityY+0.9

  if(keyDown("right_arrow")){

    ghost.x=ghost.x+4
  }

  if(keyDown("left_arrow")){

    ghost.x=ghost.x-4
  }

  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0
  }

  if(ghost.y>=600 || invisibleBlockGroup.isTouching(ghost)){
    gameState="end"
  }


    spawnDoors()

    drawSprites()

}



else if(gameState==="end"){

  textSize(50)
  stroke("green")
  fill("red")
  text("Game Over",200,300)

}

  
}

function spawnDoors() {

if(frameCount %100 === 0 ){

door=createSprite(Math.round(random(175,450)),0)
door.addImage(doorImg)
door.velocityY=2

climber=createSprite(door.x,door.y+50)
climber.addImage(climberImg)
climber.velocityY=2

invisibleBlock=createSprite(climber.x,climber.y+15)
invisibleBlock.visible=false
invisibleBlock.velocityY=2
invisibleBlock.debug=true

ghost.depth=door.depth
ghost.depth+=1

door.lifetime=350
climber.lifetime=350

doorsGroup.add(door)
climbersGroup.add(climber)
invisibleBlockGroup.add(invisibleBlock)


}




}








