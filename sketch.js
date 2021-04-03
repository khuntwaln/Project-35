var dog, dogImage, happyDog, happyDogImage, foodS, foodStock;
var database;
var sum = 0;

function preload(){
    dogImage = loadImage("Dog.png");
    happyDogImage = loadImage("happydog.png");
}

function setup() {
 
  var canvas = createCanvas(500,500);

  database = firebase.database();
  console.log(database);

  dog = createSprite(250,250,10,10);
  dog.addImage(dogImage);
  dog.scale = 0.5;
    
  foodStock = database.ref('Food')
  foodStock.on("value",readStock);
}

function draw() {
 
  background(46,139,87);  
  
  if(keyDown(UP_ARROW) && foodS>0){
    foodS = foodS - 1;
    writeStock(foodS);
    dog.addImage(happyDogImage);
    }
    else {
    dog.addImage(dogImage); 
    }

  drawSprites();
  textSize(20);
  stroke(2);
  fill('black');
  text("Food Remaining: " + foodS,120,30);
  text("Note: Press UP_ARROW key to feed dog",50,480);
  
}

function readStock(data){
  foodS = data.val();
  }

function writeStock(x){

  database.ref('/').update({
  Food:x
  })
}

