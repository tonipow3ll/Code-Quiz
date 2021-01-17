const username = document.getElementById("name")
const scoreBtn = document.getElementById("score-btn")
const finalScore = document.getElementById("timer")
const mostRecentScore = localStorage.getItem("timer")

const highScore = JSON.parse(localStorage.getItem("timer")) || [];
console.log(highScores)

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
    scoreBtn.disabled = !username.value;
});

saveHighScore = e => {
    e.preventDefault();

    const score ={
        score: mostRecentScore,
        name: username.value
    };
    highScore.push(score);
    console.log(score);
}