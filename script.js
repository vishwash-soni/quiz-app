const questions = [
    {
        question : "Which keyword is used to define a function in Python?",
        option : [
            {text : "func" , correct : true},
            {text : "function" , correct : false},
            {text : "def" , correct : false},
            {text : "lambda" , correct : false},
        ]
    },
    {
        question : `What is the correct syntax to output "Hello, World!" in Python?`,
        option : [
            {text : `echo "Hello, World!"` , correct : false},
            {text : `printf("Hello, World!")` , correct : false},
            {text : `print("Hello, World!")` , correct : true},
            {text : `cout << "Hello, World!"` , correct : false},
        ]
    },
    {
        question : "Which of the following data types is immutable in Python?",
        option : [
            {text : "list" , correct : false},
            {text : "set" , correct : false},
            {text : "tuple" , correct : true},
            {text : "dictionary" , correct : false},
        ]
    },
    {
        question : "How do you start a comment in Python?",
        option : [
            {text : "//" , correct : false},
            {text : "#" , correct : true},
            {text : `!!` , correct : false},
            {text : "/* */" , correct : false},
        ]
    }
];

const questionElement = document.getElementById("question");
const optionElement = document.getElementById("option_buttons");
const next_btnElement = document.getElementById("next_btn");

const start_btn = document.getElementById("start_btn")
const quizElement = document.querySelector(".quiz")

let currentQuestionIdx = 0;
let score = 0;

function startQuiz(){
    start_btn.style.display = "none";
    quizElement.style.display = "block";
    currentQuestionIdx =0;
    score = 0;
    next_btnElement.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    reset();
    let currentQuestion = questions[currentQuestionIdx];
    let questionNum = currentQuestionIdx;
    questionElement.innerHTML = questionNum+1+". "+currentQuestion.question;

    currentQuestion.option.forEach( ans => {
        const button = document.createElement("button");
        button.innerHTML = ans.text;
        button.classList.add("btn");
        optionElement.appendChild(button);
        if(ans.correct){
            button.dataset.correct = ans.correct;
        }
        button.addEventListener("click",selectAns)
    });
}
function reset(){
    next_btnElement.style.display = "none";
    while(optionElement.firstChild){
        optionElement.removeChild(optionElement.firstChild);
    }
}

function selectAns(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("wrong");
    }
    Array.from(optionElement.children).forEach(button =>{
        if(button.dataset.correct == "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    next_btnElement.style.display = "block";
}

next_btnElement.addEventListener("click",()=>{
    if(currentQuestionIdx < questions.length){
        handleNextBtn();
    }
    else{
        startQuiz();
    }
});

function handleNextBtn(){
    currentQuestionIdx++;
    if(currentQuestionIdx < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

function showScore(){
    reset();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    next_btnElement.innerHTML = "Play Again";
    next_btnElement.style.display = "block"
    
    next_btnElement.addEventListener("click", () => {
        next_btnElement.style.display = "none"; // Hide "Play Again" button
        quizElement.style.display = "none"; // Hide quiz section
        start_btn.style.display = "block"; // Show start button again
    }, { once: true });
}

start_btn.addEventListener("click",startQuiz);
quizElement.style.display = "none";
start_btn.style.display = "block";
// startQuiz();