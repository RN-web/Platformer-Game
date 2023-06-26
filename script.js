const canvas = document.getElementById("screen"); 
const ctx = canvas.getContext("2d");
const ctx2 = canvas.getContext("2d");

let gameState = 1;

let x = 0;
let y = 0;
let radius = 30;
let playerSpeed = 7;
let grounded = false;

let xE = 250;
let yE = 475;
let widthE = 50;
let lengthE = 50;
let pattern = 0;


let downPressed = false;
let upPressed = false;
let rightPressed = false;
let leftPressed = false;
let spcPressed = false;

let gameCondition = false;

//Game loop
function drawGame(){
    //requestAnimationFrame(drawGame);
    
    if (gameState == 1){
        clearScreen();
        onGround();
        movement();
        jumpCheck()
        inBounds();
        drawEnemy(0, 0);
        winGame();
        drawPlayer();
        enemyCollision();
        enemyMovement();
    }
    else if(gameState == 2){
        winScreen();
    }
    else if(gameState == 3){
        loseScreen();
}
}

function jumpCheck(){
    if(y < 325){
        spcPressed = false
    }
}

function movement(){
    if(downPressed == true){
        y = y + playerSpeed;
    }
    if(upPressed == true){
        y = y - playerSpeed;
    }
    if(rightPressed == true){
        x = x + playerSpeed;
    }
    if(leftPressed == true){
        x = x - playerSpeed;
    }

    if(spcPressed == true){
        y = y - playerSpeed * 3;
    }
    y = y + playerSpeed*0.7;
}

function inBounds(){
    if(y < radius){
        y = radius;
    }
    if(y > canvas.height - radius){
        y = canvas.height - radius;
    }
    if(x < radius){
        x = radius;
    }
    if(x > canvas.width - radius){
        x = canvas.width - radius;
    }
}

function onGround(){
    if(y == canvas.height - radius){
        grounded = true;
    }
    if(y != canvas.height - radius){
        grounded = false;
    }
}

function clearScreen(){
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawPlayer(){
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(x, y, radius,0, Math.PI * 2);
    ctx.fill();

}

function drawEnemy(){
    ctx2.fillStyle = "red";
    ctx2.fillRect(xE, yE, widthE, lengthE);
}
function drawEnemy(xM, yM){
    ctx2.fillStyle = "red";
    ctx2.fillRect(xE + xM, yE + yM, widthE, lengthE);
}

function enemyMovement(){
    if(xE == 250){
        pattern = 0;
    }
    else if(xE == 750){
        pattern = 1;
    }

    if(pattern == 0){
        xE += 5;
    }
    else if(pattern == 1){
        xE -= 5;
    }
}

function enemyCollision(){
    if((x >= xE - radius && x <= xE + 50 + radius) && (y >= yE - radius)){
        console.log('you lose');
        gameState = 3;
    }
}

function winGame(){
    ctx2.fillStyle = "lime";
    ctx2.fillRect(1050, 425, 115, 100);
    if(x >= 1050 + radius && y >= 425 + radius){
        console.log('you win');
        gameState = 2;
    }
}

document.body.addEventListener("keydown", keyDown);
document.body.addEventListener("keyup", keyUp);

function keyDown(event) {
    if(event.keyCode == 40){
        downPressed = true;
    }
    if(event.keyCode == 38){
        upPressed = true;
    }
    if(event.keyCode == 39){
        rightPressed = true;
    }
    if(event.keyCode == 37){
        leftPressed = true;
    }

    if(grounded == true){
        if(event.keyCode == 32){
            spcPressed = true;
        }
    }
    
}

function keyUp(event) {
    if(event.keyCode == 40){
        downPressed = false;
    }
    if(event.keyCode == 38){
        upPressed = false;
    }
    if(event.keyCode == 39){
        rightPressed = false;
    }
    if(event.keyCode == 37){
        leftPressed = false;
    }

    
    if(event.keyCode == 32){
        spcPressed = false;
    }
    


}

function winScreen(){
    document.getElementById("title").innerHTML = "You Win!";
}

function loseScreen(){
    document.getElementById("title").innerHTML = "You Lose :(";
}

//drawGame();
setInterval(drawGame,1000/60);


