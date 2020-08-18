var database ,dog,dogImg,happydogImg
var position
//var form
var feed,add
var foodobj
var Feedtime
var Lastfeed
//Create variables here

function preload()

{
  dogImg = loadImage("images/dogImg.png")
  happydogImg = loadImage("images/dogImg1.png")

	//load images here
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();
 
  foodobj=new Food()
  dog = createSprite(560,240,8,8);
  dog.addImage(dogImg)
  dog.scale=0.2
  
 

  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);
feed = createButton("FEED DRAGO")
feed.position(500,15)
feed.mousePressed(feedDog)
add = createButton("ADD FOOD")
add.position(400,15)
add.mousePressed(AddFood)

} 



function draw(){
  background(46,139,87);
 foodobj.display()
 
 console.log(position)
 drawSprites();
  
  fill(255,255,254);
 textSize(15);

  // text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
 
  //add styles here

}
function readPosition(data){
  position = data.val();
  foodobj.updateFoodStock(position)
  
}

function showError(){
}

function writePosition(x){
  if(x>0){
    x=x-1
  }
  else{
    x=0
  }
  database.ref('/').set({
    'Food': x
  })

}
function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}
function feedDog(){
dog.addImage(happydogImg)
foodobj.updateFoodStock(foodobj.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobj.getFoodStock(),
   FeedTime:hour ()
 })
}