const suits = ['♠️', '♣', '❤️', '♦️'];
const numbers = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'K', 'Q', 'A'];
let deck = [];
let cardToDeal = '';
let userScore = 0;
let dealerScore = 0;
let dealerCards = [];
let userCards = [];
let hiddenDealerCardElement = null;
let hiddenContent = '';


let dealerSpace = document.getElementById('dealer');
let userSpace = document.getElementById('user');
let hitMe = document.getElementById('hit');
let stand = document.getElementById('stand');
let again = document.getElementById('again');

// create deck of cards
function newDeck(){
  suits.forEach((suit) =>
    numbers.forEach((number) =>
      deck.push(number + suit)
    )
  )
}

// get random card and remove it from deck
function randomCard() {
  let random = Math.floor(Math.random() * deck.length)
  cardToDeal = deck[random]
  deck.splice(random, 1)
  return cardToDeal
}

function createCardElement(card) {
  const cardElement = document.createElement('div');
  if (card.includes('♠️') || card.includes('♣')){
    cardElement.classList.add('card-black');
  } else {
    cardElement.classList.add('card-red')
  }
  cardElement.textContent = card;
  return cardElement;
}

// deal random card to dealer twice (one facedown)
  // face-down card
function dealerInitial(){
  var card = randomCard();
  hiddenDealerCardElement = createCardElement(card);
  hiddenDealerCardElement.classList.add('flipped');
  hiddenContent = hiddenDealerCardElement.textContent;
  hiddenDealerCardElement.textContent = ('')
  dealerSpace.appendChild(hiddenDealerCardElement);
  dealerCards.push(card)
  newDealerCard()
}

// face-up dealer cards
function newDealerCard(){
  var card = randomCard();
  const dealerCardElement = createCardElement(card);
  dealerSpace.appendChild(dealerCardElement);
  dealerCards.push(card)
}

// deal random card to player twice
function newUserCard(){
  var card = randomCard();
  const userCardElement = createCardElement(card);
  userSpace.appendChild(userCardElement);
  userCards.push(card)
  calcUserScore()
  console.log(userScore)
  checkIfOver()
}
function userInitial() {
  for (let i = 0; i < 2; i++){
    newUserCard()
    checkIfOver()
  }
}

// adds card when hit is clicked
hitMe.addEventListener('click', newUserCard);

// calculate user score
// CITATION: I didn't copy code from chatGPT, but I did ask it for advice on how to implement the logic for the ace.
function calcScore(cards){
  let score = 0;
  let numAces = 0;
  for (let i = 0; i < cards.length; i++){
    if (cards[i].includes('J') || cards[i].includes('Q') || cards[i].includes('K')){
      score += 10
    } else if (cards[i].includes('A')){
      numAces += 1
      score += 11
    } else {
      let num = parseInt(cards[i].match(/\d+/g))
      score += num
    }
  }

  while (numAces > 0 && score > 21){
    score -= 10;
    numAces -= 1;
  }
  return score
}

function calcUserScore(){
  userScore = calcScore(userCards);
}

function calcDealerScore(){
  dealerScore = calcScore(dealerCards);
}

// if goes over 21, lose
// otherwise, hit again or allow to stand
function checkIfOver(){
  if(userScore > 21){
    alert("You bust")
  }
  if (userScore == 21){
    alert("Blackjack! You win!")
  }
}

// dealer hits again until score is greater than 17
function playDealer(){
  calcDealerScore();
  while (dealerScore < 16){
    newDealerCard();
    calcDealerScore();
  }
  if (dealerScore == 21){
    alert('dealer hit 21 points and wins!')
  } else if (dealerScore > 21){
    alert('dealer bust. you win!')
  } else if (dealerScore > userScore){
    alert(`Dealer has ${dealerScore} points and you have ${userScore} points. Dealer wins!`)
  } else {
    alert (`You have ${userScore} points and dealer has ${dealerScore} points. You win!`)
  }
}

// define what happens when stand is clicked
function standHandler(){
  hitMe.classList.add('hidden');
  hiddenDealerCardElement.classList.remove('flipped');
  hiddenDealerCardElement.textContent = hiddenContent;
  playDealer();
}
stand.addEventListener('click', standHandler);

// play again

function againHandler(){
  dealerSpace.innerHTML = '';
  userSpace.innerHTML = '';
  deck = [];
  cardToDeal = '';
  userScore = 0;
  dealerScore = 0;
  dealerCards = [];
  userCards = [];
  hiddenDealerCardElement = null;
  hiddenContent = '';
  hitMe.classList.remove('hidden');
  newDeck();
  dealerInitial();
  userInitial();
}
again.addEventListener('click', againHandler);

window.onload = againHandler();
