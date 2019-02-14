$(document).ready(function() {
  // show popup on page load
  $('.popup-overlay, .popup-content').addClass('active');

  $('.close').on('click', function() {
    $('.popup-overlay, .popup-content').removeClass('active');
  });

  // listen to any key pressed
  $(document).keypress(function() {
    $('.popup-overlay, .popup-content').removeClass('active');
  });

  var possibilities = ['Jquery', 'React', 'Vue', 'Angular'];
  var word = '';
  var correctGuess = [];
  var wrongGuess = [];
  var remaining = 8;

  // start the game
  var game = function() {
    $('.pressMessage').text('Press any key to start');

    word = possibilities[
      Math.floor(Math.random() * possibilities.length)
    ].toLowerCase();
    for (var i = 0; i < word.length; i++) {
      correctGuess.push('_');
    }

    $('.correctGuess').text(correctGuess.join('  '));
  };

  var audio = function() {
    $('#simpsons').trigger('play');

    setTimeout(function() {
      $('#simpsons').trigger('pause');
    }, 2000);
  };

  // check the letters entered
  var checkLetters = function(guess) {
    $('.pressMessage').text('');

    guess = guess.toLowerCase();

    var letterInWord = false;
    for (var i = 0; i < word.length; i++) {
      if (word[i] == guess) {
        letterInWord = true;
      }
    }

    if (letterInWord) {
      for (var i = 0; i < word.length; i++) {
        if (word[i] == guess) {
          correctGuess[i] = guess;
        }
      }
    } else {
      if (jQuery.inArray(guess, wrongGuess) == -1) {
        wrongGuess.push(guess);
      } else {
        $('.keyPressed').text('the letter: ' + guess + ' is used already!');
      }

      $('.wrongGuess').text('wrong guess letters are: ' + wrongGuess.join(' '));
    }

    remaining--;

    $('.correctGuess').text(correctGuess.join('  '));
  };

  var complete = function() {
    if (word.toString() == correctGuess.join('').toString()) {
      $('.won').text('You guessed!');
      audio();
      reset();
    } else if (remaining == 0) {
      $('.lose').text('You lose!');
    }
  };

  var reset = function() {
    correctGuess = [];
    wrongGuess = [];
    remaining = 8;
    $('.won').text(' ');
    $('.lose').text(' ');
    $('.correctGuess').text(' ');
    $('.wrongGuess').text(' ');
    $('.keyPressed').text(' ');
    $('.remaining').text(' ');

    game();
  };

  var checkRemaining = function() {
    $('.remaining').text(remaining);

    if (remaining <= 0) {
      $('.remaining').text('Game Over!');

      setTimeout(function() {
        reset();
      }, 2000);
    }
  };

  //   listen to user input
  $(document).on('keypress', function(e) {
    var guess = String.fromCharCode(e.which);

    checkLetters(guess);
    checkRemaining();
    complete();
  });

  game();
});
