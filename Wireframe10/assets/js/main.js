$(document).ready(function() {
  var questions = [
    {
      question:
        'Pupusas, handmade thick stuffed corn tortillas, are a traditional dish from what country?',
      answers: ['Ethiopia', 'El Salvadore', 'Peru', 'Guatamala'],
      correct: 1
    },
    {
      question:
        'What popular soda beverage was originally developed as a mixer for whiskey?',
      answers: ['Mountain Dew', 'Sprite', '7-UP', 'Coke'],
      correct: 0
    },
    {
      question: 'Kopi luwak is a very expensive type of what?',
      answers: ['Spice', 'Caviar', 'Coffee', 'Rice variety'],
      correct: 2
    },
    {
      question: 'Which is not an ingredient in a Harvey Wallbanger cocktail?',
      answers: ['Orange Juice', 'Vodka', 'Sour Mix', 'Galliano'],
      correct: 2
    }
  ];

  var question = null;
  var answer = '';
  var counter = 20;
  var intervalId;
  var questionIndex = 0;
  var correctAnswer = 0;
  var incorrectAnswer = 0;
  var isRunning = false;

  $('.title').hide();

  // start the game
  var game = function() {
    timer();
    $('.title').show();

    question = questions[questionIndex];
    $('.question').html(question.question);

    for (var i = 0; i < question.answers.length; i++) {
      $('.answers').append(
        '<li class="' + i + '">' + question.answers[i] + '</li>'
      );
    }
  };

  // handle next question
  var nextQuestion = function() {
    counter = 20;
    timer();
    questionIndex++;
    $('.answers').empty();

    // check if questions are finished
    if (questionIndex >= questions.length) {
      $('.answer').html(
        'Correct: ' + correctAnswer + '<br/>' + 'Incorrect: ' + incorrectAnswer
      );
      setTimeout(function() {
        resetGame();
      }, 4000);
    } else {
      question = questions[questionIndex];

      for (var i = 0; i < question.answers.length; i++) {
        $('.question').html(question.question);
        $('.answers').append(
          '<li class="' + i + '">' + question.answers[i] + '</li>'
        );
      }
    }
  };

  var timer = function() {
    if (!isRunning) {
      intervalId = setInterval(() => {
        $('.timer').html('Time Remaining ' + counter);
        counter -= 1;
        isRunning = true;
        if (counter === 0) {
          incorrectAnswer++;
          stop();
        }
      }, 1000);
    }
  };

  // stop timer
  var stop = function() {
    isRunning = false;
    clearInterval(intervalId);
  };

  // check the answer
  var checkAnswer = function(guess) {
    if (guess == question.correct) {
      $('.answer').html('Correct answer!');
      stop();
      correctAnswer++;
      nextQuestion();
    } else {
      answer = question.answers[question.correct];
      $('.answer').html('Incorrect answer! correct answer is: ' + answer);
      stop();
      incorrectAnswer++;
      nextQuestion();
    }
  };

  // handle pick answer
  $(document).on('click', '.answers li', function(e) {
    var id = $(this).attr('class');
    checkAnswer(id);
  });

  // reset game
  var resetGame = function() {
    question = null;
    questionIndex = 0;
    index = 0;
    answer = '';
    $('.title').hide();
    $('#start').show();
    $('.timer').empty();
    $('.answers').empty();
    $('.question').empty();
    $('.answer').empty();
  };

  // handle start click
  $('#start').click(function() {
    $(this).hide();
    game();
  });
});
