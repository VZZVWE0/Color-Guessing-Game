// Creating an array to store the game data
const characterGameData = [
    {
        question: "Assets/spongebob.jpg",
        options: ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"],
        correctAnswer: "Yellow",
        customMessage: "Spongebob Squarepants is Yellow!"
    },
    {
        question: "Assets/sonic.jpg",
        options: ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"],
        correctAnswer: "Blue",
        customMessage: "Sonic the Hedgehog is Blue!"
        
    },
    {
        question: "Assets/barney.jpg",
        options: ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"],
        correctAnswer: "Purple",
        customMessage: "Barney is Purple!"
    },
    {
        question: "Assets/tonytiger.jpg",
        options: ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"],
        correctAnswer: "Orange",
        customMessage: "Tony the Tiger is Orange!"
    },
    {
        question: "Assets/mikewazowski.jpg",
        options: ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"],
        correctAnswer: "Green",
        customMessage: "Mike Wazowski is Green!"
    },
    {
        question: "Assets/homer.jpg",
        options: ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"],
        correctAnswer: "Yellow",
        customMessage: "Homer Simpson is Yellow!"
    },
    {
        question: "Assets/elmo.jpg",
        options: ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"],
        correctAnswer: "Red",
        customMessage: "Elmo is Red!"
    }
];

let characterQuestionIndex = 0; // Keep track of questions
let selectedCharacterOption;
let characterGameScore = 0; // Variable to keep track of the score


function initializeQuiz() {
    
    const currentQuestion = characterGameData[characterQuestionIndex];

    
    const questionContainer = document.getElementById("question");
    questionContainer.innerHTML = `<img src="${currentQuestion.question} "alt="Question Image"  class="grayscale">`; // Puts a black and white filter over colored image

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = ""; // Clear previous options

    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.classList.add("option");
        optionElement.textContent = option;
        optionElement.setAttribute("data-index", index);
        optionElement.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionElement);
    });

    document.getElementById("next-button").disabled = true;  // Disables the "Next" button as default untill user selects and submit an answer

    // Clear previous result and custom message
    document.getElementById("result").textContent = "";
    document.getElementById("custom-message").textContent = "";
}

// Function to handle option selection
function selectOption(index) {
    selectedCharacterOption = index;
    document.querySelectorAll(".option").forEach((option, i) => {
        option.classList.toggle("selected", i === index);
    });
    
}

// Function to apply grayscale filter to the question image
function applyGrayscaleFilter() {
    const questionImage = document.querySelector("#question img");
    questionImage.classList.add("grayscale");
}

// Function to check the selected answer
function checkAnswer() {

    document.getElementById("next-button").disabled = false; // Allows user to click "Next" button after submitting
    
    const resultContainer = document.getElementById("result");
    const customMessageContainer = document.getElementById("custom-message");

    if (selectedCharacterOption === undefined) {
        document.getElementById("next-button").disabled = true;    //If no option is selected, disables "Next" button again
        resultContainer.textContent = "Please select an answer!";
        return;
    }

    const currentQuestion = characterGameData[characterQuestionIndex];
    const selectedAnswer = currentQuestion.options[selectedCharacterOption];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    if (isCorrect) {
        resultContainer.textContent = "Correct!";
        customMessageContainer.textContent = currentQuestion.customMessage;
        characterGameScore++; // Increase the score for a correct answer
    } else {
        resultContainer.textContent = `INCORRECT. The correct answer is ${currentQuestion.correctAnswer}.`;
    }

    // Remove grayscale filter after the user submits an answer
    const questionImage = document.querySelector("#question img");
    questionImage.classList.remove("grayscale");    // Removes black and white filter to show orginal color with answer
}

// Function to go to the next question
function nextQuestion() {
    
    checkAnswer(); // Call to check answer


    // Checks index and length or array to continue or signal end of game
    characterQuestionIndex++;
    if (characterQuestionIndex < characterGameData.length) {
        initializeQuiz();
    } else {
        displayFinalScore();
    }

    
    applyGrayscaleFilter();  //Re-applies black and white filter for next question

    
    document.getElementById("next-button").disabled = true;  // Disable the "Next" button again until the user selects an option
}

// Function to display the final score
function displayFinalScore() {
    characterGameScore = characterGameScore/2;
    const resultContainer = document.getElementById("result");
    resultContainer.innerHTML = `Thanks for playing! Your final score is: ${characterGameScore}/${characterGameData.length}`;
    document.getElementById("next-button").style.visibility = 'hidden';
    document.getElementById("submit-button").style.visibility = 'hidden';
    
}

// Call to load and start quiz
initializeQuiz();

// Functions to handle if a user wants to leave game
function confirmLeaveGame() {
    if (confirm("Are you sure you want to leave the game? Your progress will be lost.")) {
        window.location.href = 'index.html';
    }
}
window.onbeforeunload = function (e) {
    return "Are you sure you want to leave the game? Your progress will be lost.";
};