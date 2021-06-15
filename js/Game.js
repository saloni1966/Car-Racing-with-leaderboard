class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];

  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          //class40
          fill("red");
         
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
        else{
          fill("white")
        }
        textAlign(CENTER);
        textSize(20);
        text(allPlayers[plr].name, cars[index-1].x, cars[index-1].y + 75);
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10;
      player.update();
    }

    if(player.distance > 3800){
     gameState = 2;
    
     Player.updateCarsAtEnd();
     player.rank = CarsAtEnd;
     player.update();
    }
   
    drawSprites();
    }
  

  displayRanks(){
    //display the medals
    camera.position.y = 0;
    camera.position.x = 0;
    //background("lavender");
    imageMode(CENTER);

    Player.getPlayerInfo();

    image(bronze_img, displayWidth/-4, -100 + displayHeight/9, 200, 240);
    image(silver_img, displayWidth/4, -100 + displayHeight/10, 225, 270);
    image(gold_img, 0, -100, 250, 300);

    textAlign(CENTER);
    textSize(50);
    for(var plr in allPlayers){
        if(allPlayers[plr].rank === 1){
            text("1st: " + allPlayers[plr].name, 0, 100);
        }
       if(allPlayers[plr].rank === 2){
            text("2nd: " + allPlayers[plr].name, displayWidth/4, displayHeight/9 + 73);
        }
       if(allPlayers[plr].rank === 3){
            text("3rd: " + allPlayers[plr].name, displayWidth/-4, displayHeight/10 + 76);
        }
        if(allPlayers[plr].rank === 4)  {
            textSize(30);
            text("Honorable Mention: " + allPlayers[plr].name, 0, 225);
        }
    }
}
  
}
