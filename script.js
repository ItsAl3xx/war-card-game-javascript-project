// Step 1: Define the Card class
// Defines a single playing card
class Card {
    constructor(rank, suit) {
        this.rank = rank; // Rank of the card (2-10, Jack, Queen, King, Ace)
        this.suit = suit; // Suit of the card (clubs, diamonds, hearts, spades)
    }
}

// Step 2: Define the Deck class
// Represents a deck of playing cards
class Deck {
    constructor() {
        this.cards = []; // Array to store the cards
        this.initializeDeck(); // Initializes the deck with 52 cards
    }

    // Fills the deck with 52 unique cards
    initializeDeck() {
        const suits = ['clubs', 'diamonds', 'hearts', 'spades'];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

        for (const suit of suits) {
            for (const rank of ranks) {
                this.cards.push(new Card(rank, suit));
            }
        }
    }

    // Shuffles the deck of cards
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]; // Swap elements
        }
    }

    // Deals a single card from the deck
    deal() {
        return this.cards.pop(); // Removes and returns the last card in the array
    }
}

// Step 3: Define the Player class
// Represents a player in the game
class Player {
    constructor() {
        this.hand = []; // Array to store the player's cards
        this.score = 0; // Tracks the player's score
    }

    // Receives a card and adds it to the player's hand
    receiveCard(card) {
        this.hand.push(card);
    }

    // Plays the top card from the player's hand
    playCard() {
        return this.hand.shift(); // Removes and returns the first card in the array
    }

    // Increases the player's score
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

// Function to play one round of the game
function playRound(playerOne, playerTwo) {
    const cardOne = playerOne.playCard();
    const cardTwo = playerTwo.playCard();

    const cardOneValue = getCardValue(cardOne.rank);
    const cardTwoValue = getCardValue(cardTwo.rank);

    console.log(`Player 1 plays ${cardOne.rank} of ${cardOne.suit}`);
    console.log(`Player 2 plays ${cardTwo.rank} of ${cardTwo.suit}`);

    if (cardOneValue > cardTwoValue) {
        playerOne.addPoint();
        console.log("Player 1 wins the round");
    } else if (cardOneValue < cardTwoValue) {
        playerTwo.addPoint();
        console.log("Player 2 wins the round");
    } else {
        console.log("This round is a tie.");
    }
}

// Main function to play the War card game
function playWarGame() {
    // Create a new deck, shuffle it, and create two players
    const deck = new Deck();
    deck.shuffle();
    const playerOne = new Player();
    const playerTwo = new Player();

    // Deal 26 cards to each player
    while (deck.cards.length > 0) {
        playerOne.receiveCard(deck.deal());
        playerTwo.receiveCard(deck.deal());
    }

    // Play 26 rounds of the game
    for (let i = 0; i < 26; i++) {
        playRound(playerOne, playerTwo);
    }

    // Declare the winner or a tie based on the players' scores
    if (playerOne.score > playerTwo.score) {
        console.log(`Player 1 wins the game with a score of ${playerOne.score}`);
    } else if (playerOne.score < playerTwo.score) {
        console.log(`Player 2 wins the game with a score of ${playerTwo.score}`);
    } else {
        console.log("The game is a tie!");
    }
}

// Start the game
playWarGame();
