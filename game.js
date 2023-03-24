var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var currentClicked = 0;

// generate the next color
function nextSequence(){
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// detect the click
$(".btn").click(function(e){
    var userChosenColour  = this.id;
    animatePress(userChosenColour);
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer();
});

// check the user's answer
function checkAnswer(){
    if(userClickedPattern[currentClicked] == gamePattern[currentClicked]){
        currentClicked++;
        if(currentClicked == gamePattern.length){
            currentClicked = 0;
            userClickedPattern = [];
            setTimeout(nextSequence, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game over. Press any key to restart");
        startOver();
    }
}

// renew the game
function startOver(){
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    currentClicked = 0;
}

// play the sound of a button
function playSound(id){
    var audio = new Audio("sounds/" + id + ".mp3");
    audio.play();
}

// animate a button when pressed
function animatePress(id){
    $("." + id).addClass("pressed");
    setTimeout(function() {
        $("." + id).removeClass("pressed");
    }, 80);
}

// start the game by pressing a button
$(document).keypress(function(){
    if(level === 0)
        nextSequence();
});
