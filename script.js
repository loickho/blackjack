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

// CITATION: ChatGPT helped me with using jquery and document.ready.

$('document').ready(function() {
  let $dealerSpace = $('#dealer');
  let $userSpace = $('#user');
  let $hitMe = $('#hit');
  let $stand = $('#stand');
  let $again = $('#again');

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
    const cardElement = $('<div>');
    if (card.includes('♠️') || card.includes('♣')){
      cardElement.addClass('card-black');
    } else {
      cardElement.addClass('card-red');
    }
    cardElement.text(card);
    return cardElement;
  }

  // deal random card to dealer twice (one facedown)
    // face-down card & face-up card
  function dealerInitial(){
    var card = randomCard();
    hiddenDealerCardElement = createCardElement(card);
    hiddenDealerCardElement.addClass('flipped');
    hiddenContent = hiddenDealerCardElement.text();
    hiddenDealerCardElement.text('');
    $dealerSpace.append(hiddenDealerCardElement);
    dealerCards.push(card)
    newDealerCard()
  }

  // face-up dealer cards
  function newDealerCard(){
    var card = randomCard();
    const dealerCardElement = createCardElement(card);
    $dealerSpace.append(dealerCardElement);
    dealerCards.push(card)
  }

  // deal random card to player twice
  function newUserCard(){
    var card = randomCard();
    const userCardElement = createCardElement(card);
    $userSpace.append(userCardElement);
    userCards.push(card)
    calcUserScore()
    checkIfOver()
  }
  function userInitial() {
    for (let i = 0; i < 2; i++){
      newUserCard()
    }
  }

  // adds card when hit is clicked
  $hitMe.on('click', newUserCard);

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
      setTimeout(() => {
        alert("You bust");
        hiddenDealerCardElement.removeClass('flipped');
        hiddenDealerCardElement.text(hiddenContent);
      }, 800)
      // CITATION: I got this to work in vanilla javascript, but needed help from chatGPT to jquerify it.
      $hitMe.prop('disabled', true);
      $stand.prop('disabled', true);
      $again.prop('disabled', false);
    }
    if (userScore === 21 && userCards.length === 2){
      setTimeout(() => {
        alert("Blackjack! You win!");
        hiddenDealerCardElement.classList.remove('flipped');
        hiddenDealerCardElement.textContent = hiddenContent;
      }, 800)
      $hitMe.prop('disabled', true);
      $stand.prop('disabled', true);
      $again.prop('disabled', false);
    }
  }

  // dealer hits again until score is greater than 17
  function playDealer(){
    calcDealerScore();
    while (dealerScore < 17){
        newDealerCard();
        calcDealerScore();
    }
    if (dealerScore == 21){
      setTimeout(() => {
        alert('dealer hit 21 points and wins!')
        $stand.prop('disabled', true);
        $again.prop('disabled', false);
      }, 800);
    } else if (dealerScore > 21){
      setTimeout(() => {
        alert('dealer bust. you win!')
        $stand.prop('disabled', true);
        $again.prop('disabled', false);
      }, 800);
    } else if (dealerScore > userScore){
      setTimeout(() => {
        alert(`Dealer has ${dealerScore} points and you have ${userScore} points. Dealer wins!`)
        $stand.prop('disabled', true);
        $again.prop('disabled', false);
      }, 800);
    } else if (userScore > dealerScore){
      setTimeout(() => {
        alert (`You have ${userScore} points and dealer has ${dealerScore} points. You win!`)
        $stand.prop('disabled', true);
        $again.prop('disabled', false);
      }, 800);
    } else {
      setTimeout(() => {
        alert(`You and dealer both have ${userScore} points. It's a tie!`);
        $stand.prop('disabled', true);
        $again.prop('disabled', false);
      }, 800);
    }
  }

  // define what happens when stand is clicked
  function standHandler(){
    $hitMe.prop('disabled', true)
    $again.prop('disabled', false)
    hiddenDealerCardElement.removeClass('flipped');
    hiddenDealerCardElement.text(hiddenContent);
    setTimeout(() => {
      playDealer();
    }, 800);
  }
  $stand.on('click', standHandler);

  // play again

  function againHandler(){
    $dealerSpace.html('');
    $userSpace.html('');
    deck = [];
    cardToDeal = '';
    userScore = 0;
    dealerScore = 0;
    dealerCards = [];
    userCards = [];
    hiddenDealerCardElement = null;
    hiddenContent = '';
    $hitMe.prop('disabled', false);
    $stand.prop('disabled', false);
    newDeck();
    dealerInitial();
    userInitial();
    if (userScore === 21 && userCards.length === 2){
      $again.prop('disabled', false);
    } else {
      $again.prop('disabled', true);
    }
  }
  $again.on('click', againHandler);

  window.onload = againHandler();
});
