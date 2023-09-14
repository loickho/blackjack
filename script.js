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

// create deck of cards
function newDeck(){
  suits.forEach((suit) =>
    numbers.forEach((number) =>
      deck.push(number + suit)
    )
  )
}
newDeck()

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
function dealDealer(){
  var card = randomCard();
  hiddenDealerCardElement = createCardElement(card);
  hiddenDealerCardElement.classList.add('flipped');
  hiddenContent = hiddenDealerCardElement.textContent;
  hiddenDealerCardElement.textContent = ('')
  dealerSpace.appendChild(hiddenDealerCardElement);
  dealerCards.push(card)
  //face-up card
  var card = randomCard();
  const dealerCardElement = createCardElement(card);
  dealerSpace.appendChild(dealerCardElement);
  dealerCards.push(card)
}
dealDealer()

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
for (let i = 0; i < 2; i++){
  newUserCard()
}

// adds card when hit is clicked
hitMe.addEventListener('click', newUserCard);

// calculate user score
function calcUserScore(){
  userScore = 0;
  for (let i = 0; i < userCards.length; i++){
    if (userCards[i].includes('J') || userCards[i].includes('Q') || userCards[i].includes('K')){
      userScore += 10
    } else if (userCards[i].includes('A')){
      userScore += 1
    } else {
      let num = parseInt(userCards[i].match(/\d+/g))
      userScore += num
    }
  }
}

// calculate dealer score
function calcDealerScore(){
  dealerScore = 0;
  for (let i = 0; i < dealerCards.length; i++){
    if (dealerCards[i].includes('J') || dealerCards[i].includes('Q') || dealerCards[i].includes('K')){
      dealerScore += 10
    } else if (dealerCards[i].includes('A')){
      dealerScore += 1
    } else {
      let num = parseInt(dealerCards[i].match(/\d+/g))
      dealerScore += num
    }
  }
}

// if goes over 21, lose
// otherwise, hit again or allow to stand
function checkIfOver(){
  if(userScore > 21){
    alert("You lost")
  }
}

// dealer hits again until score is greater than 17
function playDealer(){
  calcDealerScore();
  console.log(dealerScore)
}

// define what happens when stand is clicked
function standHandler(){
  hitMe.classList.add('hidden');
  playDealer();
  hiddenDealerCardElement.classList.remove('flipped');
  hiddenDealerCardElement.textContent = hiddenContent;
}
stand.addEventListener('click', standHandler);


// decide winner

// play again
