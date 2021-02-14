const buttonsPlayer = document.querySelectorAll("[data-player-selected]");
const playAgain = document.querySelector("#playAgain");
let gameLength = 0;
let playerScore = 0;
let computerScore = 0;

let log = [];

playAgain.addEventListener('click', function() {
	replay();
	this.style.display = 'none';
});

buttonsPlayer.forEach((button) => {
	button.addEventListener('click', function() {
		if(gameLength >= 5) {
			document.querySelector('#playAgain').style.display = 'inline-block';
		} else {
			gameLength += 1;
			const computer = selectedByComputer();
			const player = this.dataset.playerSelected;
			log = [...log, {player: player, computer: computer}];
			displayLogData();
			gameRule(player, computer);
		}
	})
})

function selectedByComputer() {
	const computerOptionArray = ["rock", "paper", "scissors"];
	return computerOptionArray[Math.floor(Math.random() * computerOptionArray.length)];
}

function gameRule(player, computer) {
	if(player === "rock") {
		if(computer === "paper") {
			computerScore += 1;
		} else if (computer === "scissors") {
			playerScore += 1;
		} else {
			computerScore = computerScore;
			playerScore = playerScore;
		}
	}

	if(player === "paper") {
		if(computer === "scissors") {
			computerScore += 1;
		} else if (computer === "rock") {
			playerScore += 1;
		} else {
			computerScore = computerScore;
			playerScore = playerScore;
		}
	}

	if(player === "scissors") {
		if(computer === "rock") {
			computerScore += 1;
		} else if (computer === "paper") {
			playerScore += 1;
		} else {
			computerScore = computerScore;
			playerScore = playerScore;
		}
	}

	displayScore(playerScore, computerScore);
}

function replay() {
	gameLength = 0;
	log = [];
	displayLogData();
}

function displayScore(playerScore, computerScore) {
	const playerScoreNumber = document.querySelector('.player__score__number');
	const computerScoreNumber = document.querySelector('.computer__score__number');

	playerScoreNumber.innerHTML = playerScore;
	computerScoreNumber.innerHTML = computerScore;
}

function displayLogData() {
	const playerHistory = document.querySelector('.player__history');
	const computerHistory = document.querySelector('.computer__history');

	let playerLog = [];
	let computerLog = [];

	log.forEach((data) => {
		if(data.hasOwnProperty('player')) {
			playerLog.push(data.player);
		}

		if (data.hasOwnProperty('computer')){
			computerLog.push(data.computer);
		}
	});

	playerHistory.innerHTML = JSON.stringify(playerLog);
	computerHistory.innerHTML = JSON.stringify(computerLog);
}