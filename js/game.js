
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
  image: "images/camnewton.jpg"
});

var question6 = new Question({
  ask: "Which hockey dynasty has never managed to win 4 straight Stanley Cups?",
  dummy1: "Montreal Canadiens",
  dummy2: "New York Islanders",
  answer: "Edmonton Oilers",
  image: "images/islanders.jpeg"
});

var question7 = new Question({
  ask: "Which was the last club to win the domestic league, cup and Champions League in the same season??",
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
  image: "images/midoriito.jpg"
});

var question9 = new Question({
  ask: "Who holds the record for most number of Women's Grand Slam Singles titles?",
  dummy1: "Serena Williams",
  dummy2: "Stefi Graf",
  answer: "Margaret Court",
  image: "images/swilliams.jpg"
});

var question10 = new Question({
  ask: "Who was the captain of the US Hockey team in the 1980 Winter Olympics?",
  dummy1: "Jim Craig",
  dummy2: "Ken Morrow",
  answer: "Mike Eruzione",
  image: "images/kenmorrow.jpg"
});

var questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10];

// var questions = [question1, question2, question3, question4, question5];

$(document).ready(function(){

  // Global Variables
  var currentQ = 0;
  var subject = '';
  var level = '';
  var answerChoice = '';
  var rightAnswers = 0;
  var questionsAsked = 0;
  var questionsTried = 0;
  var questionsSkipped = 0;
  var scoreXer;
  var timer;
  var timeLeft = 60;
  var choices = [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,2,1],[3,1,2]];
  var answerSelected = false;
  var playerStat = ""

  // Part 1

// Keep track of Time Limit

  function decreaseTime() {
    timeLeft--;
    $('#timeLeft').text(': ' + timeLeft + ' secs left');
    if (timeLeft < 1) {
      clearInterval(timer);
    }
  }

  $('#start-button').on('click',function() {
    $('#category > h1').text(subject +' ('+level+')');
    $('#start').hide();
    loadQuestion();
    $('#game').show();
    timer = setInterval(decreaseTime, 1000);
  });

  $('.radio input').on('change', function(){
    pickSubject();
    pickLevel();
    console.log(subject, level)
    if (subject && level) {
      $('#start-button').removeAttr("disabled");
    }
  })

  var pickSubject = function() {
    var subject1 = $('#subject1').is(":checked");
    var subject2 = $('#subject2').is(":checked");
    var subject3 = $('#subject3').is(":checked");
    if (subject1) {
      subject = $('#subject1').val();
    } else if (subject2) {
      subject = $('#subject2').val();
    } else if (subject3) {
      subject = $('#subject3').val();
    }
  }

  var pickLevel = function () {
    var level1 = $('#level1').is(":checked");
    var level2 = $('#level2').is(":checked");
    var level3 = $('#level3').is(":checked");
    if (level1) {
      level = $('#level1').val();
      scoreXer = 1;
    } else if (level2) {
      level = $('#level2').val();
      scoreXer = 1.5;
    } else if (level3) {
      level = $('#level3').val();
      scoreXer = 2;
    }
  }

  // Part 2
  var loadQuestion= function() {
    var question = questions[currentQ];
    var choice = choices[Math.floor(Math.random() * 6)];
    $('#question').text(question.ask);
    $('#pick'+choice[0]).text(question.dummy1);
    $('#pick'+choice[1]).text(question.dummy2);
    $('#pick'+choice[2]).text(question.answer);
    $('#qpic').attr('src', question.image);
  }


// Take in answer choice
  $('.answers').on('click', function(){
    answerChoice = $(this).text();
    if (!answerSelected){
      questionsAsked ++;
      questionsTried ++;
      answerSelected = true;
      $('#answer-button').removeAttr("disabled");
    }
  });

// Skipping
  $('#skip').on('click', function(){
    questionsSkipped ++;
    questionsAsked ++;
    currentQ++;
    if (currentQ == questions.length || timeLeft<1) {
      $('#tally').show();
      $('#game').hide();
      chkStat();
      tallyScore();
      clearInterval(timer);
    } else {
      loadQuestion();
    }
    answerSelected = false;
    $('#answer-button').attr("disabled", true);
  });

// Check to see if answer is right or wrong
  $('#answer-button').on('click',function(){
    var question = questions[currentQ];
    if (answerChoice == question.answer) {
      rightAnswers ++;
      $('#scoreTot').text(' ' +rightAnswers);
    }
    currentQ++;
    if (currentQ == questions.length || timeLeft<1) {
      $('#tally').show();
      $('#game').hide();
      chkStat();
      console.log(playerStat);
      tallyScore();
      clearInterval(timer);
    } else {
      loadQuestion();
    }
    answerSelected = false;
    $('#answer-button').attr("disabled", true);
  });

// Part 3

  var chkStat = function () {
    var pctTot = (rightAnswers/questionsAsked);
    console.log(pctTot);
    if (pctTot < 0.2) {
        playerStat = "Dohh!";
        $('#statPic').attr("src","images/dohh.gif");
    } else if (pctTot >= 0.2 && pctTot < 0.5) {
        playerStat = "Slacker";
        $('#statPic').attr("src","images/slacker.gif");
    } else if (pctTot  >= 0.5 && pctTot < 0.7) {
        playerStat = "Average Joe";
        $('#statPic').attr("src","images/averagejoe.gif");
    } else if (pctTot >= 0.7 && pctTot < 0.9) {
        playerStat = "Egg Head";
        $('#statPic').attr("src","images/egghead.gif");
    } else if (pctTot >= 0.9) {
        playerStat = "Rock Star";
        $('#statPic').attr("src","images/rockstar.gif")
    }
    console.log(playerStat);
  }

  var tallyScore = function () {
    $('#catLevel').text(subject+' ('+level+')');
    $('#qstTry').text(questionsTried);
    $('#qstSkp').text(questionsSkipped);
    $('#ansRgt').text(rightAnswers);
    $('#pctTry').text(((rightAnswers/questionsTried)*100).toFixed(1));
    $('.pctTot').each(function(index, elem) {
      $(elem).text(((rightAnswers/questionsAsked)*100).toFixed(1));
    });
    $('#totPts').text(rightAnswers*scoreXer);
    $('#chkStat').text(playerStat);
  }



  $('#restart-button').on('click', function() {
    $('#timeLeft').text('');
    $('#scoreTot').text('');
    $('#subject1').prop("checked",false);
    $('#subject2').prop("checked",false);
    $('#subject3').prop("checked",false);
    $('#level1').prop("checked",false);
    $('#level2').prop("checked",false);
    $('#level3').prop("checked",false);
    subject = '';
    level = '';
    currentQ = 0;
    answerChoice = '';
    rightAnswers = 0;
    questionsAsked = 0;
    questionsSkipped = 0;
    questionsTried = 0;
    $('#start').show();
    $('#tally').hide();
    timeLeft = 60;
    $('#timeLeft').text(': ' + timeLeft + ' secs left');
    loadQuestion();
    playerStat = "";
    $('#start-button').attr("disabled", true)
  });

});