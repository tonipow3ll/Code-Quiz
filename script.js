//TO DO ****once answer is 'selected', display notification (correct or incorrect),
//TO DO ****
// need "next" button to show once question has been 'answered'

const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainer = document.getElementById("question-container");
const landContainer = document.getElementById("land-container");
const answerButtons = document.getElementById("answer-buttons")
const questionElement = document.getElementById("question")
// const button = document.getElementsByClassName("btn")


let mixQuestions, allQuestionIndex


// #question - insert 'questions' into text area
// #answer-buttons - insert 'answers' into text areas
// class for "timer" - need to set interval 

// event listener, once 'start' is clicked, quiz will start 
startButton.addEventListener('click', startQuiz);
// adds loop for multiple questions
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    nextQuestion()
})

// function to 'begin quiz', should also start timer
function startQuiz(){
    console.log('started');
startButton.classList.add('hide');
landContainer.classList.add('hide');
questionContainer.classList.remove('hide');
mixQuestions = questions.sort(() => Math.random() -.5)
allQuestionIndex = 0;
nextQuestion();
};


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
        // if answer is correct - adds data attribute to button 
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
        answerButtons.appendChild(button)
    })
}

// hides 'next' button before answer is selected, lets the 'answer buttons' show strings below in questions object, 
function resetState(){
    nextButton.classList.add('hide');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}
// function below should 'move things forward'
// make 'next' button appear once an answer has been selected
function selectAnswer(e){

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