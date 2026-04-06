var started = false;
let level = 0;
let userClickedPattern = [];
let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").on("click", function () {

    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    sound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

})

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {

        sound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);


        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;

    $("h1").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(200).fadeOut(200).fadeIn(200);

    sound(randomChosenColour)

}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function sound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    gamePattern = [];
    level = 0;
    started = false;

}
