const buttonsPlayer = document.querySelectorAll("[data-player-selected]");
const playAgain = document.querySelector("#playAgain");
const mathStatus = document.querySelector("#mathStatus");

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
		const computer = selectedByComputer();
		const player = this.dataset.playerSelected;
		log = [...log, {player: player, computer: computer}];
		displayLogData();

		if(gameLength >= 4) {
			playAgain.style.display = 'inline-block';
			const gameResult = matchStatus(playerScore, computerScore);
			mathStatus.innerHTML = gameResult;
		}

		gameLength += 1;
		gameRule(player, computer);
	})
})

function selectedByComputer() {
	const computerOptionArray = ["rock", "paper", "scissors"];
	return computerOptionArray[Math.floor(Math.random() * computerOptionArray.length)];
}

function matchStatus(playerScore, computerScore) {
	if(playerScore > computerScore) {
		return "You Won !!";
	} else if (playerScore < computerScore) {
		return "You Loss !!"
	} else {
		return "Tie"
	}
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
	playerScore = 0;
	computerScore = 0;
	mathStatus.innerHTML = "";
	displayScore(playerScore, computerScore);
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