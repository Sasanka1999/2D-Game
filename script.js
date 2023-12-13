// Load a sound
var runSound = new Audio("run.mp3");
runSound.loop = true;
var jumpSound = new Audio("jump.mp3");
var deadSound = new Audio("dead.mp3");

function keyCheck(event){

    // enter
    if (event.which == 13) {
        if(runWokerId == 0){
            runWokerId = setInterval(run,100);
            runSound.play();
            moveBackgroundId = setInterval(moveBackground,100);

            blockWorkerId = setInterval(createBlock, 100);
            moveBlockWorkerId = setInterval(moveBlock,100);

            scoreWorkerId = setInterval(updateScore,100);
        }
        
    }

    // space
    if (event.which == 32) { 
        if(jumpWokerId == 0){
            clearInterval(runWokerId);
            runWokerId = -1;
            runSound.pause();

            jumpWokerId = setInterval(jump, 100);
            jumpSound.play();
        }      
    }
}

var player = document.getElementById("player");

//run
var runImageNumber = 1;
var runWokerId = 0;

function run(){

    runImageNumber++;

    if(runImageNumber == 9){
        runImageNumber = 1;
    }

    player.src = "Run (" + runImageNumber + ").png";
}

//jump
var jumpImageNumber = 1;
var jumpWokerId = 0;
var playerMarginTop = 385;

function jump(){

    jumpImageNumber++;

    if(jumpImageNumber<=7){
        playerMarginTop = playerMarginTop - 30;
        player.style.marginTop = playerMarginTop+"px";
    }

    if(jumpImageNumber>=8){
        playerMarginTop = playerMarginTop + 30;
        player.style.marginTop = playerMarginTop+"px";
    }


    if(jumpImageNumber==13){
        jumpImageNumber = 1;
        clearInterval(jumpWokerId);
        jumpWokerId = 0;
        runWokerId = setInterval(run, 100);
        runSound.play();

        if (moveBackgroundId == 0){
            moveBackgroundId = setInterval(moveBackground, 100);
        }

        if (blockWorkerId == 0){
            blockWorkerId = setInterval(createBlock, 100);
        }

        if (moveBlockWorkerId == 0){
            moveBlockWorkerId = setInterval(moveBlock, 100);
        }

        if (scoreWorkerId == 0){
            scoreWorkerId = setInterval(updateScore,100);
        }
    }

    player.src="Jump ("+ jumpImageNumber +").png";
}

//Move Background
var background = document.getElementById("background");
var backgroundX = 0;
var moveBackgroundId = 0;
function moveBackground(){

    backgroundX = backgroundX - 20;

    background.style.backgroundPositionX = backgroundX+"px";
}

//Create block
var blockWorkerId = 0;
var blockMarginleft = 700;
var blockNumber = 1;

function createBlock(){
    var block = document.createElement("div");
    block.className = "block";
    block.id = "block"+blockNumber;
    blockNumber++;

    var gap = Math.random() * (1000-400) + 400;
    
    blockMarginleft = gap + blockMarginleft;

    block.style.marginLeft = blockMarginleft + "px";

    document.getElementById("background").appendChild(block);
}

//Move blocks
var moveBlockWorkerId = 0;

function moveBlock(){

    for (var i = 1; i <= blockNumber; i++){
        var currentBlock = document.getElementById("block"+i);
        var currentMarginLeft = currentBlock.style.marginLeft;

        var newMarginLeft = parseInt(currentMarginLeft) - 20;
        currentBlock.style.marginLeft = newMarginLeft + "px";

        //alert(newMarginLeft);
        //187-47

        if(newMarginLeft < 187 & newMarginLeft> 52){

            //alert(playerMarginTop);
            //325
            //alert("dead")

            if(playerMarginTop > 325){

                clearInterval(runWokerId);
                runSound.pause();

                clearInterval(jumpWokerId);
                jumpWokerId = -1;

                clearInterval(scoreWorkerId);
                clearInterval(moveBackgroundId);
                clearInterval(blockWorkerId);
                clearInterval(moveBlockWorkerId);

                deadWokerId = setInterval(dead, 100);
                deadSound.play();
                //alert("dead")
            }
        }
    }
}

//Dead
var deadWokerId = 0;
var deadimageNumber = 1;

function dead(){
    deadimageNumber++;

    if(deadimageNumber==11){
        deadimageNumber=10;

        player.style.marginTop = "385px";

        document.getElementById("endScreen").style.visibility = "visible";
        document.getElementById("endScore").innerHTML = newScore;
    }

    player.src = "Dead (" +deadimageNumber+ ").png";
}

//Score
var scoreId = document.getElementById("score");
var scoreWorkerId = 0;
var newScore = 0;

function updateScore(){
    newScore++;
    scoreId.innerHTML = newScore;
}

//page reloade
function reload(){
    location.reload();
}
