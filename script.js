var questionCounter = 0
var currentScore = 0
var timeRemaining = 240

var questionsArr = [
    {questionText: "Question 1",
    //add colors to represent correct/incorrect answers
        answerArr: [
            {
                choice: "Q1 C1",
                value: true
            },
            {
                choice: "Q1 C2",
                value: false
            },
            {
                choice: "Q1 C3",
                value: false
            },
            {
                choice: "Q1 C4",
                value: false
            },
        ]
    },
    {questionText: "Question 2",
        answerArr: [
            {
                choice: "Q2 C1",
                value: false
            },
            {
                choice: "Q2 C2",
                value: true
            },
            {
                choice: "Q2 C3",
                value: false
            },
            {
                choice: "Q2 C4",
                value: false
            },
        ]
    },
    {questionText: "Question 3",
        answerArr: [
            {
                choice: "Q3 C1",
                value: false
            },
            {
                choice: "Q3 C2",
                value: false
            },
            {
                choice: "Q3 C3",
                value: true
            },
            {
                choice: "Q3 C4",
                value: false
            },
        ]
    }
]

$("#start").click(function() {
    $("#start").addClass('hide')
    $("#answers").removeClass('hide')
    $("#timer-label").text(`Time Remaining:`)
    $("#question").text(questionsArr[0].questionText)
    $("#answer-choice-1").text(questionsArr[0].answerArr[0].choice)
    $("#answer-choice-2").text(questionsArr[0].answerArr[1].choice)
    $("#answer-choice-3").text(questionsArr[0].answerArr[2].choice)
    $("#answer-choice-4").text(questionsArr[0].answerArr[3].choice)
    timeCounter();
});

$("#next").click(function() {
    $("#answers").removeClass('hide')
    $("#answer-feedback").text('')
    questionCounter ++
    $("#question").text(questionsArr[questionCounter].questionText)
    $("#answer-choice-1").text(questionsArr[questionCounter].answerArr[0].choice)
    $("#answer-choice-2").text(questionsArr[questionCounter].answerArr[1].choice)
    $("#answer-choice-3").text(questionsArr[questionCounter].answerArr[2].choice)
    $("#answer-choice-4").text(questionsArr[questionCounter].answerArr[3].choice)
});

function timeAppend() {
    var minutesLeft = Math.floor(timeRemaining / 60);
    var secondsLeft = (timeRemaining % 60);
    $("#timer").text(`${minutesLeft} : ${secondsLeft}`);
};

function timeCounter() {
    if (timeRemaining > 0) {
        interval = setInterval(function() {
            $("#timer").removeClass("red-text")
            timeRemaining--;
            timeAppend();
        }, 1000);
    }
    else {
        alert (`You're out of time! Your score is ${currentScore}!`)
    };
};

function correctAnswer() {
    $("#answers").addClass('hide')
    $("#answer-feedback").text(`You're correct! You earned 5 points.`)
    currentScore += 5
    $("#score").text(`Current Score: ${currentScore}`)
    $("#next").removeClass('hide')
};

function wrongAnswer() {
    $("#answers").addClass('hide')
    $("#answer-feedback").text(`Sorry, that's incorrect! 5 seconds have been deducted.`)
    $("#timer").text(-5)
    $("#timer").addClass("red-text")
    timeRemaining -= 5
    $("#next").removeClass('hide')
};

$("#answer-choice-1").click(function(){
    if (questionsArr[questionCounter].answerArr[0].value) {
        correctAnswer();
    }
    else {
        wrongAnswer();
    }
});

$("#answer-choice-2").click(function(){
    if (questionsArr[questionCounter].answerArr[1].value) {
        correctAnswer();
    }
    else {
        wrongAnswer();
    }
});

$("#answer-choice-3").click(function(){
    if (questionsArr[questionCounter].answerArr[2].value) {
        correctAnswer();
    }
    else {
        wrongAnswer();
    }
});

$("#answer-choice-4").click(function(){
    if (questionsArr[questionCounter].answerArr[3].value) {
        correctAnswer();
    }
    else {
        wrongAnswer();
    }
});


// Attempt at creating multiple tries
// give less points for each subsequent try?
// var triesRemaining = 3
// $("#answer-choice-1").click(function(){
//     if (questionsArr[questionCounter].answerArr[0].value) {
//         alert ("You're correct!")
//     }
//     else {
//         triesRemaining--
//         if (triesRemaining=0) {
//             alert (`Incorrect, you have no tries remaining`)
//         }
//         else {
//             alert (`You're wrong! You have ${triesRemaining} tries remaining.`)
//         }
//     }
// });


// timer for quiz

// highscores in local storage