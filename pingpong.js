const jokeText = document.getElementById('joke');
const p1Button = document.getElementById('p1Button');
const p2Button = document.getElementById('p2Button');
const p1Display = document.getElementById('p1Display');
const p2Display = document.getElementById('p2Display');
const resetButton = document.getElementById('reset')
const playToSelect = document.querySelector('#playTo')

let p1Score = 0;
let p2Score = 0;
let winningScore = 3;
let isGameOver = false;

changeJokeText();


p1Button.addEventListener('click', function () {
    getJoke();
    // console.log(getJoke());
    // If one of the players has reached 5, the game can no longer continue 
    if (!isGameOver) {
        p1Score += 1;
        if (p1Score === winningScore) {
            isGameOver = true;
            p1Display.classList.add('has-text-success')
            p2Display.classList.add('has-text-danger')
            p1Button.disable = true;
            p2Button.disable = true;
        }
        p1Display.innerText = p1Score;
    }
})

p2Button.addEventListener('click', function () {
    if (!isGameOver) {
        p2Score += 1;
        if (p2Score === winningScore) {
            isGameOver = true;
            p2Display.classList.add('has-text-success')
            p1Display.classList.add('has-text-danger')
            p1Button.disable = true;
            p2Button.disable = true;
        }
        p2Display.innerText = p2Score;
    }
})

resetButton.addEventListener('click', function () {
    resetGame()
});

playToSelect.addEventListener('change', function () {
    // This just takes the root object's value
    winningScore = parseInt(this.value);
    resetGame();
})

function updateScores() {
    p1Display.innerText = p1Score;
    p2Display.innerText = p2Score;
}

function resetGame() {
    isGameOver = false;
    p1Score = 0;
    p2Score = 0;
    updateScores();
    p2Display.classList.remove('has-text-success', 'has-text-danger')
    p1Display.classList.remove('has-text-success', 'has-text-danger')
    p1Button.disable = false;
    p2Button.disable = false;
}

async function getJoke(){
    let jokeAPI = "https://v2.jokeapi.dev/joke/Any";
    let response = await fetch(jokeAPI);
    let jasonData = await response.json();

    return await jasonData["setup"] + " " + jasonData["delivery"]
}

async function changeJokeText(){
    jokeText.textContent = await getJoke();
}

