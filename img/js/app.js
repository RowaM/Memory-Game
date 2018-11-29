/*
 * Create a list that holds all of your cards
 */
let cardsArray = ['fa-anchor', 'fa-anchor', 'fa-bicycle', 'fa-bolt', 'fa-cube', 'fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-leaf', 'fa-cube'];

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
    rating();
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
      if(toggledCards.length > 1) { // This conditional will only trigger the isItAMatch method when there are two cards in the toggledCards array.
        isItAMatch(clickTarget);
        stopMe();
      }
    }
});

//Checking for a match
function isItAMatch(clickTarget) {
  if (toggledCards[0].firstElementChild.className === toggledCards[1].firstElementChild.className) {
      toggledCards[0].classList.toggle('match');
      toggledCards[1].classList.toggle('match');
      toggledCards = [];
      number += 1;
      stopMe();
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
function shuffle() {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return allCards;
}

let cardsShuffled = shuffle(cardsArray);

    for (let card of cardsShuffled) {
        let li = newCard(card);
        list[0].appendChild(li);
    }


//On repeat button click event the
//reset, counter, and timer functions are all rest!
repeat.addEventListener('click', event => {
  const shuffling = shuffle(allCards);
  for (card of shuffling) {
    toggledCards = [];
    deck.appendChild(card);
    resetMe();
    countTimer();
    hideUs();
    number = 0;
    resetStars();
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
 function resetStars(){
   for (var i = 0; i < starArray.length; i++) {
     starArray[i].classList.remove("hideStars");
 }
 }

const starList = document.querySelectorAll('.fa-star');
// Convert buttons NodeList to an array
let starArray = Array.from(starList);

function rating(){
if (moves === 25) {
  starArray[5].classList.toggle("hideStars");
  starArray[2].classList.toggle("hideStars");
} else if (moves === 45) {
  starArray[4].classList.toggle("hideStars");
  starArray[1].classList.toggle("hideStars");
}
}

function stopMe() {
if (number >= 8) { // when to stop
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
   document.getElementById("second-timer").innerHTML = minute + ":" + seconds;
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
