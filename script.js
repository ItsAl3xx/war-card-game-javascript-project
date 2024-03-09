// Card class definition
class Card {
    constructor(rank, suit) {
        this.rank = rank; // Rank of the card (2-10, Jack, Queen, King, Ace)
        this.suit = suit; // Suit of the card (clubs, diamonds, hearts, spades)
    }
}

// Deck class definition
class Deck {
    constructor() {
        this.cards = []; // Array to store the cards
        this.initializeDeck(); // Initializes the deck with 52 cards when a new deck is created
    }

    // Method to fill the deck with 52 unique cards
    initializeDeck() {
        const suits = ['clubs', 'diamonds', 'hearts', 'spades'];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
        for (const suit of suits) {
            for (const rank of ranks) {
                this.cards.push(new Card(rank, suit));
            }
        }
    }

    // Method to shuffle the deck of cards
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // Swap elements
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    // Method to deal a single card from the deck
    deal() {
        // Removes and returns the last card in the array
        return this.cards.pop(); 
    }
}

// Player class definition
class Player {
    constructor() {
        // Array to store the player's cards
        this.hand = []; 
        // Tracks the player's score
        this.score = 0;
    }

    // Method to receive a card and add it to the player's hand
    receiveCard(card) {
        this.hand.push(card);
    }

    // Method to play the top card from the player's hand
    playCard() {
        // Removes and returns the first card in the array
        return this.hand.shift(); 
    }

    // Method to increase the player's score
    addPoint() {
        this.score++;
    }
}

// Utility function to get the numerical value of a card's rank for comparison
function getCardValue(rank) {
    const rankValues = {
        '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
        'Jack': 11, 'Queen': 12, 'King': 13, 'Ace': 14
    };
    return rankValues[rank];
}

// Function to update the scores on the webpage
function updateScores(playerOne, playerTwo) {
    document.getElementById('player1-score').textContent = playerOne.score;
    document.getElementById('player2-score').textContent = playerTwo.score;
}

// Function to determine the winner and display it on the webpage
function determineWinner(playerOne, playerTwo) {
    let winnerText = 'The game is a tie!';
    if (playerOne.score > playerTwo.score) {
        winnerText = `Player 1 wins the game with a score of ${playerOne.score}`;
    } else if (playerTwo.score > playerOne.score) {
        winnerText = `Player 2 wins the game with a score of ${playerTwo.score}`;
    }
    document.getElementById('game-winner').textContent = winnerText;
}

// Function to play one round of the game
function playRound(playerOne, playerTwo) {
    const cardOne = playerOne.playCard();
    const cardTwo = playerTwo.playCard();

    const cardOneValue = getCardValue(cardOne.rank);
    const cardTwoValue = getCardValue(cardTwo.rank);

    // Update the webpage with the cards played
    document.getElementById('player1-card').textContent = `${cardOne.rank} of ${cardOne.suit}`;
    document.getElementById('player2-card').textContent = `${cardTwo.rank} of ${cardTwo.suit}`;

    // Determine the winner of the round and update scores
    if (cardOneValue > cardTwoValue) {
        playerOne.addPoint();
    } else if (cardOneValue < cardTwoValue) {
        playerTwo.addPoint();
    }

    // Update the scores on the webpage
    updateScores(playerOne, playerTwo);
}

// Set up the game with a shuffled deck and dealt cards to players
const deck = new Deck();
deck.shuffle();
const playerOne = new Player();
const playerTwo = new Player();

// Deal 26 cards to each player
while (deck.cards.length > 0) {
    playerOne.receiveCard(deck.deal());
    playerTwo.receiveCard(deck.deal());
}

// Add an event listener to the "Play Round" button
document.getElementById('play-round').addEventListener('click', function() {
    if (playerOne.hand.length > 0 && playerTwo.hand.length > 0) {
        playRound(playerOne, playerTwo);
    } else {
        // Once all cards are played, determine the winner and update the HTML
        determineWinner(playerOne, playerTwo);
        // Disable the play button after the game is over
        this.disabled = true;
    }
});
