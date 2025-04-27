document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#game-board');
    const startButton = document.getElementById('start-game');
    const timerDisplay = document.getElementById('timer');
    const scoreDisplay = document.getElementById('score');

    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let tries = 0;
    let timer;
    let secondsElapsed = 0;
    let gameStarted = false;

    const cardArray = [
        { name: 'card1', img: 'images/distracted.png' },
        { name: 'card1', img: 'images/distracted.png' },
        { name: 'card2', img: 'images/drake.png' },
        { name: 'card2', img: 'images/drake.png' },
        { name: 'card3', img: 'images/fine.png' },
        { name: 'card3', img: 'images/fine.png' },
        { name: 'card4', img: 'images/rollsafe.png' },
        { name: 'card4', img: 'images/rollsafe.png' },
        { name: 'card5', img: 'images/success.png' },
        { name: 'card5', img: 'images/success.png' },
        // ...add more pairs as needed
    ];

    function shuffle(array) {
        array.sort(() => 0.5 - Math.random());
    }

    function createBoard() {
        shuffle(cardArray);
        grid.innerHTML = '';
        cardsWon = [];
        cardsChosen = [];
        cardsChosenId = [];
        tries = 0;
        secondsElapsed = 0;
        clearInterval(timer);
        updateTimer();
        updateScore();
        gameStarted = true;
        timer = setInterval(updateTimer, 1000); // start the timer

        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png');
            card.setAttribute('data-id', i);
            card.classList.add('card'); // for animation
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    function updateTimer() {
        if (gameStarted) {
            secondsElapsed++;
            timerDisplay.textContent = `Time: ${secondsElapsed} sec`;
        }
    }

    function updateScore() {
        scoreDisplay.textContent = `Tries: ${tries}`;
    }

    function flipCard() {
        let cardId = this.getAttribute('data-id');
        if (!cardsChosenId.includes(cardId) && cardsChosen.length < 2) {
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenId.push(cardId);
            this.classList.add('flipped');
            this.setAttribute('src', cardArray[cardId].img);

            if (cardsChosen.length === 2) {
                tries++;
                updateScore();
                setTimeout(checkForMatch, 500);
            }
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('#game-board img');
        const firstCardId = cardsChosenId[0];
        const secondCardId = cardsChosenId[1];

        if (cardsChosen[0] === cardsChosen[1] && firstCardId !== secondCardId) {
            cards[firstCardId].removeEventListener('click', flipCard);
            cards[secondCardId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        } else {
            cards[firstCardId].setAttribute('src', 'images/blank.png');
            cards[secondCardId].setAttribute('src', 'images/blank.png');
            cards[firstCardId].classList.remove('flipped');
            cards[secondCardId].classList.remove('flipped');
        }

        cardsChosen = [];
        cardsChosenId = [];

        if (cardsWon.length === cardArray.length / 2) {
            clearInterval(timer);
            gameStarted = false;
            setTimeout(() => {
                alert(`Congratulations! You found them all!\nTime: ${secondsElapsed} seconds\nTries: ${tries}`);
            }, 300);
        }
    }

    startButton.addEventListener('click', createBoard);
});
