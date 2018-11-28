/*
 * Create a list that holds all of your cards
 */
const cards = document.querySelectorAll('.card');
const deck = document.querySelector('.deck');
var toggledCards = [];
let moves = 0;
var repeat = document.querySelector('.restart');
var allCards = Array.from(cards);
var number = 0;

/*
*The functions to toggle cards and add to array
*/
function countMoves() {
  var counter = document.querySelector('.moves');
    moves++;
    counter.innerHTML = moves;
}

/*
*The functions to toggle cards and add to array
*/
function toggleCard(clickTarget) {
  clickTarget.classList.toggle('open');
  clickTarget.classList.toggle('show');
}

function toggleCardWrong(clickTarget) {
  toggledCards[0].classList.toggle('wrong');
  toggledCards[1].classList.toggle('wrong');
}

function addToggleCards(clickTarget) {
  toggledCards.push(clickTarget);
  console.log(toggledCards);
}

/*
*The function to execute if the card is matched or
*already clicked then don't add to array to match
*/
function isValid(clickTarget) {
  return (
      clickTarget.classList.contains('card')
      && !clickTarget.classList.contains('match')
      && toggledCards.length < 2
      && !toggledCards.includes(clickTarget)
    );
}

//On a card click event these functions are executed
deck.addEventListener('click', event => {
  const clickTarget = event.target;
    if (isValid(clickTarget)){
      countMoves();
      toggleCard(clickTarget);
      addToggleCards(clickTarget);
      isItAMatch(clickTarget);
      rateMe();
    }
    // else {toggledCards = [];}
});

//Checking for a match
function isItAMatch(clickTarget) {
  if (toggledCards[0].firstElementChild.className === toggledCards[1].firstElementChild.className) {
      toggledCards[0].classList.toggle('match');
      toggledCards[1].classList.toggle('match');
      toggledCards = [];
      number += 1;
} else {
  toggleCardWrong(clickTarget);
  setTimeout(() => {
  toggleCardWrong(clickTarget)
  toggleCard(toggledCards[0]);
  toggleCard(toggledCards[1]);
  toggledCards = [];
},
  800);
}
}



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(allCards) {
    var currentIndex = allCards.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = allCards[currentIndex];
        allCards[currentIndex] = allCards[randomIndex];
        allCards[randomIndex] = temporaryValue;
    }

    return allCards;
}

//On repeat button click event the
//reset, counter, and timer functions are all rest!
repeat.addEventListener('click', event => {
  const shuffling = shuffle(allCards);
  for (card of shuffling) {
    deck.appendChild(card);
    resetMe();
    countTimer();
    hideUs();
    number = 0;
    hideHiddenStars();
    hideHiddenStars();
    hideHiddenStars();
  }
});

//Reset function
function resetMe(){
    var counter = document.querySelector('.moves');
    moves = 0;
    counter.innerHTML = moves;
    }

//Hiding the cards when reset
function hideUs(){
  for (var i = 0; i < allCards.length; i++) {
    allCards[i].classList.remove("match","show","open");
}
}



/*
 * Rating the game and displaying stars as per the score
 */

function showStar(){
const starList = document.querySelectorAll('.stars li');
for (star of starList) {
if (star.style.display !== 'none') {
  star.style.display = 'none';
  break;
}
}
}

function rating(){
if (moves >= 21 && moves <= 30) {
  showStar();
} else if (moves >= 31) {
  showStar();
  showStar();
}}

function rateMe() {
if (number >= 8) { // when to stop
  rating();
  myStopFunction();
  modalMe();
}
}

/*
 * Modal from www.w3schools.com
 */

// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//The funtion to execute the modal
function modalMe() {
    if (number = 8) {
        modal.style.display = "block";
    }
}

/*
 * Counter with changes from www.w3schools.com
 */
var timerVar = setInterval(countTimer, 1000);
var totalSeconds = 0;
function countTimer() {
   ++totalSeconds;
   var hour = Math.floor(totalSeconds /3600);
   var minute = Math.floor((totalSeconds - hour*3600)/60);
   var seconds = totalSeconds - (hour*3600 + minute*60);

   document.getElementById("timer").innerHTML = minute + ":" + seconds;
}

function myStopFunction() {
    clearInterval(timerVar);
}

/*
 * Confetti drop 
 */
for (var i = 0; i < 250; i++) {
  create(i);
}

function create(i) {
  var width = Math.random() * 8;
  var height = width * 0.4;
  var colourIdx = Math.ceil(Math.random() * 3);
  var colour = "red";
  switch(colourIdx) {
    case 1:
      colour = "yellow";
      break;
    case 2:
      colour = "blue";
      break;
    default:
      colour = "red";
  }
  $('<div class="confetti-'+i+' '+colour+'"></div>').css({
    "width" : width+"px",
    "height" : height+"px",
    "top" : -Math.random()*20+"%",
    "left" : Math.random()*100+"%",
    "opacity" : Math.random()+0.5,
    "transform" : "rotate("+Math.random()*360+"deg)"
  }).appendTo('.wrapper');

  drop(i);
}

function drop(x) {
  $('.confetti-'+x).animate({
    top: "100%",
    left: "+="+Math.random()*15+"%"
  }, Math.random()*3000 + 3000, function() {
    reset(x);
  });
}

function reset(x) {
  $('.confetti-'+x).animate({
    "top" : -Math.random()*20+"%",
    "left" : "-="+Math.random()*15+"%"
  }, 0, function() {
    drop(x);
  });
}

//Codes Not Needed

// function countDown() {
//   var counter = document.querySelector('.moves');
//     moves++;
//     counter.innerHTML = moves;
// }

// const threeStars = document.querySelectorAll('.stars li');
// function hideHiddenStars() {
//   if (threeStars.style.display = "inline-block") {
//       threeStars.style.display = "none";
//   }
// }

// function rating(){
// if (moves >= 21 && moves <= 30) {
//   hideHiddenStars();
// } else if (moves >= 31 && moves <= 20) {
//   hideHiddenStars();
// }
// }

//
// function hiddenStars() {
//     var threeStars = document.getElementById("hideStars");
//     if (threeStars.style.display = "none") {
//         threeStars.style.display = "inline-block";
//     }
// }
//


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
