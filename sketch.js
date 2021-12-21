//Create variables here
var dog, sadDog, happyDog,garden, washroom, database
var food, foodStock
var fedtime, lastFed, currentTime
var feed, addFood
var foodObj
var gameState, readState

function preload()
{
	//load images here
  sadDog = loadImage("images/dog.png")
  happyDog = loadImage("images/happydog.png")
  garden = loadImage("images/Garden.png")
  washroom = loadImage("images/washroom.png")
  bedroom = loadImage("images/bedroom.png")
}

function setup() {
	createCanvas(800, 700);
  database = firebase.database()
  foodObj = new Food()
  foodStock = database.ref("Food")
  foodStock.on("value".readStock)
  fedTime= database.ref("feedtime")
  feedtime.on("value",function(data){
    lastFed = data.val()
  })
    dog = createSprite(200,400,150,150)
    dog.addImage(sadDog)
    dog.scale = 0.5

    feed = createSprite("feedthedog")
    feed.position(700,95)
    feed.mousePressed(feedDog)

  addFood = createButton("addFood")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)
  
  
  
}


function draw() {  

currentTime = hour()
if(currentTime == (lastFed+1)){
  update("playing")
  foodObj.garden()
}
else if(currentTime==(lastFed+2)){
  update("sleeping")
  foodObj.bedroom()

}
else if (currentTime > (lastFed+2) && currentTime<=(lastFed+4)){
  update("bathing")
  foodObj.washroom()
}
else{
  update("hungry")
  foodObj.display()
}
if (gameState != "hungry"){
  feed.hide()
  addFood.hide()
  dog.remove()
}
else{
  feed.show()
  addFood.show()
  dog.addImage("sadDog")
}
  drawSprites();
  //add styles here

}
function readStock(data){
  foodS = data.val()
  foodObj.updatefoodStock(foodS)
}

function feedDog(){
  dog.addImage(happyDog)
  foodObj.updatefoodStock(foodObj.getFoodStock()-1)
  database.ref("/").update({
    food:foodObj. getFoodStock(),
    foodTime:hour(),
    foodState:"hungry"

  })
}
function addFood(){
  foodS++
  database.ref("/").update({
    food:foodS
  })
}
function update(state){
  database.ref("/").update({
    gamestate:state
  })
}