// getelement by ID for start and next button, only one should show at a time 
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainer = document.getElementById("question-container");
const landContainer = document.getElementById("land-container");
// need "start button" to show on initial page load
// need "next" button to show once question has been 'answered'


// #question - insert 'questions' into text area
// #answer-buttons - insert 'answers' into text areas
// class for "timer" - need to set interval 
startButton.addEventListener('click', startQuiz);
// function to 'begin quiz', should also start timer
function startQuiz(){
    console.log('started');
startButton.classList.add('hide');
landContainer.classList.add('hide');
questionContainer.classList.remove('hide');
};

// function to bring up the 'next question' 
// function nextQuestion()


// // will need an event listener so page will NOT refresh when 'answer' is selected
// function selectAnswer()


// will need questions / answers in an object 
