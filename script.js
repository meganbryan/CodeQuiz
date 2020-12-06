var questionCounter = 0
var currentScore = 0
var timeRemaining = 300
var quizFinished = false
var highscoreArr = localStorage.getItem("userInfo", JSON.stringify(highscoreArr))
highscoreArr = highscoreArr ? highscoreArr.split(',') : [];

var questionsArr = [
    {questionText: "Which particle contains a negative charge?",
        answerArr: [
            {
                choice: "Proton",
                value: false
            },
            {
                choice: "Neutron",
                value: false
            },
            {
                choice: "Electron",
                value: true
            },
            {
                choice: "Neucleus",
                value: false
            },
        ]
    },
    {questionText: "What is the atomic number of nitrogen?",
        answerArr: [
            {
                choice: "17",
                value: false
            },
            {
                choice: "12",
                value: false
            },
            {
                choice: "4",
                value: false
            },
            {
                choice: "7",
                value: true
            },
        ]
    },
    {questionText: "How many atoms make up a water molecule?",
        answerArr: [
            {
                choice: "1",
                value: false
            },
            {
                choice: "2",
                value: false
            },
            {
                choice: "3",
                value: true
            },
            {
                choice: "4",
                value: false
            },
        ]
    },
    {questionText: "In order to be classified as organic, a substance must contain ________.",
        answerArr: [
            {
                choice: "Carbon",
                value: true
            },
            {
                choice: "Oxygen",
                value: false
            },
            {
                choice: "Carbon Dioxide",
                value: false
            },
            {
                choice: "Water",
                value: false
            },
        ]
    },
    {questionText: "According to the Law of Multiple Proportions, if I want the yeild to double, I must ___________ the reactants",
        answerArr: [
            {
                choice: "change",
                value: false
            },
            {
                choice: "double",
                value: true
            },
            {
                choice: "half",
                value: false
            },
            {
                choice: "quadruple",
                value: false
            },
        ]
    },
    {questionText: "What is the element with the highest atomic number that occurs naturally?",
        answerArr: [
            {
                choice: "Plutonium",
                value: false
            },
            {
                choice: "Argon",
                value: false
            },
            {
                choice: "Iron",
                value: false
            },
            {
                choice: "Uranium",
                value: true
            },
        ]
    },
    {questionText: "Where do halogens appear on the periodic table?",
        answerArr: [
            {
                choice: "The left side",
                value: false
            },
            {
                choice: "Row 7",
                value: false
            },
            {
                choice: "Group 17",
                value: true
            },
            {
                choice: "Transition Metals",
                value: false
            },
        ]
    },
    {questionText: "Two atoms of the same element that contain different numbers of neutrons are called __________. ",
        answerArr: [
            {
                choice: "ions",
                value: false
            },
            {
                choice: "isotopes",
                value: true
            },
            {
                choice: "neurons",
                value: false
            },
            {
                choice: "prototypes",
                value: false
            },
        ]
    },
    {questionText: "When balancing an unbalanced chemical equation, it is necessary to change the ____________ ",
        answerArr: [
            {
                choice: "coefficients",
                value: true
            },
            {
                choice: "subscripts",
                value: false
            },
            {
                choice: "elements",
                value: false
            },
            {
                choice: "positions of atoms",
                value: false
            },
        ]
    },
    {questionText: "An element that never exists as a lone atom, only in pairs or molecules is called a _____________.",
        answerArr: [
            {
                choice: "valence pair",
                value: false
            },
            {
                choice: "lone pair",
                value: false
            },
            {
                choice: "diatomic element",
                value: true
            },
            {
                choice: "none of the above",
                value: false
            },
        ]
    },
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
    $("#end-alert").text(`You've completed the quiz! You earned ${currentScore} / 50 points.`)
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
    for (var i = 0; i < highscoreArr.length; i++) {
        highscoreArr = JSON.parse(localStorage.getItem("userInfo"))
        highscoreArr.sort((a, b) => {
            return b.userScore - a.userScore;
        });
        var initials = highscoreArr[i].userInitials
        var score = highscoreArr[i].userScore
        var timeLeft = highscoreArr[i].userTime
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
        $(`#answer-choice-${i+1}`).text(firstAnswers[i].choice)
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

$("#clear").click(function(){
    localStorage.clear()
    location. reload()
});

retrieveHighscores ()