//TO DO **** Let users save their high scores to the app
//TO DO **** look up common quiz questions 
//TO DO **** change 'alert' to modal? 


// LATER DOS*** add dark mode

//  variables for buttons, and quiz forms throughout page
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const finishButton = document.getElementById("finish-btn");
const scoreButton = document.getElementById("score-btn");
const questionContainer = document.getElementById("question-container");
const landContainer = document.getElementById("land-container");
const scoreContainer = document.getElementById("score-container");
const answerButtons = document.getElementById("answer-buttons");
const questionElement = document.getElementById("question");
// const finalScore = JSON.parse(localStorage.getItem("timer"));
const userInitials = document.querySelector("input");
const logInitials = document.querySelector("h2");
// const button = document.getElementsByClassName("btn")

// timer vars
const timerEl = document.getElementById("timer");

// original start time was '5 minutes' for whole page, in future - can use seconds value * minutes wanted.. let the code do the math for you. 
// let startTime = 60 * 5;
let startTime = 60 * 5;
let theTimer; 
let mixQuestions, allQuestionIndex


// event listener, once 'start' is clicked, quiz will start 
startButton.addEventListener('click', startQuiz);
// adds loop for multiple questions
nextButton.addEventListener('click', () => {
    allQuestionIndex++
    nextQuestion()
})
// below will stop timer once 'answer' is selected - current time is set to 5 min, change time to 30 sec / question?
answerButtons.addEventListener('click', () => clearInterval(theTimer));
// below 'stops' the timer once answer is selected, re-starts once 'next' is selected 
nextButton.addEventListener('click' , () => stopWatch());
// once all questions have been answered the score button appears, event listener below brings up 'form' to 'log score'
finishButton.addEventListener('click', () => logScore());
scoreButton.addEventListener('click', () => writeScore());


// below currently writes [html object el] to correct position 
function highScore() {
    let timer = localStorage.getItem("timer")
    let p = document.createElement('p')
    // logInitials.textContent = userInitials;
    p.textContent = timer; 
    document.body.appendChild(p)
  }

function writeScore(){
    localStorage.setItem("timer", userInitials.value)
    highScore();
}

// convert from seconds to min:sec
function updateTimerEl(){
    let minutes = Math.floor(startTime / 60);
    let seconds = startTime % 60;
    timerEl.innerHTML = minutes + ":" + seconds;
}
// function for timer 
function stopWatch(){
    theTimer = setInterval(function(){
        startTime--;
        updateTimerEl();
        if (startTime === 0){
            clearInterval(theTimer)
            // currently 'alert's 'times up', change to Modal 
            alert("Times up")
        }
        // 1000 milleseconds = timer will 'tick' every 1 (normal) SECOND 
    }, 1000)
}
// function to 'begin quiz', should also start timer
function startQuiz(){
    startButton.classList.add('hide');
    landContainer.classList.add('hide');
    questionContainer.classList.remove('hide');
    stopWatch();
    mixQuestions = questions.sort(() => Math.random() -.5)
    allQuestionIndex = 0;
    nextQuestion();
};

// resets everything once user has selected answer, takes away answer buttons
function nextQuestion(){
    resetState()
    showQuestion(mixQuestions[allQuestionIndex])
}

// below func turns the 'answers' listed under 'questions' var into 'buttons'
function showQuestion(question){
    questionElement.innerText = question.question
    // loops through questions / answers
    question.answers.forEach(answer => {
        // creates buttons(by using .createEl) for each answer 
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        // if answer is correct - adds data attribute to button ***THIS WILL BE IMPORTANT LATER****
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
        answerButtons.appendChild(button)
    })
}

// hides 'next' button before answer is selected, lets the 'answer buttons' show strings below in questions object, 
function resetState(){
    resetAll(document.body);
    nextButton.classList.add('hide');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

// below resets all fields once quiz is finished, brings users to the 'final screen'
function logScore(){
    resetAll(document.body);
    // nextButton.classList.add('hide')
    questionContainer.classList.add('hide');
    scoreContainer.classList.remove('hide');
    scoreButton.classList.remove('hide');
    finishButton.classList.add('hide');
}

// function below should 'move things forward'
// make 'next' button appear once an answer has been selected
function selectAnswer(e){
    const userChoice = e.target;
    const correct = userChoice.dataset.correct;
    setStatus(document.body, correct)
    if (mixQuestions.length > allQuestionIndex + 1){
        nextButton.classList.remove('hide')
    }
   // changed button to 'log your score' , need to add form for intials 
    else{
        finishButton.innerText = "Finish Quiz!"
        finishButton.classList.remove('hide');
    }
}


// should change color if correct or incorrect
function setStatus(element, correct){
    resetState(element)
    // alert.innerText = "correct!";
    if (correct){
        element.classList.add('correct');
    }
    // takes 10 seconds off of total time left if answer is 'wrong'
     else if 
         (startTime = startTime - 9, element.classList.add('wrong'));
    }

    
    // below 'resets' everything once a user has selected an answer
function resetAll (element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}



// will need question / answers format below 
const questions = [
    {
        question: "What is my name?",
        answers:[
        {text: "Toni", correct: true},
        {text: "Jack Bauer", correct: false},
        {text: "Bonnie", correct: false},
        {text: "Eric", correct: false}
        ]
    },
    {
        question: "What is Jack's name?",
        answers:[
        {text: "Toni", correct: false},
        {text: "Jack Bauer", correct: true},
        {text: "Bonnie", correct: false},
        {text: "Eric", correct: false}
        ]
    },
    {
        question: "What Eric's name?",
        answers:[
        {text: "Toni", correct: false},
        {text: "Jack Bauer", correct: false},
        {text: "Bonnie", correct: false},
        {text: "Eric", correct: true}
        ]
    },
    {
        question: "What is Bonnie's name?",
        answers:[
        {text: "Toni", correct: false},
        {text: "Jack Bauer", correct: false},
        {text: "Bonnie", correct: true},
        {text: "Eric", correct: false}
        ]
    },
    {
        question: "What does HTML stand for?",
        answers:[
        {text: "Hypertext Markup Language", correct: true},
        {text: "Hacking Text Machine Learning", correct: false},
        {text: "How To Meet Ladies", correct: false},
        {text: "How Text Meets Logic", correct: false}
        ]
    }
]