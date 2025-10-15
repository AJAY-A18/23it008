var app = angular.module("quizApp", []);
app.controller("QuizCtrl", function($scope, $http, $interval) {
  $scope.playerName = "ajay";
  $scope.score = 0;
  $scope.currentIndex = 0;
  $scope.quizStarted = false;
  $scope.quizFinished = false;
  $scope.timer = 10;
  let timerInterval;

  $scope.questions = [
    {
      question: "What is the capital of India?",
      options: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
      answer: "Delhi"
    },
    {
      question: "Which data structure uses FIFO?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      answer: "Queue"
    },
    {
      question: "AngularJS is developed by?",
      options: ["Google", "Facebook", "Microsoft", "Amazon"],
      answer: "Google"
    },
    {
      question: "Which keyword is used to define a constant in JavaScript?",
      options: ["var", "let", "const", "constant"],
      answer: "const"
    },
    {
      question: "What does CSS stand for?",
      options: [
        "Cascading Style Sheets",
        "Creative Style Syntax",
        "Computer Style System",
        "Colorful Style Setup"
      ],
      answer: "Cascading Style Sheets"
    }
  ];

  $scope.currentQuestion = $scope.questions[$scope.currentIndex];

  $scope.startQuiz = function() {
    if (!$scope.playerName.trim()) {
      alert("Please enter your name to start the quiz.");
    }
    $scope.quizStarted = true;
    $scope.startTimer();
  };

  $scope.startTimer = function() {
    $scope.timer = 10;
    if (timerInterval) $interval.cancel(timerInterval);
    timerInterval = $interval(() => {
      $scope.timer--;
      if ($scope.timer === 0) {
        $scope.nextQuestion(); 
      }
    }, 1000);
  };

  $scope.nextQuestion = function() {
    if (timerInterval) $interval.cancel(timerInterval);

    if ($scope.selectedAnswer === $scope.currentQuestion.answer) {
      $scope.score++;
    }

    $scope.selectedAnswer = null;
    $scope.currentIndex++;

    if ($scope.currentIndex < $scope.questions.length) {
      $scope.currentQuestion = $scope.questions[$scope.currentIndex];
      $scope.startTimer();
    } else {
      $scope.finishQuiz();
    }
  };

  $scope.finishQuiz = function() {
    if (timerInterval) $interval.cancel(timerInterval);
    $scope.quizFinished = true;
    $scope.quizStarted = false;

    const userData = {
      name: $scope.playerName,
      score: $scope.score
    };

    $http.post("http://localhost:5000/add", userData)
      .then(() => console.log(" Score saved:", userData))
      .catch(err => console.error("Error saving score:", err));
  };
});
