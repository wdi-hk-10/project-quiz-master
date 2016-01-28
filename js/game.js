
//Questions Block

var Question = function(option) {
  this.ask = option.ask;
  this.dummy1 = option.dummy1;
  this.dummy2 = option.dummy2;
  this.answer = option.answer;
  this.image = option.image;
}

var question1 = new Question({
  ask: "Which quarterback was NOT chosen in the 1st round of the 1983 NFL Draft?",
  dummy1: "Dan Marino",
  dummy2: "Jim Kelly",
  answer: "Boomer Esiason",
  image: "images/jimkelly.jpg"
});

var question2 = new Question({
  ask: "When was overtime for regular season games first introduced in the National Hockey League?",
  dummy1: "1999",
  dummy2: "2001",
  answer: "2005",
  image: "images/NHL.jpg"
});

var question3 = new Question({
  ask: "What was the last horse before American Pharaoh to win the Triple Crown?",
  dummy1: "Seattle Slew",
  dummy2: "Intrepid",
  answer: "Affirmed",
  image: "images/racehorse.jpeg"
});

var question4 = new Question({
  ask: "In what year did Roger Maris break Babe Ruth's home run record?",
  dummy1: "1951",
  dummy2: "1960",
  answer: "1961",
  image: "images/rogermaris.jpeg"
});

var question5 = new Question({
  ask: "Who was the last Heisman Trophy winner to be selected 1st overall?",
  dummy1: "Cam Newton",
  dummy2: "Marcus Mariota",
  answer: "Jameis Winston",
  image: "images/jameiswinston.jpeg"
});

var question6 = new Question({
  ask: "Which hockey dynasty has never managed to win 4 straight Stanley Cups?",
  dummy1: "Montreal Canadiens",
  dummy2: "New York Islanders",
  answer: "Edmonton Oilers",
  image: "images/islanders.jpeg"
});

var question7 = new Question({
  ask: "Which was the last major European club to win the domestic league, cup and Champions League all in the same season??",
  dummy1: "Manchester United",
  dummy2: "Real Madrid",
  answer: "Barcelona",
  image: "images/bayern.jpeg"
});

var question8 = new Question({
  ask: "Who was the last Japanese figure skater to win an Olympic medal?",
  dummy1: "Mao Asada",
  dummy2: "Midori Ito",
  answer: "Yuzuru Hanyu",
  image: "images/midoriito.jpeg"
});

var question9 = new Question({
  ask: "Who holds the record for most number of Women's Grand Slam Singles titles?",
  dummy1: "Serena Williams",
  dummy2: "Stefi Graf",
  answer: "Margaret Court",
  image: "images/swilliams.jpeg"
});

var question10 = new Question({
  ask: "Who was the captain of the US Gold Medal winning Hockey team in the 1980 Winter Olympics?",
  dummy1: "Jim Craig",
  dummy2: "Ken Morrow",
  answer: "Mike Eruzione",
  image: "images/kenmorrow.jpeg"
});

var questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10];


$(document).ready(function(){

  // Global Variables
  var currentQ = 0;
  var subject = '';
  var level = '';
  var answerChoice = "";
  var rightAnswers = 0;
  var questionsAsked = 0;
  var questionsSkipped = 0;
  var timer;
  var timeLeft = 90;

  // Part 1

// Keep track of Time Limit

  function decreaseTime() {
    timeLeft--;
    $('#timeLeft').text(': ' + timeLeft + ' secs left');
    if (timeLeft < 0) {
      clearInterval(timer);
    }
  }

  $('#start-button').on('click',function(){
    $('#game').show();
    $('#start').hide();
    pickSubject();
    pickLevel();
    $('#category > h1').text(subject +' ('+level+')');
    loadQuestion();
    timer = setInterval(decreaseTime, 1000);
  });

  var pickSubject = function() {
    var subject1 = $('#subject1').is(":checked");
    var subject2 = $('#subject2').is(":checked");
    var subject3 = $('#subject3').is(":checked");
    if (subject1) {
      subject = $('#subject1').val();
    } else if (subject2) {
      subject = $('#subject2').val();
    } else {
      subject = $('#subject3').val();
    }
  }

  var pickLevel = function () {
    var level1 = $('#level1').is(":checked");
    var level2 = $('#level2').is(":checked");
    var level3 = $('#level3').is(":checked");
    if (level1) {
      level = $('#level1').val();
    } else if (level2) {
      level = $('#level2').val();
    } else {
      level = $('#level3').val();
    }
  }


  // Part 2

  var loadQuestion= function() {
    var question = questions[currentQ];
    $('#question').text(question.ask);
    $('#pick1').text(question.dummy1);
    $('#pick2').text(question.dummy2);
    $('#pick3').text(question.answer);
    $('#qpic').attr('src', question.image);
  }


// Take in answer choice
  $('.answers').on('click', function(){
    answerChoice = $(this).text();
    questionsAsked ++;

  });

// Take in choice of Skip
  $('#skip').on('click', function(){
    questionsSkipped ++;
    questionsAsked ++;
    currentQ++;
    loadQuestion();

  });

// Check to see if answer is right or wrong
  $('#answer-button').on('click',function(){
    var question = questions[currentQ];
    if (answerChoice === question.answer) {
      rightAnswers ++;
      $('#scoreTot').text(' ' +rightAnswers);
    }
    currentQ++;
    if (currentQ == questions.length) {
      $('#tally').show();
      $('#game').hide();
    } else {
    loadQuestion();
    }
  });


// Part 3

  $('#restart-button').on('click', function() {
    subject = '';
    level = '';
    currentQ = 0;
    answerChoice = '';
    rightAnswers = 0;
    questionsAsked = 0;
    questionsSkipped = 0;
    $('#start').show();
    $('#tally').hide();
    loadQuestion();
  });

});