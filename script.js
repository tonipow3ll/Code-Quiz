$( document ).ready(function() { 

    //  variables for buttons, and quiz forms throughout page
    const startButton = document.getElementById("start-btn");
    const nextButton = document.getElementById("next-btn");
    const finishButton = document.getElementById("finish-btn");
    const scoreButton = document.getElementById("score-btn");
    const replayButton = document.getElementById("replay-btn");
    const questionContainer = document.getElementById("question-container");
    const landContainer = document.getElementById("land-container");
    const scoreContainer = document.getElementById("score-container");
    const answerButtons = document.getElementById("answer-buttons");
    const questionElement = document.getElementById("question");
    const userInitials = document.querySelector("input");
    const logInitials = document.querySelector(".writeScore");
    // const button = document.getElementsByClassName("btn")
    
    // timer vars
    const timerEl = document.getElementById("timer");
    
    // original start time was 5 min for whole page, changed to 10 min.
    let startTime = 60 * 10;
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
    replayButton.addEventListener('click', () => rePlay());
    
    
    // Writes users initials to the page
    function highScore() {
        logInitials.textContent = userInitials.value;
        document.innerHTML.text(timer);
        const finalScore = JSON.parse(localStorage.getItem(timer));
        document.innerHTML.createElement(finalScore.value);
    }
    
    function writeScore(){
        localStorage.setItem("highScores", JSON.stringify(timer))
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
            // 1000 milleseconds = timer will 'tick' every 1 (normal) SECOND, changed to 500 - page loads slightly faster
        }, 500)
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
    
    // hides 'next' button before answer is selected, lets the 'answer buttons' show as strings below in questions object, 
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
        replayButton.classList.remove('hide');
    }
    // function for resetting everything once 'replay' button is clicked 
    function rePlay(){
        resetAll(document.body);
        scoreContainer.classList.add('hide');
        scoreButton.classList.add('hide');
        replayButton.classList.add('hide');
        clearInterval(theTimer);
        startQuiz();
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
       // button to 'finish quiz', will bring up the 'log score' form if no more questions remain
        else{
            finishButton.innerText = "Finish Quiz!"
            finishButton.classList.remove('hide');
        }
    }
    
    
    // should change color if correct or incorrect ADD SOMETHING HERE TO CREATE A 'SCOREBOARD'
    function setStatus(element, correct){
        resetState(element)
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
    
    
    
    // questions/answers object
    const questions = [
        {
            question: "What is the basic definition of a 'Boolean'",
            answers:[
            {text: "A true or false statement", correct: true},
            {text: "A scary ghost", correct: false},
            {text: "A yes or no statement", correct: false},
            {text: "A statement in Javascript", correct: false}
            ]
        },
        {
            question: "CSS stands for?",
            answers:[
            {text: "Centering Shouldn't Suck", correct: false},
            {text: "Cascading Style Sheets", correct: true},
            {text: "Collection of Stackoverflow Snippers", correct: false},
            {text: "Competitive Selector Syntax", correct: false}
            ]
        },
        {
            question: "Inside which element would we put a JavaScript src file?",
            answers:[
            {text: "<javascript>", correct: false},
            {text: "<java>", correct: false},
            {text: "<js>", correct: false},
            {text: "<script>", correct: true}
            ]
        },
        {
            question: "Which is the correct way for adding a single line comment in a javascript file?",
            answers:[
            {text: "# comment goes here ", correct: false},
            {text: "<-- comment goes here -->", correct: false},
            {text: "// Comment goes here ", correct: true},
            {text: " 'comment goes here' ", correct: false}
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
        },
        
        {
            question: "JQuery is considered a....",
            answers:[
            {text: "Javascript Framework", correct: false},
            {text: "Java Library", correct: false},
            {text: "Javascript Library", correct: true},
            {text: "Java Framework", correct: false}
            ]
        },
        {
            question: "Bootstrap is considered a....",
            answers:[
            {text: "CSS Library", correct: false},
            {text: "CSS Framework", correct: true},
            {text: "HTML / CSS file", correct: false},
            {text: "Strapping on shoes", correct: false}
            ]
        },
        {
            question: "What are the three ways to target elements on a page?",
            answers:[
            {text: "<tag>, .class, #id", correct: true},
            {text: "Tag, Class, and Hashtag", correct: false},
            {text: "[], {}, $ ", correct: false},
            {text: "//, /* */, <--   -->", correct: false}
            ]
        },
        {
            question: "In CSS - what is the default value of the position property?",
            answers:[
            {text: "fixed", correct: false},
            {text: "Absolute", correct: false},
            {text: "Relative", correct: false},
            {text: "Static", correct: true},
            ]
        },
        {
            question: "What does API stand for?",
            answers:[
            {text: "Apps Pushing Intelligence", correct: false},
            {text: "Application Program Interface", correct: true},
            {text: "Application Personal Interchange", correct: false},
            {text: "Apps Programming Intelligence", correct: false}
            ]
        }
    ]
    // END SCRIPT
    })