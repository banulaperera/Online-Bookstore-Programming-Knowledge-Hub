const quizData = [
    {
        question: "What does HTML stand for?",
        a: "Hyper Text Markup Language",
        b: "Hypertext Management Language",
        c: "High Text Markup Language",
        d: "Hypertext Modeling Language",
        correct: "Hyper Text Markup Language"
    },

    {
        question: "What is CSS stands for?",
        a: "Color and style sheets",
        b: "Cascading style sheets",
        c: "Cascade Style Sheet",
        d: "None of above",
        correct: "Cascading style sheets"
    },
    {
        question: "Which type of JavaScript language is ___",
        a: "Object-Oriented",
        b: "Client side Scripting Language",
        c: "Query language",
        d: "Server side Scripting Language",
        correct: "Client side Scripting Language"
    },

    {
        question: "What is the purpose of a constructor in object-oriented programming?",
        a: "To create a new instance of a class",
        b: "To initialize the attributes of an object",
        c: "To define the methods of a class",
        d: "To create a subclass of a class",
        correct: "To initialize the attributes of an object"
    },

    {
        question: "Which of the following is not a valid data type in Java?",
        a: "Integer",
        b: "Float",
        c: "String",
        d: "Character",
        correct: "Character"
    },
    {
        question: "What is the full form of OOP?",
        a: "Object-Oriented Programming",
        b: "Online Order Processing",
        c: "Object Oriented Procedure",
        d: "Overriding Object Programming",
        correct: "Object-Oriented Programming"
    },
    {
        question: "Which of the following is not an object-oriented programming concept?",
        a: "Inheritance",
        b: "Polymorphism",
        c: "Encapsulation",
        d: "Linear programming",
        correct: "Linear programming"
    },
    {
        question: "Which of the following is used to define the structure of a web page?",
        a: "JavaScript",
        b: "JQuery",
        c: "HTML",
        d: "CSS",
        correct: "HTML"
    },

    {
        question: "Which of the following is not a data structure in Python?",
        a: "List",
        b: "Dictionary",
        c: "Tuple",
        d: "Stack",
        correct: "Stack"
    },

    {
        question: "Which of the following is not a comparison operator in programming?",
        a: "=",
        b: "==",
        c: "!=",
        d: "<=",
        correct: "="
    }
];

const startBar = document.getElementById('start-bar');
const start = document.getElementById('start');
const header = document.getElementById('header');
const quiz = document.getElementById('quiz');

start.addEventListener('click', ()=>{
    header.removeAttribute("style");
    startBar.style.display = 'none';
    var timeleft = 60;
    var timer = setInterval(function(){

        if(timeleft <= 0){
            clearInterval(timer);
            document.getElementById("timer").innerText = "Finished";

            let percentage = (score/quizData.length)*100; 

            quiz.innerHTML = `<h2 class="Quizheading"> Time is Up! </h2>
            <p>Questions: ${quizData.length}
            <p>Your Score: ${score}</p>
            <p id="percentage">Percentage: ${percentage}% </p>
            <button class="button" onclick="location.reload()">Try Again</button>`;

            if(percentage == 100){
            document.getElementById('percentage').style.color = 'green';
            }
            else{
                document.getElementById('percentage').style.color = 'red';
            }
        }
        else {
            document.getElementById("timer").innerText = " " + timeleft + "s";
        }

        timeleft -= 1;   
            
    }, 1000);

});

const timer = document.getElementById('timer');
const question = document.getElementById('question');
const answersArray = document.querySelector('.option-list');
const answer_a = document.getElementById('a_text');
const answer_b = document.getElementById('b_text');
const answer_c = document.getElementById('c_text');
const answer_d = document.getElementById('d_text');
const submit = document.getElementById('submit');
const quizNo = document.getElementById('quizNo');

let currentQuiz = 0;
let score = 0;

loadQuiz();
function loadQuiz(){  
    quizNo.innerText =   (currentQuiz+1) + " Of " + quizData.length + " Questions";
    question.innerText = quizData[currentQuiz].question;
    answer_a.innerHTML = quizData[currentQuiz].a;
    answer_b.innerHTML = quizData[currentQuiz].b;
    answer_c.innerHTML = quizData[currentQuiz].c;
    answer_d.innerHTML = quizData[currentQuiz].d;

    let options = answersArray.querySelectorAll(".answer");

    for(i=0; i < options.length; i++){
        options[i].setAttribute("onclick", "getSelectAnswer(this)");
    }
       
}

function getSelectAnswer(option){
    let correctIcon = `<div class="correctIcon"><i class="fas fa-check"></i></div>`;
    let incorrectIcon = `<div class="incorrectIcon"><i class="fas fa-times"></i></div>`;

    let answer = option.textContent;
    let correctAnswer = quizData[currentQuiz].correct;
    if(answer == correctAnswer){
        option.classList.add('correctAnswer');
        option.insertAdjacentHTML("beforeend", correctIcon);
        score++;
    }
    else{
        option.insertAdjacentHTML("beforeend", incorrectIcon);
        option.classList.add('incorrectAnswer')

        for(var i = 0; i < answersArray.children.length; i++){
          
            if(answersArray.children[i].textContent == correctAnswer){
                answersArray.children[i].classList.add('correctAnswer');
                answersArray.children[i].insertAdjacentHTML("beforeend", correctIcon);
            }
                        
        }
    }  
    for(var i = 0; i < answersArray.children.length; i++){

        answersArray.children[i].classList.add("disable");
                               
    }   
}


submit.addEventListener('click', () =>{

    let Alloption = answersArray.querySelectorAll(".answer");

    for(i=0; i < Alloption.length; i++){
        answersArray.children[i].classList.remove("disable");
        answersArray.children[i].classList.remove("correctAnswer");
        answersArray.children[i].classList.remove("incorrectAnswer");
    }

    currentQuiz++;
    if(currentQuiz < quizData.length){
        loadQuiz();
    }
    else{
        let percentage = (score/quizData.length)*100;
        let percentageRound = Math.round(percentage*100)/100; 

        quiz.innerHTML = `<h2 class="Quizheading"> You Completed Quiz Successfully! </h2>
        <p>Questions: ${quizData.length}
        <p>Your Score: ${score}</p>
        <p>Percentage: ${percentageRound}% </p>
        <p id="msg"></p>
        <button class="button" onclick="location.reload()">Try Again</button>`;

        if(percentage >= 75){
           document.getElementById('msg').innerText = "Excellent! Keep It Up.";
           document.getElementById('msg').style.color = 'green';
        }
        else if(percentage >= 50){
            document.getElementById('msg').innerText = "Fair! Improve It.";
            document.getElementById('msg').style.color = 'yellow';
        }
        else{
            document.getElementById('msg').innerText = "Bad! Try Again.";
            document.getElementById('msg').style.color = 'red';
        }
        
    }
})


