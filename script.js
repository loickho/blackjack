const suits = ['♠️', '♣', '❤️', '♦️'];
const numbers = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'K', 'Q', 'A'];
let deck = [];
let cardToDeal = '';
// let shuffledDeck = [];

// create deck of cards
function newDeck(){
  suits.forEach((suit) =>
    numbers.forEach((number) =>
      deck.push(number + suit)
    )
  )
  // shuffle deck
  // I realized shuffling the deck is not necessary, since pulling a random card from it does the same job.
  // while (shuffledDeck.length < 52){
  //   let random = Math.floor(Math.random() * deck.length)
  //   if (!shuffledDeck.includes(deck[random])){
  //     shuffledDeck.push(deck[random])
  //   }
  // }
}
newDeck()
console.log(deck)

// get random card and remove it from deck
function randomCard() {
  let random = Math.floor(Math.random() * deck.length)
  cardToDeal = deck[random]
  deck.splice(random, 1)
  return cardToDeal
}

// deal random card to dealer twice (one facedown)
for (let i = 0; i < 2; i++){
  console.log(randomCard())
}

// deal random card to player twice
for (let i = 0; i < 2; i++){
  console.log(randomCard())
}
console.log(deck)

// define what happens when hit is clicked
  // if goes over 21, lose
  // otherwise, hit again or allow to stay

// define what happens when stay is clicked

// dealer hits again until score is greater than 17

// decide winner

// play again
