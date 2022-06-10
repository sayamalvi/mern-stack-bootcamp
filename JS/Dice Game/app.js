const imageOne = document.querySelector('.img1');
const imageTwo = document.querySelector('.img2');
let randomTwo = Math.floor(Math.random() * 6) + 1;
let randomOne = Math.floor(Math.random() * 6) + 1;
const winner = document.querySelector('h1');

imageOne.setAttribute('src', `/images/dice${randomOne}.png`);
imageTwo.setAttribute('src', `/images/dice${randomTwo}.png`);

if (randomOne > randomTwo) {
    winner.textContent = "🚩Player 1 Wins !";
}
else if (randomTwo > randomOne) {
    winner.textContent = "Player 2 Wins !🚩";
}
else {
    winner.textContent = "Its a draw !";
}


