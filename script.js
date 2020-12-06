var questionCounter = 0
var currentScore = 0
var timeRemaining = 240
var quizFinished = false
var highscoreArr = JSON.parse(localStorage.getItem("userInfo"))

var questionsArr = [
    {questionText: "Question 1",
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

function timeAppend() {
    var minutesLeft = Math.floor(timeRemaining / 60)
    var secondsLeft = (timeRemaining % 60)
    if (secondsLeft > 9) {
        $("#timer").text(`${minutesLeft} : ${secondsLeft}`)
    }
    else {
        var singleDigitNumber = ("0" + secondsLeft)
        $("#timer").text(`${minutesLeft} : ${singleDigitNumber}`)
    }
};

function timeCounter() {
    interval = setInterval(function() {
        if ((timeRemaining > 0) && (!quizFinished)) {
            $("#timer").removeClass("red-text")
            timeRemaining--
            timeAppend()
        }
        else if (quizFinished) {
            clearInterval(interval)
        }
        else {
            clearInterval(interval)
            highscoreStorage()
            $("#end-alert").text(`You're out of time! You earned ${currentScore} points.`)
        }}, 1000)
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

function highscoreStorage() {
    $("#question").addClass('hide')
    $("#answers").addClass('hide')
    $("#answer-feedback").addClass('hide')
    $("#next").addClass('hide')
    $("#highscores-input").removeClass('hide')
    $("#end-alert").text(`You've completed the quiz! You earned ${currentScore} points.`)
    quizFinished = true;
    $("#highscore-submit").click(function () {
        var userInfo = {
            userInitials: $("#initials").val().trim(),
            userScore: currentScore,
            userTime: timeRemaining
        }
        highscoreArr.push(userInfo)
        localStorage.setItem("userInfo", JSON.stringify(highscoreArr))
    })
};

function retrieveHighscores() {
    var retrieveScores = JSON.parse(localStorage.getItem("userInfo"))
    for (var i = 0; i < retrieveScores.length; i++) {
        retrieveScores.sort((a, b) => {
            return b.userScore - a.userScore;
        });
        var initials = retrieveScores[i].userInitials
        var score = retrieveScores[i].userScore
        var timeLeft = retrieveScores[i].userTime
        $('#userData').append($(`<tr id="new-row-${i+1}">`))
        $(`#new-row-${i+1}`).append($(`<td id="initials-input-${i+1}">`))
        $(`#new-row-${i+1}`).append($(`<td id="score-input-${i+1}">`))
        $(`#new-row-${i+1}`).append($(`<td id="time-input-${i+1}">`))
        $(`#initials-input-${i+1}`).text(`${initials}`)
        $(`#score-input-${i+1}`).text(`${score}`)
        if (timeLeft > 0) {
            var minutesLeft = Math.floor(timeLeft / 60)
            var secondsLeft = (timeLeft % 60)
            if (secondsLeft > 9) {
                $(`#time-input-${i+1}`).text(`${minutesLeft} : ${secondsLeft}`)
            }
            else {
                var singleDigitNumber = ("0" + secondsLeft)
                $(`#time-input-${i+1}`).text(`${minutesLeft} : ${singleDigitNumber}`)
            }
        }
        else {
            $(`#time-input-${i+1}`).text(`Ran out of time!`)
        }
    }  
};

$("#start").click(function() {
    $("#start").addClass('hide')
    $("#show-highscores-2").addClass('hide')
    $("#answers").removeClass('hide')
    $("#timer-label").text(`Time Remaining:`)
    $("#question").text(questionsArr[0].questionText)
    var firstAnswers = questionsArr[0].answerArr
    for (var i = 0; i < firstAnswers.length; i++) {
        $(`#answer-choice-${i+1}`).text(firstAnswers[0].choice)
    }
    timeCounter()
});

$("#next").click(function() {
    if (questionCounter < (questionsArr.length-1)) {
        $("#next").addClass('hide')
        $("#answers").removeClass('hide')
        $("#answer-feedback").text('')
        questionCounter ++
        $("#question").text(questionsArr[questionCounter].questionText)
        var currentAnswer = questionsArr[questionCounter].answerArr
        for (var i = 0; i < currentAnswer.length; i++) {
            $(`#answer-choice-${i+1}`).text(currentAnswer[i].choice);
        }
    }
    else {
        $("#next").text(`Submit my score!`)
        highscoreStorage()
    }
});

$("#answer-choice-1").click(function(){
    if (questionsArr[questionCounter].answerArr[0].value) {
        correctAnswer()
    }
    else {
        wrongAnswer()
    }
});

$("#answer-choice-2").click(function(){
    if (questionsArr[questionCounter].answerArr[1].value) {
        correctAnswer()
    }
    else {
        wrongAnswer()
    }
});

$("#answer-choice-3").click(function(){
    if (questionsArr[questionCounter].answerArr[2].value) {
        correctAnswer()
    }
    else {
        wrongAnswer()
    }
});

$("#answer-choice-4").click(function(){
    if (questionsArr[questionCounter].answerArr[3].value) {
        correctAnswer()
    }
    else {
        wrongAnswer()
    }
});

retrieveHighscores()
