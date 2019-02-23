$(document).ready(function() {
  var fighters = [
    { id: 1, name: 'luke', imgSrc: 'assets/images/luke.png', health: 300 },
    { id: 2, name: 'maul', imgSrc: 'assets/images/maul.png', health: 100 },
    { id: 3, name: 'obi', imgSrc: 'assets/images/obi.png', health: 100 },
    { id: 4, name: 'sidious', imgSrc: 'assets/images/sidious.png', health: 100 }
  ];

  var fighter = null;
  var enemies = null;
  var enemy = null;

  var min = 5;
  var max = 30;

  var fighterHealth = Math.floor(Math.random() * (+max - +min) + +min);
  var enemyHealth = Math.floor(Math.random() * (+max - +min) + +min);

  var characters = $('.characters');
  var battlefield = $('.battlefield');
  var fighterDiv = $('.fighterDiv');
  var enemyDiv = $('.enemyDiv');
  var title = $('.title');

  // load fighters
  var loadFighters = function(block, fighters) {
    $.each(fighters, function(i, value) {
      block.append(
        '<div class="' +
          value.id +
          '"><img src="' +
          value.imgSrc +
          '" alt="' +
          value.name +
          '"/><span>' +
          value.name +
          '</span>' +
          '<span>' +
          value.health +
          '%' +
          '</span>' +
          '</div>'
      );
    });
  };

  // setup fight
  var setupFight = function(id) {
    fighter = fighters.find(item => item.id == id);
    $('.' + id).hide('fast');

    enemies = fighters.filter(function(enemy) {
      $('.' + enemy.id).hide(3000);

      return enemy.id != id;
    });

    battlefield.show();
    title.hide();

    // append fighter
    fighterDiv.append(
      '<div class="' +
        fighter.id +
        '"><img src="' +
        fighter.imgSrc +
        '" alt="' +
        fighter.name +
        '"/>' +
        '<span>' +
        fighter.health +
        '%' +
        '</span>' +
        '</div>'
    );

    // append enemies
    loadFighters(enemyDiv, enemies);
  };

  // reduce fighter's health
  var complete = function(enemyHealth, fighterHealth) {
    if (enemyHealth <= 0) {
      alert('You Won!');
      $('.enemyDiv .' + enemy).hide();
    } else if (fighterHealth <= 0) {
      // reset the game
      alert('GameOver!');
      location.reload();
    }
  };

  // reduce fighter's health
  var adjustHealth = function(id) {
    // update fighter health
    fighter.health = fighter.health - fighterHealth;

    // update enemy health
    enemies = fighters.find(item => item.id == id);
    enemies.health = enemies.health - enemyHealth;

    // render health state
    $('.fighterDiv span').text(fighter.health + '%');
    $('.enemyDiv .' + enemies.id + ' span:nth-of-type(2)').text(
      enemies.health + '%'
    );

    complete(enemies.health, fighter.health);
  };

  // document loaded
  loadFighters(characters, fighters);
  battlefield.hide();

  // handle fighter click
  $('.characters div').click(function() {
    var id = $(this).attr('class');

    setupFight(id);
  });

  // handle enemy click
  $(document).on('click', '.enemyDiv div', function(e) {
    var id = $(this).attr('class');

    $(this)
      .siblings()
      .css('border', 'none');

    $(this).css('border', '2px solid #c50000cc');

    // set enemy id currently in fight
    enemy = id;
  });

  // handle attack click
  $('#attack').click(function() {
    if (enemy == null) {
      alert('No enemy to attack! Please choose enemy!');
    } else {
      adjustHealth(enemy);
    }
  });
});
