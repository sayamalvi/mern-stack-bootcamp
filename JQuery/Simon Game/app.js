const buttonColours = ["red", "blue", "green", "yellow"];

let userClick = [];
let pattern = [];

let level = 0;
let toggle = false;

$(document).keypress(function () {
    if (!toggle) {
        $('h1').html(`Level ${level}`);
        nextSequence();
        toggle = true;
    }
})

$('.btn').click(function () {
    let chosenColor = $(this).attr('id');

    userClick.push(chosenColor);
    playSound(chosenColor);
    animate(chosenColor);

    checkAnswer(userClick.length - 1);
});

function checkAnswer(currentLevel) {

    if (pattern[currentLevel] === userClick[currentLevel]) {

        if (userClick.length === pattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $('h1').html('Game Over. Press any key to restart');


        startOver();
    }

}

function nextSequence() {
    userClick = [];

    level++;
    $('h1').html(`Level ${level}`);

    const randomNumber = Math.floor(Math.random() * 4);
    const randomColor = buttonColours[randomNumber];
    pattern.push(randomColor);

    const btn = $(`div #${randomColor}`);
    $(btn).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);

};


function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
};

function animate(currentColor) {
    $(`div .${currentColor}`).addClass('pressed');
    setTimeout(() => {
        $(`div .${currentColor}`).removeClass('pressed');
    }, 100)
};


function startOver() {
    level = 0;
    pattern = [];
    toggle = false;
}