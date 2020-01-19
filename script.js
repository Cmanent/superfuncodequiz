

var interval = 0;

// Reset game button
document.getElementById("resetButton").onclick = function() {
    window.location.reload();
  };


// The Questions
var questions = [{
    question: "Is Popcorn considered a Whole Grain?",
    choices: [" NO ", "YES", "Hell Yes!", "Delicious!"],
    correctAnswer: 1
}, {
    question: "Which of the following is NOT a Vegan alternative to meat?",
    choices: ["Tofu", "Beans", " Satan", " Tempeh"],
    correctAnswer: 2
}, {
    question: "Which option is suitable for people who are Lactose-Free?",
    choices: [" Lactaid", " Goats Milk", " Cows Milk", " Skim Milk"],
    correctAnswer: 0
}, {
    question: "Which of the following is NOT considered a Super Food?",
    choices: [" Nutritional Yeast", " Kale", " Quinoa", " Spirulina"],
    correctAnswer: 1
}, {
    question: "What is the ONE source of Plant-Based b12?",
    choices: ["Cashews", " Legumes", " Water Lentils", " Pasture Raised Cheese "],
    correctAnswer: 2
}, {
    question: "What is Seitan made from?",
    choices: [" Tempeh ", " Veggie Blend ", " Vital Wheat Gluten", " Tofu"],
    correctAnswer: 2
}, {
    question: "Which brand of milk is strictly Plant-Based?",
    choices: [" Califa Farms", " Silk ", " Almond Breeze ", " All of the above"],
    correctAnswer: 3
}, {
    question: "What is Tofu made from?",
    choices: [" Tempeh", " Soy Beans", " Rice", " Flour"],
    correctAnswer: 1
}, {
    question: "Which Vegetable has more Protein than Beef?",
    choices: [" Spinach", " Beans ", " Broccoli", " Jackfruit"],
    correctAnswer: 2
}, {
    question: "Which of the following options has the Lowest Amount of Sugar?",
    choices: [" Strawberries", " Bananas", " Peaches", " Blueberries"],
    correctAnswer: 0
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;



// Wait until the document loads to...
$(document).ready(function () {
    
    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        $(document).find(".nextButton").val("NEXT QUESTION");
        
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").val("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        };
    });

});
    
// This displays the current question AND the choices
function displayCurrentQuestion() {
    clearInterval(interval)
    startTimer();    
    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    };
};
    
// Reset the quiz
function resetQuiz() {
    //bkgrndAudio.play();
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
    clearInterval(interval)
    startTimer();
};
    
// Display the score after the game
function displayScore() {
    
    if (correctAnswers >= 7) {
       
        $(document).find(".quizContainer > .result").text("Excellent job! You scored: " + correctAnswers + " out of " + questions.length);
    }
    else if (correctAnswers >= 4) {
        
        $(document).find(".quizContainer > .result").text("Not bad. You scored: " + correctAnswers + " out of " + questions.length + " Try again, perhaps?");
    }
    else if (correctAnswers >= 1) {
        
        $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of " + questions.length + " You can do better!");
    }
    else if (correctAnswers < 1) {
        
        $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of " + questions.length + ", you should try again...");
    }

    $(document).find(".quizContainer > .result").show();
};

// Hide the score upon restarting the quiz
function hideScore() {
    
    $(document).find(".result").hide();
};

// Countdown Timer
function startTimer () {
    var timer = 15;
    interval = setInterval(function() {
        timer--;
        $('#timer').text(timer);
        if (timer === 0) {
            clearInterval(interval);
            $('#timer').text("You Are Out of Time!");
        }
    }, 1000);
};

