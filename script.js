const suits = ['♠️', '♣', '❤️', '♦️'];
const numbers = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'K', 'Q', 'A'];
let deck = [];

// create deck of cards
function newDeck(){
  suits.forEach((suit) =>
    numbers.forEach((number) =>
      deck.push(number + suit)
    )
  )
}

newDeck()
console.log(deck)

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
