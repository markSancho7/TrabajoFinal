const inputLetterElement = document.getElementById('inputLetter');
const containerSecretWordElement = document.getElementById(
	'containerSecretWord'
);
const buttonNewWordElement = document.getElementById('buttonNewWord');
const errorLetterElement = document.getElementById('errorLetters');
const counterAttemptsElement = document.getElementById('counterAttempts');
const containerCounterAttemptsElement = document.getElementById(
	'containerCounterAttempts'
);
const toyElement = document.getElementById('toy');

const arraySecretsWords = [
	'casa',
	'perro',
	'cerveza',
	'paraguas',
	'raqueta',
	'pijama',
	'balon',
	'pizarra',
	'telefono',
	'clase',
	'ordenador'
];
let secretWord = '';
let wordToPrint = [];
let errorPlayer = '';
let counterAttempts = 6;

// leer la letra que introduce el jugador
const playerLetter = event => {
	if (event.key !== 'Enter') return;
	const letter = inputLetterElement.value;
	checkLetter(letter);
	printErrorLetters(letter);
	inputLetterElement.value = '';
};
// conseguir la palabra secreta
const getSecretWord = () => {
	const number = Math.floor(Math.random() * arraySecretsWords.length);
	return arraySecretsWords[number];
};

// pintar el tablero
const printCells = () => {
	containerSecretWordElement.innerHTML = '';
	secretWord = getSecretWord();
	wordToPrint.length = secretWord.length;
	inputLetterElement.disabled = false;
	for (let i = 0; i < secretWord.length; i++) {
		const cell = document.createElement('span');
		cell.classList.add('cell');
		containerSecretWordElement.append(cell);
	}
};
printCells();
const restartGame = () => {
	location.reload();
};

// comprobar la letra
const checkLetter = letter => {
	const secretWordSplit = secretWord.split('');
	for (let i = 0; i < secretWordSplit.length; i++) {
		if (letter === secretWordSplit[i]) {
			wordToPrint.splice(i, 1, letter);
		}
	}
	printPlayerWordOnCells();
};
// pintar las letrar erroneas
const printErrorLetters = letter => {
	if (!wordToPrint.includes(letter) && !errorPlayer.includes(letter)) {
		printToy();
		const errorLetter = document.createElement('span');
		errorLetter.textContent = letter;
		errorLetterElement.append(errorLetter);
		errorPlayer += letter;
		counterAttempts--;
		printCounterAttempts();
	}
};
// Pintar contador de numero de oportunidades
const printCounterAttempts = () => {
	if (counterAttempts < 0) {
		counterAttemptsElement.textContent = 'PERDISTE';
		containerCounterAttemptsElement.classList.add('red');
		counterAttempts = 6;
		wordToPrint = [];
		errorPlayer = '';
		inputLetterElement.disabled = true;
		buttonNewWordElement.disabled = false;
	}
};

const printPlayerWordOnCells = () => {
	let counter = 0;
	for (let i = 0; i < wordToPrint.length; i++) {
		containerSecretWordElement.children[i].textContent = wordToPrint[i];
		if (wordToPrint[i]) {
			counter++;
		}
	}
	if (counter === wordToPrint.length) {
		containerCounterAttemptsElement.classList.add('green');
		counterAttemptsElement.textContent = 'GANASTE';
		inputLetterElement.disabled = true;
		buttonNewWordElement.disabled = false;
	} else if (counterAttempts >= 0) {
		counterAttemptsElement.textContent = `Intentos Restantes: ${counterAttempts}`;
	}
};
printPlayerWordOnCells();
const printToy = () => {
	toyElement.children[counterAttempts].classList.remove('hide');
};

inputLetterElement.addEventListener('keypress', playerLetter);
buttonNewWordElement.addEventListener('click', restartGame);
