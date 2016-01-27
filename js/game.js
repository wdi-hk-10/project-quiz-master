
Part 2

var Question = function(option) {
  this.question = option.question;
  this.dummy1 = option.dummy1;
  this.dummy2 = option.dummy2;
  this.answer = opton.answer;
  this.image = option.image;
}

var question1 = new Question({
  question: "Which quarterback was NOT chosen in the 1st round of the 1983 NFL Draft?",
  dummy1: "Dan Marino",
  dummy2: "Jim Kelly",
  answer: "Boomer Esiason",
  image: "images/jimkelly.jpg"
});


var question2 = new Question({
  question: "When was overtime for regular season games first introduced in the National Hockey League?",
  dummy1: "1999",
  dummy2: "2001",
  answer: "2005",
  image: "images/NHL.jpg"
});

var question3 = new Question({
  question: "What was the last horse before American Pharaoh to win the Triple Crown?",
  dummy1: "Seattle Slew",
  dummy2: "Intrepid",
  answer: "Affirmed",
  image: "images/racehorse.jpg"
});


$(document).ready(function(){
  var subject = '';
  var level = '';

  // Part 1
  $('#start-button').on('click',function(){
    $('#game').show();
    $('#start').hide();
    pickSubject();
    pickLevel();
    $('#category > h1').text(subject +' ('+level+')');
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

  $('#answer-button').on('click',function(){


  });




  // Part 2





});