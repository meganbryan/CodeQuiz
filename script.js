var questionCounter = 0
var currentScore = 0
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
    $("#next").removeClass('hide')
    $("#question").text(questionsArr[0].questionText)
    $("#answer-choice-1").text(questionsArr[0].answerArr[0].choice)
    $("#answer-choice-2").text(questionsArr[0].answerArr[1].choice)
    $("#answer-choice-3").text(questionsArr[0].answerArr[2].choice)
    $("#answer-choice-4").text(questionsArr[0].answerArr[3].choice)
});

$("#next").click(function() {
    questionCounter ++
    $("#question").text(questionsArr[questionCounter].questionText)
    $("#answer-choice-1").text(questionsArr[questionCounter].answerArr[0].choice)
    $("#answer-choice-2").text(questionsArr[questionCounter].answerArr[1].choice)
    $("#answer-choice-3").text(questionsArr[questionCounter].answerArr[2].choice)
    $("#answer-choice-4").text(questionsArr[questionCounter].answerArr[3].choice)
});

$("#answer-choice-1").click(function(){
    if (questionsArr[questionCounter].answerArr[0].value) {
        alert ("You're correct!")
        currentScore += 5
        $("#score").text(`Current Score: ${currentScore}`)
    }
    else {
        alert ("You're wrong!")
    }
});

$("#answer-choice-2").click(function(){
    if (questionsArr[questionCounter].answerArr[1].value) {
        alert ("You're correct!")
        currentScore += 5
        $("#score").text(`Current Score: ${currentScore}`)
    }
    else {
        alert ("You're wrong!")
    }
});

$("#answer-choice-3").click(function(){
    if (questionsArr[questionCounter].answerArr[2].value) {
        alert ("You're correct!")
        currentScore += 5
        $("#score").text(`Current Score: ${currentScore}`)
    }
    else {
        alert ("You're wrong!")
    }
});

$("#answer-choice-4").click(function(){
    if (questionsArr[questionCounter].answerArr[3].value) {
        alert ("You're correct!")
        currentScore += 5
        $("#score").text(`Current Score: ${currentScore}`)
    }
    else {
        alert ("You're wrong!")
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