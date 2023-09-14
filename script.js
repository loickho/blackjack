const suits = ['♠️', '♣', '❤️', '♦️'];
const numbers = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'K', 'Q', 'A'];
let deck = [];
let shuffledDeck = [];

// create deck of cards
function newDeck(){
  suits.forEach((suit) =>
    numbers.forEach((number) =>
      deck.push(number + suit)
    )
  )
  // shuffle deck
  // I googled and found something called the Fisher-Yates algorithm, which seems to be more efficient, but I decided to leave the version I came up with because it seems more fitting to use my own for an admissions challenge.
  while (shuffledDeck.length < 52){
    let random = Math.floor(Math.random() * deck.length)
    if (!shuffledDeck.includes(deck[random])){
      shuffledDeck.push(deck[random])
    }
  }
}

console.log(newDeck())
console.log(deck)
console.log(shuffledDeck)

// shuffle deck


// deal random card to dealer twice (one facedown)

// deal random card to player twice

// define what happens when hit is clicked
  // if goes over 21, lose
  // otherwise, hit again or allow to stay

// define what happens when stay is clicked

// dealer hits again until score is greater than 17

// decide winner

// play again
