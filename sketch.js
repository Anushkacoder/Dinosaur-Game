var dino;
var cactusgroup;
var cloudgroup;
var gamestate = 'play';
var score = 0;
var highscore = 0;
var touches = [];
function preload(){
    trex = loadAnimation (' trex1.png', 'trex3.png', ' trex4.png');
  trextouched = loadAnimation ('trex_collided.png');
    land = loadAnimation ('ground2.png');
   clouda = loadAnimation ('cloud.png');
  cactusa = loadAnimation ('obstacle1.png');
  cactusb = loadImage('obstacle2.png');
  cactusc = loadImage('obstacle3.png');
  cactusd = loadImage('obstacle4.png');
  cactuse = loadImage('obstacle5.png');
  cactusf = loadImage('obstacle6.png');
  gameend = loadImage('gameOver.png');
  gameend1 = loadImage('restart.png');
  sound1 = loadSound('checkPoint.mp3');
  sound2 = loadSound('die.mp3');
  sound3 = loadSound('jump.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  dino = createSprite(50,height/2,30,30);
   dino.addAnimation('t',trex);
  dino.addAnimation('t2',trextouched);
  dino.scale = 0.5;
  dino.debug = false;
  dino.setCollider("rectangle",0,0,30,80,25);
  //dino.setCollider("rectangle",10,0,80,80,0);
  //dino.setCollider("circle",0,0,30);
  ground = createSprite(width/2,height/2,1000,1);
  ground.addAnimation('l', land);
  ground2 = createSprite(width/2,height/2+5,width,1);
  ground2.visible = false;
// extraground = createSprite(350,100,300,1);
  over1 = createSprite(width/2,height/4,20,20);
  over1.scale = 0.5;
  over2 = createSprite(width/2,height/4+50,20,20);
  over2.scale = 0.5;
  cactusgroup = new Group();
   if (dino.isTouching(cactusgroup)){
    dino.velocityY = -15;
    sound3.play();
  }
  cloudgroup = new Group();
}

function draw() {
  background('white');
  if (gamestate == 'play'){
  if ((touches.length > 0 || keyDown('space')) && dino.y > height/2-30){
    dino.velocityY = -10;
    touches = [];
  }
    // var v = zeroes();
    // console.log(v);
   if (score > highscore){
   highscore = score;
    }
  dino.velocityY = dino.velocityY+1; 
  ground.velocityX = -7 - Math.round(score/100);
  cactusgroup.setVelocityXEach(ground.velocityX);
  dino.collide(ground2);
  if ( ground.x < 0){
    ground.x = 200;
  }
      if (frameCount%100 == 0){
  var  p =  Math.round(random(50,70));
  cloud1 = createSprite(width+50,p,20,20);
  cloud1.addAnimation('c1', clouda);
  cloud1.velocityX = -3;
  cloud1.scale = 0.5;
  cloudgroup.add(cloud1);  
  cloud1.lifetime = 200;
  }
  if (frameCount%70 == 0){
    cactus1 = createSprite(width+20,height/2-10,20,20);
    cactus1.velocityX = -4;
    cactus1.scale = 0.5;
    cactus1.lifetime = 150;
    cactusgroup.add(cactus1);
   var r = Math.round(random(1,6));
  switch(r){
    case 1 : cactus1.addAnimation('o1',cactusa);
      cactus1.scale = 0.6;
      break;
    case 2 : cactus1.addImage(cactusb);
      cactus1.scale = 0.4;
      break;
    case 3 : cactus1.addImage(cactusc);
      cactus1.scale = 0.4;
      break;
    case 4 : cactus1.addImage(cactusd);
      cactus1.scale = 0.4;
      break;
    case 5 : cactus1.addImage(cactuse);
      cactus1.scale = 0.4;
      break;
    case 6 : cactus1.addImage(cactusf);
      cactus1.scale = 0.4;
      break;
    default: break;
   }//end of switch
  }//end of if (cactus)
    dino.changeAnimation('t',trex);
      if (dino.isTouching(cactusgroup)){
    gamestate = 'end';
        //dino.velocityY = -10;
        sound2.play();
      }
    over1.visible = false;
    over2.visible = false;
    if (score%100 == 0){
      sound1.play();
    }
     score = score+0.5;
  }//end of gamestate play
  text('HIGH SCORE:',20,50);
  text(zeroes()+Math.round(highscore),100,50);
  text(zeroes()+Math.round(score),width-50,50);
  
  if(gamestate == 'end'){
      dino.velocityY = 0;
      ground.velocityX = 0;
      cactusgroup.setVelocityXEach(0);
      cactusgroup.setLifetimeEach(-1);
      cloudgroup.setVelocityXEach(0);
      cloudgroup.setLifetimeEach(-1);
      dino.changeAnimation('t2',trextouched);
      over1.visible = true;
      over2.visible = true;
      over1.addImage(gameend);
      over2.addImage(gameend1);
    if (mousePressedOver(over2) || touches.length > 0){
      gamestate = 'play';
      cactusgroup.destroyEach();
      cloudgroup.destroyEach();
      score = 0;
      touches = [];
    }
  }
  // console.log(Math.round(random(1,5)));
 // console.log(getFrameRate());
  drawSprites();
}
function zeroes(){
  if(score == 0){
    return "00000";
  }
  else if(score > 0 && score < 10){
    return "0000";
  }
  else if(score >= 10 && score <= 99){
    return "000";
  }
  else if(score >= 100 && score <= 999){
    return "00";
  }
  else if(score >= 1000 && score <= 9999){
    return "0";
  }
  else{
    return "";
  }
}