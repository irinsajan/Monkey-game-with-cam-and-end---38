//Global Variables
var monkey, jungle;
var monkeyAnimation, stoneImage, bananaImage, jungleImage;
var score = 0;

var edges;
var lives = 2;
var gameState = "play";



function preload(){
  monkeyAnimation = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png",
  "Monkey_05.png","Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png")
  jungleImage = loadImage("jungle.jpg");
  stoneImage = loadImage("stone.png");
  bananaImage = loadImage("banana.png"); 
}


function setup() {
  createCanvas(displayWidth,displayHeight);

  jungle = createSprite(displayWidth/2,displayHeight/2);
  jungle.addImage(jungleImage);
  //jungle.velocityX = -1;
  jungle.scale = 2;


  monkey = createSprite(80,displayHeight-20);
  monkey.addAnimation("monkey", monkeyAnimation);
  monkey.scale = 0.2;
  monkey.velocityX = 3;
  
  invGround = createSprite(displayWidth/2,displayHeight-10,displayWidth,20);
  invGround.visible = false;
  invGround.velocityX = 3;
  

  bananaGroup = new Group();
  stoneGroup = new Group();

  //edges = createEdgeSprites();
}


function draw(){

if (gameState==="play"){
  background(255); 

  camera.position.x = monkey.x+displayWidth/2-80;
  camera.y = displayHeight/2;

  if (jungle.x<monkey.x+displayWidth/2-200){
    jungle.x = camera.position.x;
  }

  if (keyDown("space")){
    monkey.velocityY = -10;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  
  spawnBananas();
  spawnStones();

  for(var i=0; i<bananaGroup.length; i++){
    if (bananaGroup.get(i).isTouching(monkey)){
      bananaGroup.get(i).destroy();
      score = score+2;
    }
  
   }
   
  if (stoneGroup.isTouching(monkey)){
    monkey.scale = 0.1;
    lives = lives - 1;
  }

  switch (score){
    case 10: monkey.scale = 0.15;
    break;
    case 20: monkey.scale = 0.16;
    break;
    case 30: monkey.scale = 0.17;
    break;
    case 40: monkey.scale = 0.18;
    break;
    case 50: monkey.scale = 0.2;
    break;
    default: break;
  }

  if(lives===0){
    gameState = "end";
  }
  
  

  monkey.collide(invGround);
  drawSprites();

  textSize(20);
  fill(255);
  text("Score: "+score,camera.position.x,100);
}
else if (gameState==="end"){
  background(0);
  textSize(30);
  fill("yellow");
  text("Game End",camera.position.x,displayHeight/2);
  
}
}


function spawnBananas(){
  if (camera.position.x%100===0){
    var banana = createSprite(camera.position.x+displayWidth/2,displayHeight/2);
    banana.addImage(bananaImage);
    //banana.velocityX = -4;
    banana.scale = 0.07;
    banana.y = Math.round(random(displayHeight/2-100,displayHeight/2+100));
    banana.lifetime = displayWidth;
    bananaGroup.add(banana);
  }
}

function spawnStones(){
  if (camera.position.x%200==0){
    var stone = createSprite(camera.position.x+displayWidth/2+100,displayHeight-60);
    stone.addImage(stoneImage);
    //stone.velocityX = -4;
    stone.scale = 0.2;
    stone.lifetime = displayWidth;
    stoneGroup.add(stone);
  }
}
