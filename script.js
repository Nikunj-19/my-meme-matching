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
    let seconds = 0;
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
        // ...add more pairs if needed
    ];

    function shuffle(array) {
        array.sort(() => 0.5 - Math.random());
    }

    function createBoard() {
        shuffle(cardArray);
        grid.innerHTML = '';
        cardsWon = [];
        tries = 0;
        seconds = 0;
        gameStarted = true;
        updateScore();
        updateTimer();

        if (timer) clearInterval(timer);
        timer = setInterval(updateTimer, 1000);

        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png');
            card.setAttribute('data-id', i);
            card.classList.remove('flipped');
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    function flipCard() {
        if (!gameStarted) return;

        let cardId = this.getAttribute('data-id');
        const cardElement = this;

        if (!cardsChosenId.includes(cardId) && cardsChosen.length < 2) {
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenId.push(cardId);
            cardElement.setAttribute('src', cardArray[cardId].img);
            cardElement.classList.add('flipped');

            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 700);
            }
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('#game-board img');
        const firstCardId = cardsChosenId[0];
        const secondCardId = cardsChosenId[1];

        tries++;
        updateScore();

        if (cardsChosen[0] === cardsChosen[1] && firstCardId !== secondCardId) {
            cards[firstCardId].removeEventListener('click', flipCard);
            cards[secondCardId].removeEventListener('click', flipCard);
            cards[firstCardId].style.visibility = 'hidden';
            cards[secondCardId].style.visibility = 'hidden';
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
            setTimeout(() => {
                alert(`🎉 Congratulations! You found them all!\nTime: ${seconds} seconds\nTries: ${tries}`);
            }, 500);
        }
    }

    function updateTimer() {
        if (gameStarted) {
            seconds++;
            timerDisplay.textContent = `Time: ${seconds} sec`;
        }
    }

    function updateScore() {
        scoreDisplay.textContent = `Tries: ${tries}`;
    }

    startButton.addEventListener('click', createBoard);
});
